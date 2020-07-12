export interface ImageInterface {
  src: string, thumbnail: string, thumbnailHeight: number, thumbnailWidth: number
}

export interface PostInterface {
  imageBookmarked: boolean
  clicked: boolean
  id: string
  createdTime: number
  author: string
  comments: number
  title: string
  image: ImageInterface
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
    image: ImageInterface
  }>
  selectedPostId: string
}

export const FETCH_POSTS_REQUEST = '@top/FETCH_POST_REQUEST'
export const FETCH_POSTS_SUCCESS = '@top/FETCH_POST_SUCCESS'
export const FETCH_POSTS_FAILED = '@top/FETCH_POST_FAILED'
export const REMOVE_POST = '@top/REMOVE_POST'
export const REMOVE_ALL = '@top/REMOVE_ALL'
export const READ_POST = '@top/READ_POST'
export const BOOKMARK_IMAGE = '@top/BOOKMARK_IMAGE'
export const UNBOOKMARK_IMAGE = '@top/UNBOOKMARK_IMAGE'
export const SELECT_POST = '@top/SELECT_POST'

export interface RemoveAllPosts {
  type: typeof REMOVE_ALL
}

export interface SelectPost {
  type: typeof SELECT_POST
  payload: string
}
export interface BookmarkImage {
  type: typeof BOOKMARK_IMAGE,
  payload: { postId: string, image: ImageInterface}
}

export interface UnbookmarkImage {
  type: typeof  UNBOOKMARK_IMAGE,
  payload: { postId: string, image: ImageInterface}
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

export type TopListActionTypes = FetchPostsRequest | FetchPostsSuccess | FetchPostsFailed | RemovePost | BookmarkImage | UnbookmarkImage | SelectPost | RemoveAllPosts
