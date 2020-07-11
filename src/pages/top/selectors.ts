import { createSelector } from 'reselect'
import { RootState } from '../../reducers'
import { PostInterface } from "./topList.types"

const getPostsData = (state: RootState) => state.topList.posts.data

const getPostsList = (state: RootState) => state.topList.posts.list

export const getPostData = createSelector<RootState, Record<string, PostInterface>, string[], PostInterface[]>(
  getPostsData,
  getPostsList,
  (postsData, postsList) => postsList.map(postId => postsData[postId])
)
