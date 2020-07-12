import axios from 'axios'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  REMOVE_POST,
  REMOVE_ALL,
  BOOKMARK_IMAGE,
  UNBOOKMARK_IMAGE,
  SELECT_POST,
  SelectPost,
  FetchPostsRequest,
  FetchPostsSuccess,
  FetchPostsFailed,
  BookmarkImage,
  UnbookmarkImage,
  RemovePost,
  ImageInterface,
  RemoveAllPosts,
  PostsInterface
} from './topList.types'

export const removeAllPosts = (): RemoveAllPosts => ({
  type: REMOVE_ALL
})

export const selectPost = (postId: string): SelectPost => ({
  type: SELECT_POST,
  payload: postId
})
export const bookmarkImage = (postId: string, image: ImageInterface): BookmarkImage => ({
  type: BOOKMARK_IMAGE,
  payload: { postId, image }
})

export const unbookmarkImage = (postId: string, image: ImageInterface): UnbookmarkImage => ({
  type: UNBOOKMARK_IMAGE,
  payload: { postId, image }
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
    .get('https://www.reddit.com/top.json?limit=50')
    .then((response) => {
      const posts = response.data.data.children

      const normalizedPosts = posts.reduce((acc, { data: post }) => {
        console.log(post.title, post.preview?.images[0]?.source?.url)
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
            image: {
              src: post.preview?.images[0]?.source?.url.split('amp;').join(''),
              thumbnail: post.thumbnail,
              thumbnailHeight: post.thumbnail_height,
              thumbnailWidth: post.thumbnail_width
            }
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
