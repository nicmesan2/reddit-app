import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as actions from '../actions'
import { getPostData } from '../selectors'
import { Post } from '../../../components'
import './styles.css'

const TopList = () => {
  const isLoading = useSelector((state) => state.topList.isLoading)
  const topList = useSelector(getPostData)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(actions.fetchTopPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleDeletePost = (postId) => dispatch(actions.removePost(postId))
  
  const renderPostPlaceHolders = () =>
    Array(5)
      .fill({ isLoading: true })
      .map((placeholder, i) => <Post key={i} isLoading />)
  
  const renderPosts = () => (
    <TransitionGroup className="todo-list">
      {topList.map((post) => (
        <CSSTransition classNames="post" timeout={500} key={post.id}>
          <Post onDeleteClick={handleDeletePost} {...post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
  
  return <div style={{ padding: 40, marginTop: 48 }}>{isLoading ? renderPostPlaceHolders() : renderPosts()}</div>
}

export default TopList
