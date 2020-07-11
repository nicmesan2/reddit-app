import React from 'react'
import { useSelector } from 'react-redux'
import Gallery from 'react-grid-gallery'
import styled from 'styled-components'

const Container = styled.div`
  padding: 50px;
  margin: auto;
  width: auto;
  align-items: center;
  height: 100vh;
  position: relative;
  top: 53px;
`

const GalleryPage = () => {
  const { bookmarkedImages } = useSelector(state => state.topList)
  const images = bookmarkedImages.map(bookmark => {
    return {
      src: bookmark.image.src,
      thumbnail: bookmark.image.thumbnail,
      thumbnailWidth: bookmark.image.thumbnailWidth,
      thumbnailHeight: bookmark.image.thumbnailHeight
    }
  })
  return (
    <Container>
      <Gallery images={images} />
    </Container>
  )
}

export default GalleryPage
