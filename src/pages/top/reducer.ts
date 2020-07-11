import { Reducer } from 'redux'

import {
  FETCH_POSTS_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_REQUEST,
  REMOVE_POST,
  READ_POST,
  TopListState,
  TopListActionTypes
} from './topList.types'

const initialState: TopListState = {
  isLoading: true,
  error: '',
  posts: {
    list: [],
    data: {}
  },
  removedPosts: [],
  readPosts: []
}

const reducer: Reducer<TopListState, TopListActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return initialState
    }

    case FETCH_POSTS_SUCCESS: {
      const postsData = { ...action.payload.data }
      console.log(postsData, state.readPosts)

      state.readPosts.forEach((readPostId) => {
        if (postsData[readPostId]) {
          postsData[readPostId].clicked = true
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

    case READ_POST: {
      console.log(action.payload, state)
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
        readPosts: [...state.readPosts, action.payload]
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
