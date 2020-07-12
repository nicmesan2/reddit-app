import React from 'react'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

const PaginationComponent = (props) => {
  const innerClass = 'innerClass'
  const itemClass = 'itemClass'
  const disabledClass = 'disabledClass'
  const activeLinkClass = 'activeLinkClass'
  const Wrapper = styled.div`
    flex: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    border-top: thin solid #ccc;
    margin-top: 10px;
    font-size: 20px;
    padding: 5px 0;

    & .${innerClass} {
      list-style: none;
      display: flex;
    }

    & .${itemClass} {
      padding: 0 8px;
      background-color: white;

      & a {
        color: black;

        :hover {
          color: #ff4500;
        }
      }
    }

    && .${activeLinkClass} {
      color: #ff4500;
    }

    & .${disabledClass} {
      & a {
        color: grey;
      }
    }
  `

  return (
    <Wrapper>
      <Pagination
        innerClass={innerClass}
        itemClass={itemClass}
        disabledClass={disabledClass}
        activeLinkClass={activeLinkClass}
        {...props}
      />
    </Wrapper>
  )
}

export default PaginationComponent
