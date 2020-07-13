import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
const Header = styled.div`
  margin-bottom: 10px
`

const Image = styled.img`
  object-fit: contain;
  height: auto;
  width: 80%;

  @media only screen and (min-width: 64em) {
    width: 50%;
  }
`

interface PostDetailInterface {
  title: string
  imageSrc: string
  user: string
}

const PostDetail: React.FC<PostDetailInterface> = ({ title, imageSrc, user }) => (
  <Wrapper>
    <Header>
      <h2>{title}</h2>
      <p>{`- by ${user}`}</p>
    </Header>
    <Container>
      <Image src={imageSrc} />
    </Container>
  </Wrapper>
)

export default PostDetail
