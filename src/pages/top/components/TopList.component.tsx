import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as actions from '../actions'
import { getPaginatedPosts, getPostsList } from '../selectors'
import { Post, Pagination } from '../../../components'
import './styles.css'

const TopList = () => {
  const POSTS_PER_PAGE = 5
  const isLoading = useSelector((state) => state.topList.isLoading)
  const postList = useSelector(getPostsList)
  const [pagination, setPagination] = useState({ activePage: 1, totalItemsCount: 0 })
  const visiblePosts = useSelector(getPaginatedPosts(pagination.activePage, POSTS_PER_PAGE))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.fetchTopPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    setPagination(currentPagination => ({ ...currentPagination, totalItemsCount: postList.length}))
  }, [postList])

  const handleDeletePost = (postId) => dispatch(actions.removePost(postId))
  
  const handleReadPost = (postId) => dispatch(actions.readPost(postId))

  const renderPostPlaceHolders = () =>
    Array(5)
      .fill({ isLoading: true })
      .map((placeholder, i) => <Post key={i} isLoading />)

  const renderPosts = () => (
    <TransitionGroup className="todo-list">
      {visiblePosts.map((post) => (
        <CSSTransition classNames="post" timeout={200} key={post.id}>
          <Post onPostClick={handleReadPost} onDeleteClick={handleDeletePost} {...post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )

  const handlePaginationChange = (newPage) =>
    setPagination((currentPagination) => ({ ...currentPagination, activePage: newPage }))

  return (
    <div style={{ padding: 40, marginTop: 48 }}>
      {isLoading ? renderPostPlaceHolders() : renderPosts()}
      <Pagination {...pagination} itemsCountPerPage={POSTS_PER_PAGE} onChange={handlePaginationChange} />
    </div>
  )
}

export default TopList
