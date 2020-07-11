import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as LogoImage } from '../../assets/logo.svg'
import { ReactComponent as LogoText } from '../../assets/textLogo.svg'

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
`
const logoStyle = css`
    height: 32px;
    padding: 8px 8px 8px 0;
    width: 32px;
`;

const StyledLogo = styled(LogoImage)`
  ${logoStyle}
`;

const StyledTextLogo = styled(LogoText)`
  ${logoStyle}
`;

const HeaderComponent = () => (
  <Head>
    <Container>
        <StyledLogo />
        <StyledTextLogo />
    </Container>
  </Head>
)

export default HeaderComponent
