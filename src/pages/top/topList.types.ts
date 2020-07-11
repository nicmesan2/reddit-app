export interface PostInterface {
  imageBookmarked: boolean
  clicked: boolean
  id: string
  createdTime: number
  author: string
  comments: number
  title: string
}

export interface PostsInterface {
  list: Array<string>
  data: Record<string, PostInterface>
}

export interface TopListState {
  isLoading: boolean
  posts: PostsInterface
  error: string
  removedPosts: string[]
  readPosts: string[]
  bookmarkedImages: Array<{
    postId: string
    imageLink: string
  }>
}

export const FETCH_POSTS_REQUEST = '@top/FETCH_POST_REQUEST'
export const FETCH_POSTS_SUCCESS = '@top/FETCH_POST_SUCCESS'
export const FETCH_POSTS_FAILED = '@top/FETCH_POST_FAILED'
export const REMOVE_POST = '@top/REMOVE_POST'
export const READ_POST = '@top/READ_POST'
export const BOOKMARK_IMAGE = '@top/BOOKMARK_IMAGE'
export const UNBOOKMARK_IMAGE = '@top/UNBOOKMARK_IMAGE'

export interface BookmarkImage {
  type: typeof BOOKMARK_IMAGE,
  payload: { postId: string, imageLink: string}
}

export interface UnbookmarkImage {
  type: typeof  UNBOOKMARK_IMAGE,
  payload: { postId: string, imageLink: string}
}

export interface ReadPost {
  type: typeof READ_POST,
  payload: string
}
export interface RemovePost {
  type: typeof REMOVE_POST
  payload: string
}

export interface FetchPostsRequest {
  type: typeof FETCH_POSTS_REQUEST
}

export interface FetchPostsSuccess {
  type: typeof FETCH_POSTS_SUCCESS
  payload: PostsInterface
}

export interface FetchPostsFailed {
  type: typeof FETCH_POSTS_FAILED
  payload: string
}

export type TopListActionTypes = FetchPostsRequest | FetchPostsSuccess | FetchPostsFailed | RemovePost | ReadPost | BookmarkImage | UnbookmarkImage
