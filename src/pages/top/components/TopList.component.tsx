import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import * as actions from '../actions'
import { getPaginatedPosts, getPostsList, getPost } from '../selectors'
import { Post, Pagination, Button, PostDeatail } from '../../../components'
import './styles.css'
import { is } from '@babel/types'

const Container = styled.div`
  padding: 40px;
  margin-top: 48px;
  display: flex;
  height: calc(100vh - 53px);
  box-sizing: border-box;
`
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

const SelectorContainer = styled.div`
  border: thin solid #ccc;
  flex: 0 0 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ErrorMessage = styled.p`
  margin-bottom: 10px;
`

const DetailPostContainer = styled.div`
  border: thin solid #ccc;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 70%;
  overflow: scroll;
  padding: 20px;
  border-left: 0;
`

const TopList = () => {
  const POSTS_PER_PAGE = 10
  const isLoading = useSelector((state) => state.topList.isLoading)
  const error = useSelector((state) => state.topList.error)
  const postList = useSelector(getPostsList)
  const selectedPost = useSelector(getPost)
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

  const handleReadPost = (postId) => dispatch(actions.selectPost(postId))

  const handleBookmark = (postId, imageLink) => dispatch(actions.bookmarkImage(postId, imageLink))

  const handleUnbookmark = (postId, imageLink) => dispatch(actions.unbookmarkImage(postId, imageLink))

  const renderPostPlaceHolders = () =>
    Array(12)
      .fill({ isLoading: true })
      .map((placeholder, i) => <Post key={i} isLoading />)

  const renderPosts = () => (
    <TransitionGroup>
      {visiblePosts.map((post) => (
        <CSSTransition classNames="post" timeout={200} key={post.id}>
          <Post
            onSave={post.imageBookmarked ? handleUnbookmark : handleBookmark}
            onPostClick={handleReadPost}
            onDeleteClick={handleDeletePost}
            {...post}
          />
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
    <Container>
      <SelectorContainer>
        <div style={{ overflow: 'scroll' }}>{isLoading ? renderPostPlaceHolders() : renderPosts()}</div>
        <Pagination {...pagination} itemsCountPerPage={POSTS_PER_PAGE} onChange={handlePaginationChange} />
      </SelectorContainer>
      <DetailPostContainer>
        {selectedPost ? (
          <PostDeatail user={selectedPost.author} imageSrc={selectedPost.image.src} title={selectedPost.title} />
        ) : (
          <p>Select a post</p>
        )}
      </DetailPostContainer>
    </Container>
  )
}

export default TopList
