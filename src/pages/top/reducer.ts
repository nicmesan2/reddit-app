import { Reducer } from 'redux'

import {
  FETCH_POSTS_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_REQUEST,
  REMOVE_POST,
  READ_POST,
  BOOKMARK_IMAGE,
  UNBOOKMARK_IMAGE,
  TopListState,
  TopListActionTypes, SELECT_POST
} from './topList.types'

const initialState: TopListState = {
  isLoading: true,
  error: '',
  posts: {
    list: [],
    data: {}
  },
  removedPosts: [],
  readPosts: [],
  bookmarkedImages: [],
  selectedPostId: ''
}

const reducer: Reducer<TopListState, TopListActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: '',
        posts: {
          list: [],
          data: {}
        }
      }
    }

    case FETCH_POSTS_SUCCESS: {
      const postsData = { ...action.payload.data }

      state.readPosts.forEach((readPostId) => {
        if (postsData[readPostId]) {
          postsData[readPostId].clicked = true
        }
      })
  
      state.bookmarkedImages.forEach((image) => {
        if (postsData[image.postId]) {
          postsData[image.postId].imageBookmarked = true
        }
      })
      
      return {
        ...state,
        isLoading: false,
        error: '',
        posts: {
          data: postsData,
          list: action.payload.list.filter((postId) => !state.removedPosts.includes(postId))
        }
      }
    }

    case FETCH_POSTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        posts: state.posts
      }
    }

    case REMOVE_POST: {
      return {
        ...state,
        posts: {
          ...state.posts,
          list: state.posts.list.filter((postId) => postId !== action.payload)
        },
        removedPosts: [...state.removedPosts, action.payload]
      }
    }

    case SELECT_POST: {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: {
            ...state.posts.data,
            [action.payload]: {
              ...state.posts.data[action.payload],
              clicked: true
            }
          }
        },
        readPosts: [...state.readPosts, action.payload],
        selectedPostId: action.payload
      }
    }
    
    case BOOKMARK_IMAGE: {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: {
            ...state.posts.data,
            [action.payload.postId]: {
              ...state.posts.data[action.payload.postId],
              imageBookmarked: true
            }
          }
        },
        bookmarkedImages: [...state.bookmarkedImages, action.payload ]
      }
    }
    
    case UNBOOKMARK_IMAGE: {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: {
            ...state.posts.data,
            [action.payload.postId]: {
              ...state.posts.data[action.payload.postId],
              imageBookmarked: false
            }
          }
        },
        bookmarkedImages: state.bookmarkedImages.filter(bookmark => bookmark.image.src !== action.payload.image.src)
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
