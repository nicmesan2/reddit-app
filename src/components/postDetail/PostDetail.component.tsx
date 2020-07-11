import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  height: 75%;
  width: auto;
  object-fit: cover;
`
const PostDetail = ({ title, imageSrc, user }) => (
  <Container>
    <h2>{title}</h2>
    <p>{`by ${user}`}</p>
    <Image src={imageSrc} />
  </Container>
)

export default PostDetail
