import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: #0079d3;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 24px;
  text-transform: uppercase;
  padding: 3px 16px;

  :hover  {
    background-color: #7fbce9;
  }
`
const Button = ({ onClick, children }) => <StyledButton onClick={onClick}>{children}</StyledButton>

export default Button
