import { Reducer } from 'redux'

import {
  FETCH_POSTS_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_REQUEST,
  REMOVE_POST,
  TopListState,
  TopListActionTypes
} from './topList.types'

const initialState: TopListState = {
  isLoading: true,
  error: '',
  posts: {
    list: [],
    data: {}
  }
}

const reducer: Reducer<TopListState, TopListActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return initialState
    }
    
    case FETCH_POSTS_SUCCESS: {
      return {
        isLoading: false,
        error: '',
        posts: action.payload
      }
    }
    
    case FETCH_POSTS_FAILED: {
      return {
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
          list: state.posts.list.filter(postId => postId !== action.payload)
        }
      }
    }
    
    default: {
      return state
    }
  }
}

export default reducer
