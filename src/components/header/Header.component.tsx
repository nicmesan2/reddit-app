import React from 'react'
import styled, { css } from 'styled-components'
import { IconButton } from '../index'
import { ReactComponent as LogoImage } from '../../assets/logo.svg'
import { ReactComponent as LogoText } from '../../assets/textLogo.svg'
import { Link } from 'react-router-dom'

const Head = styled.header`
  flex: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 80;
  margin-top: 0;
`

const Container = styled.div`
  -ms-flex-align: center;
  background-color: white;
  border-bottom: 1px solid #edeff1;
  padding: 0 20px;
  color: black;
  display: flex;
`
const logoStyle = css`
  height: 32px;
  padding: 8px 8px 8px 0;
  width: 32px;
`

const LinksContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  /* text-align: right; */
  display: flex;
`
const StyledLogo = styled(LogoImage)`
  ${logoStyle}
`

const StyledTextLogo = styled(LogoText)`
  ${logoStyle}
`

const HeaderComponent = (props) => (
  <Head>
    <Container>
      <StyledLogo />
      <StyledTextLogo />
      <LinksContainer>
        <Link to="/">
        <IconButton
          label="Top Posts"
          iconName="chart"
          color="#0079d3"
          size={16}
        />
        </Link>
        <Link to="/gallery">
        <IconButton
          label="Image Gallery"
          iconName="camera"
          color="#0079d3"
          size={16}
        />
        </Link>
      </LinksContainer>
    </Container>
  </Head>
)

export default HeaderComponent
