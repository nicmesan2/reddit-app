import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: 45px;
  height: 16px;
  border-radius: 30px;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderAnimatedBackground;
  animation-timing-function: linear;
  background: #eee;
  background: linear-gradient(to right, #eee 10%, #ddd 20%, #eee 35%);
  background-size: 800px 100px;

  @keyframes placeholderAnimatedBackground {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`

interface PlaceholderInterface {
  width?: number
  height?: number
}

const PlaceholderComponent: React.FC<PlaceholderInterface> = ({ width = -1, height = -1 }) => (
  <Container
    data-testid="Placeholder"
    style={{
      ...(width !== -1 && {
        width: `${width}px`
      }),
      ...(height !== -1 && {
        height: `${height}px`
      }),
      animationDelay: `0.22s`
    }}
  />
)

export default PlaceholderComponent
