import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import * as actions from '../actions'
import { getPaginatedPosts, getPostsList } from '../selectors'
import { Post, Pagination, Button } from '../../../components'
import './styles.css'

const ErrorContainer = styled.div`
  height: calc(100vh - 53px);
  position: relative;
  top: 53px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ErrorMessage = styled.p`
  margin-bottom: 10px;
`

const TopList = () => {
  const POSTS_PER_PAGE = 5
  const isLoading = useSelector((state) => state.topList.isLoading)
  const error = useSelector((state) => state.topList.error)
  const postList = useSelector(getPostsList)
  const [pagination, setPagination] = useState({ activePage: 1, totalItemsCount: 0 })
  const visiblePosts = useSelector(getPaginatedPosts(pagination.activePage, POSTS_PER_PAGE))
  const dispatch = useDispatch()

  const fetchPosts = () => dispatch(actions.fetchTopPosts())

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPagination((currentPagination) => ({ ...currentPagination, totalItemsCount: postList.length }))
  }, [postList])

  const handleDeletePost = (postId) => dispatch(actions.removePost(postId))

  const handleReadPost = (postId) => dispatch(actions.readPost(postId))
  
  const handleBookmark = (postId, imageLink) => dispatch(actions.bookmarkImage(postId, imageLink))
  
  const handleUnbookmark = (postId, imageLink) => dispatch(actions.unbookmarkImage(postId, imageLink))

  const renderPostPlaceHolders = () =>
    Array(5)
      .fill({ isLoading: true })
      .map((placeholder, i) => <Post key={i} isLoading />)

  const renderPosts = () => (
    <TransitionGroup className="todo-list">
      {visiblePosts.map((post) => (
        <CSSTransition classNames="post" timeout={200} key={post.id}>
          <Post onSave={post.imageBookmarked ? handleUnbookmark : handleBookmark} onPostClick={handleReadPost} onDeleteClick={handleDeletePost} {...post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )

  const handlePaginationChange = (newPage) =>
    setPagination((currentPagination) => ({ ...currentPagination, activePage: newPage }))

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>Ups, an error occurred :(</ErrorMessage>
        <Button onClick={fetchPosts}>Try again!</Button>
      </ErrorContainer>
    )
  }

  return (
    <div style={{ padding: 40, marginTop: 48 }}>
      {isLoading ? renderPostPlaceHolders() : renderPosts()}
      <Pagination {...pagination} itemsCountPerPage={POSTS_PER_PAGE} onChange={handlePaginationChange} />
    </div>
  )
}

export default TopList
