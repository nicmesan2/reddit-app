import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 53px);
  position: relative;
  top: 53px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NotFound = () => <Container>Page not found :(</Container>

export default NotFound
