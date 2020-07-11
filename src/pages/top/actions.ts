import axios from 'axios'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  REMOVE_POST,
  READ_POST,
  BOOKMARK_IMAGE,
  UNBOOKMARK_IMAGE,
  FetchPostsRequest,
  FetchPostsSuccess,
  FetchPostsFailed,
  BookmarkImage,
  UnbookmarkImage,
  RemovePost,
  ReadPost,
  PostsInterface
} from './topList.types'

export const bookmarkImage = (postId: string, imageLink: string): BookmarkImage => ({
  type: BOOKMARK_IMAGE,
  payload: { postId, imageLink}
})

export const unbookmarkImage = (postId: string, imageLink: string): UnbookmarkImage => ({
  type: UNBOOKMARK_IMAGE,
  payload: { postId, imageLink}
})

export const readPost = (postId: string): ReadPost => ({
  type: READ_POST,
  payload: postId
})

export const removePost = (postId: string): RemovePost => ({
  type: REMOVE_POST,
  payload: postId
})

export const fetchTopPostsSuccess = (payload: PostsInterface): FetchPostsSuccess => ({
  type: FETCH_POSTS_SUCCESS,
  payload
})

export const fetchTopPostsFailed = (payload: string): FetchPostsFailed => ({
  type: FETCH_POSTS_FAILED,
  payload
})

export const fetchTopPostsRequest = (): FetchPostsRequest => ({
  type: FETCH_POSTS_REQUEST
})

export const fetchTopPosts = () => (dispatch) => {
  dispatch(fetchTopPostsRequest)

  axios
    .get('https://www.reddit.com/top.json?limit=10')
    .then((response) => {
      const posts = response.data.data.children

      const normalizedPosts = posts.reduce((acc, { data: post }) => {
        return {
          ...acc,
          [post.id]: {
            id: post.id,
            createdTime: post.created_utc,
            title: post.title,
            author: post.author,
            thumbnail: post.thumbnail,
            commentsNumber: post.num_comments,
            clicked: post.clicked,
            // Format url correctly
            imageLink: post.preview?.images[0]?.source?.url.split('amp;').join('')
          }
        }
      }, {})

      dispatch(
        fetchTopPostsSuccess({
          data: normalizedPosts,
          list: posts.map(({ data: post }) => post.id)
        })
      )
    })
    .catch((e) => dispatch(fetchTopPostsFailed(e)))
}
