import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Post } from '../../../components'

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const TopList = ({ isLoading, posts, onClick, onDelete, onSave }) => {
  if (isLoading) {
    const mockedData = Array(12).fill({ isLoading: true })

    return (
      <div>
        {mockedData.map((placeholder, i) => (
          <Post key={i} isLoading />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return <Message>No posts found :(</Message>
  }

  return (
    <TransitionGroup>
      {posts.map((post) => (
        <CSSTransition classNames="post" timeout={200} key={post.id}>
          <Post onSave={onSave} onPostClick={onClick} onDeleteClick={onDelete} {...post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default TopList
