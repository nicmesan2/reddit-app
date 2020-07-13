import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ImageInterface, PostInterface } from '../../topList.types'
import { Post } from '../../../../components'

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

interface TopListInterface {
  isLoading?: boolean
  posts: PostInterface[]
  onClick: (postId?: string) => {}
  onDelete: (postId?: string) => {}
  onSave: (postId?: string, image?: ImageInterface, imageBookmarked?: boolean) => {}
}

const PostList: React.FC<TopListInterface> = ({ isLoading = false, posts, onClick, onDelete, onSave }) => {
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
        <CSSTransition timeout={200} classNames="post" key={post.id}>
          <Post onSave={onSave} onPostClick={onClick} onDeleteClick={onDelete} {...post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default PostList
