import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Placeholder, IconButton } from '..'

interface PostProps {
  id?: string
  createdTime?: number
  title?: string
  author?: string
  thumbnail?: string
  commentsNumber?: string
  clicked?: boolean
  isLoading?: boolean
  imageLink?: string
  onDeleteClick?: (postId?: string) => {}
  onPostClick?: (postId?: string) => {}
  onSave?: (postId?: string, imageLink?: string) => {}
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
  flex: 0 0 80px;
  height: 60px;
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
  text-decoration: none;
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
  thumbnail,
  commentsNumber,
  clicked,
  onDeleteClick,
  onSave,
  onPostClick,
  imageLink,
  imageBookmarked,
  isLoading = false
}) => {
  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(id)
    }
  }

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(id)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(id, imageLink)
    }
  }

  return (
    <Container onClick={handlePostClick}>
      {isLoading ? (
        <Placeholder width={80} height={60} />
      ) : (
        <a href={imageLink} rel="noreferrer" target="_blank">
          <Thumbnail src={thumbnail} alt={title} />
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
