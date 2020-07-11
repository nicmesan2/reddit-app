import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faBookmark } from '@fortawesome/free-solid-svg-icons'

const iconsNames = {
  ban: faBan,
  bookmark: faBookmark
}
const StyledButton = styled.button`
  color: ${props => props.color};
  cursor: pointer;
  background: transparent;
  border-radius: 2px;
  height: 25px;
  margin-right: 4px;
  padding-right: 4px;
  text-transform: capitalize;
  white-space: nowrap;
  width: auto;
  word-break: normal;
  display: flex;
  align-items: center;

  :hover {
    background-color: rgb(26, 26, 27, 0.1);
  }
`
const Button = ({ onClick, iconName, label, size = 12, color = 'grey' }) => (
  <StyledButton color={color} onClick={onClick}>
    {iconName ? <FontAwesomeIcon style={{ fontSize: size, marginRight: 3 }} icon={iconsNames[iconName]} /> : null}
    <span style={{ fontSize: size }}>{label}</span>
  </StyledButton>
)

export default Button
