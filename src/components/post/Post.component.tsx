import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Placeholder } from '..'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'

interface PostProps {
  id?: string
  createdTime?: number
  title?: string
  author?: string
  thumbnail?: string
  commentsNumber?: string
  clicked?: boolean
  isLoading?: boolean
  onDeleteClick?: (string) => {}
}

const Container = styled.div`
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  border: thin solid #ccc;
  display: flex;
  position: relative;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 8px;
  margin-bottom: -1px;
  background-color: #ffffff;
`

const Thumbnail = styled.img`
  display: flex;
  -ms-flex: 0 0 80px;
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
  color: #222222;
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
  -ms-flex-align: center;
  align-items: center;
`

const Comments = styled.div`
  color: #787c7e;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 32px;
  overflow: hidden;
  padding: 0 8px 0 4px;
  -ms-flex-positive: 1;
  flex-grow: 1;
`
// eslint-disable-next-line @typescript-eslint/camelcase
const PostComponent: React.FC<PostProps> = ({
  createdTime = 0,
  title,
  id,
  author,
  thumbnail,
  commentsNumber,
  clicked,
  onDeleteClick,
  isLoading = false
}) => {
  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(id)
    }
  }

  return (
    <Container>
      {isLoading ? <Placeholder width={80} height={60} /> : <Thumbnail src={thumbnail} alt={title} />}
      <PostInfo>
        {isLoading ? <Placeholder width={300} /> : <Title>{title}</Title>}
        <PostAuthorInfo>
          {isLoading ? (
            <Placeholder width={200} />
          ) : (
            <span>{`• Created ${moment.unix(createdTime).fromNow()} by ${author} - ${commentsNumber} Comments`}</span>
          )}
        </PostAuthorInfo>
      </PostInfo>
      {onDeleteClick ? <DeleteIcon onClick={handleDeleteClick} /> : null}
    </Container>
  )
}

export default PostComponent
