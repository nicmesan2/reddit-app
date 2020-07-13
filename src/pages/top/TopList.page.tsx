import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from './topList.actions'
import { getPaginatedPosts, getPostsList, getPost } from './selectors'
import { Pagination, Button, PostDeatail, IconButton } from '../../components'
import TopList from './components/TopList.component'
import './styles.css'

const Container = styled.div`
  margin-top: 48px;
  display: flex;
  height: calc(100vh - 49px);
  box-sizing: border-box;

  @media only screen and (min-width: 64em) {
    padding: 40px;
  }
`
const ErrorContainer = styled.div`
  height: calc(100vh - 49px);
  position: relative;
  top: 53px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SelectorContainer = styled.div`
  max-width: ${(props) => (props.visible ? '100%' : 0)};
  transition: max-width 0.5s;
  overflow: scroll;
  max-width: ${(props) => (!props.visible ? '0' : 'auto')};
  display: flex;
  border: thin solid #ccc;
  flex: 0 0 75%;
  background-color: white;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 64em) {
    flex: 0 0 30%;
  }
`

const DismissAllContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  flex: 0;
`

const TopListContainer = styled.div`
  flex: 1;
  overflow: scroll;
`

const ErrorMessage = styled.p`
  margin-bottom: 10px;
`

const DetailPostContainer = styled.div`
  border-left: 0;
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
  flex: 1;
`

const DrawerIcon = styled.div`
  cursor: pointer;
  width: 25px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: thin solid #ccc;
  border-top: thin solid #ccc;

  :hover {
    color: #0078d3;
  }
`

const TopListPage = () => {
  const POSTS_PER_PAGE = 10
  const isLoading = useSelector((state) => state.topList.isLoading)
  const error = useSelector((state) => state.topList.error)
  const postList = useSelector(getPostsList)
  const selectedPost = useSelector(getPost)
  const [pagination, setPagination] = useState({ activePage: 1, totalItemsCount: 0 })
  const visiblePosts = useSelector(getPaginatedPosts(pagination.activePage, POSTS_PER_PAGE))
  const dispatch = useDispatch()
  const [selectorVisible, setSelectorVisible] = useState(true)

  const fetchPosts = () => dispatch(actions.fetchTopPosts())

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reset pagination when new posts are fetched
  useEffect(() => {
    setPagination((currentPagination) => ({ ...currentPagination, totalItemsCount: postList.length }))
  }, [postList])

  const handleDeletePost = (postId) => dispatch(actions.removePost(postId))

  const handlePostClick = (postId) => dispatch(actions.selectPost(postId))

  const handleSave = (postId, imageLink, imageBookmarked) => {
    if (imageBookmarked) {
      return dispatch(actions.unbookmarkImage(postId, imageLink))
    }

    return dispatch(actions.bookmarkImage(postId, imageLink))
  }

  const handlePaginationChange = (newPage) =>
    setPagination((currentPagination) => ({ ...currentPagination, activePage: newPage }))

  const handleToggleSelector = () => setSelectorVisible(!selectorVisible)

  const handleRemoveAllPosts = () => dispatch(actions.removeAllPosts())

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
      <SelectorContainer visible={selectorVisible}>
        <DismissAllContainer>
          <IconButton onClick={handleRemoveAllPosts} iconName="ban" label="Hide All" />
        </DismissAllContainer>
        <TopListContainer>
          <TopList
            isLoading={isLoading}
            posts={visiblePosts}
            onClick={handlePostClick}
            onDelete={handleDeletePost}
            onSave={handleSave}
          />
        </TopListContainer>
        <Pagination {...pagination} itemsCountPerPage={POSTS_PER_PAGE} onChange={handlePaginationChange} />
      </SelectorContainer>
      <DrawerIcon onClick={handleToggleSelector}>
        <FontAwesomeIcon icon={selectorVisible ? faChevronLeft : faChevronRight} />
      </DrawerIcon>
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

export default TopListPage
