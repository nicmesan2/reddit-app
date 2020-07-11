import { createSelector } from 'reselect'

const getPostsData = (state) => state.topList.posts.data

const getPostsList = state => state.topList.posts.list

export const getPostData = createSelector(
  getPostsData,
  getPostsList,
  (postsData, postsList) => postsList.map(postId => postsData[postId])
)
