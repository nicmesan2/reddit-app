import { createSelector } from 'reselect'
import { RootState } from '../../reducers'
import { PostInterface } from "./topList.types"

const getPostsData = (state: RootState) => state.topList.posts.data

export const getPostsList = (state: RootState) => state.topList.posts.list

export const getPostData = createSelector<RootState, Record<string, PostInterface>, string[], PostInterface[]>(
  getPostsData,
  getPostsList,
  (postsData, postsList) => postsList.map(postId => postsData[postId])
)

export const getPaginatedPosts = (activePage, postsPerPage) => createSelector(
  getPostData,
  posts => {
    const from = (activePage - 1) * postsPerPage
    const to = from + postsPerPage
    return posts.slice(from, to)
  }
)
