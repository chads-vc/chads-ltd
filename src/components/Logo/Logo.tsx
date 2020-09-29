import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import logoType from '../../assets/img/textlogo.webp'
import camera from '../../assets/img/camera.gif'

import logoType0 from '../../assets/img/logotype0.png'
import logoType1 from '../../assets/img/logotype1.png'
import logoType2 from '../../assets/img/logotype2.png'
import logoType3 from '../../assets/img/logotype3.png'
import logoType4 from '../../assets/img/logotype4.png'

interface LogoProps {
  logotypeIndex?: number
}

const Logo: React.FC<LogoProps> = ({logotypeIndex}) => {

  let logoTypeImg: string
  
  logoTypeImg = [
    logoType0,
    logoType1,
    logoType2,
    logoType3,
    logoType4
  ][logotypeIndex];

  return (
    <StyledLogo to="/">
      <StyledCamera src={camera} />
      <StyledLogoType src={logoTypeImg} />
      <StyledTitle>the finest nft collectibles</StyledTitle>
      <StyledSubtitle>a division of chads.vc</StyledSubtitle>
    </StyledLogo>
  )
}

const StyledCamera = styled.img`
  top: 3px;
  width: 92px;
  height: 78px;
  left: 133px;
  z-index: 3;
`
const StyledLogoType = styled.img`
  position: absolute;
  width: 400px;
  height: 100px;
  top: 30px;
  z-index: 2;
`

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
  position: relative;
`

const StyledTitle = styled.div`
  font-size: 23px;
  text-shadow: rgba(255, 255, 255, 0.6) 1px 1px 1px, rgba(0, 0, 0, 0.6) -1px -1px 1px;
  color: #02F252;
  position: absolute;
  top: 105px;
  left: 43px;
  z-index: 1;
`
const StyledSubtitle = styled.div`
  font-size: 12px;
  letter-spacing: normal;
  color: #02F2F2;
  text-shadow: rgba(255, 255, 255, 0.6) 1px 1px 1px, rgba(0, 0, 0, 0.6) -1px -1px 1px;
  position: absolute;
  top: 128px;
  left: 46px;
  z-index: 1;
`

export default Logo