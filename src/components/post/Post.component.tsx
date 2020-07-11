import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Placeholder, IconButton } from '..'
import { ImageInterface } from '../../pages/top/topList.types'

interface PostProps {
  id?: string
  createdTime?: number
  title?: string
  author?: string
  commentsNumber?: string
  clicked?: boolean
  isLoading?: boolean
  image?: ImageInterface
  onDeleteClick?: (postId?: string) => {}
  onPostClick?: (postId?: string) => {}
  onSave?: (postId?: string, image?: ImageInterface) => {}
  imageBookmarked?: boolean
}

const Container = styled.div`
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  border: thin solid #ccc;
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 8px;
  margin-bottom: -1px;
  background-color: #ffffff;

  :hover {
    border: thin solid black;
    z-index: 1;
  }
`

const Thumbnail = styled.img`
  display: flex;
  height: 60px;
  width: 80px;
`
const PostInfo = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const Title = styled.h3`
  font-size: 1.2rem;
  color: ${(props) => (props.clicked ? 'grey' : '#222222')};
  display: inline;
  position: relative;
  word-break: break-word;
`

const PostAuthorInfo = styled.div`
  margin: 5px 0;
  color: #787c7e;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
`

const ButtonsContainer = styled.div`
  display: flex;
`

const PostComponent: React.FC<PostProps> = ({
  createdTime = 0,
  title,
  id,
  author,
  commentsNumber,
  clicked,
  onDeleteClick,
  onSave,
  onPostClick,
  image,
  imageBookmarked,
  isLoading = false
}) => {
  const handleDeleteClick = e => {
    e.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick(id)
    }
  }

  const handlePostClick = e => {
    if (onPostClick) {
      onPostClick(id)
    }
  }

  const handleSave = e => {
    e.stopPropagation()
    if (onSave) {
      onSave(id, image)
    }
  }
  
  return (
    <Container onClick={handlePostClick}>
      {isLoading ? (
        <Placeholder width={80} height={60} />
      ) : (
        <a href={image?.src} rel="noreferrer" target="_blank">
          <Thumbnail src={image?.thumbnail} alt={title} />
        </a>
      )}
      <PostInfo>
        {isLoading ? <Placeholder width={300} /> : <Title clicked={clicked}>{title}</Title>}
        <PostAuthorInfo>
          {isLoading ? (
            <Placeholder width={200} />
          ) : (
            <span>{`• Created ${moment.unix(createdTime).fromNow()} by ${author} - ${commentsNumber} Comments`}</span>
          )}
        </PostAuthorInfo>
        <ButtonsContainer>
          {onDeleteClick ? <IconButton label="Hide" iconName="ban" onClick={handleDeleteClick} /> : null}
          {onSave ? (
            <IconButton
              color={imageBookmarked ? 'gold' : 'grey'}
              label={imageBookmarked ? 'Remove from gallery' : 'Save to gallery'}
              iconName="bookmark"
              onClick={handleSave}
            />
          ) : null}
        </ButtonsContainer>
      </PostInfo>
    </Container>
  )
}

export default PostComponent
