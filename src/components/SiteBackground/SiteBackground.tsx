import React from 'react'
import styled from 'styled-components'
import siteBackgroundImg0 from '../../assets/img/mall0.jpg'
import siteBackgroundImg1 from '../../assets/img/mall1.jpg'
import siteBackgroundImg2 from '../../assets/img/mall2.jpg'
import siteBackgroundImg3 from '../../assets/img/mall3.jpg'
import siteBackgroundImg4 from '../../assets/img/mall4.jpg'
import siteBackgroundImg5 from '../../assets/img/mall5.jpg'
import siteBackgroundImg6 from '../../assets/img/mall6.jpg'
import siteBackgroundImg7 from '../../assets/img/mall7.png'
import siteBackgroundImg8 from '../../assets/img/mall8.png'

interface SiteBackgroundProps {
  backgroundIndex?: number
}

const SiteBackground: React.FC<SiteBackgroundProps> = ({
  backgroundIndex
}) => {
  let backgroundImage: string
  
  backgroundImage = [
    siteBackgroundImg0,
    siteBackgroundImg1,
    siteBackgroundImg2,
    siteBackgroundImg3,
    siteBackgroundImg4,
    siteBackgroundImg5,
    siteBackgroundImg6,
    siteBackgroundImg7,
    siteBackgroundImg8
  ][backgroundIndex];

  return (
    <StyledBackground backgroundImage={backgroundImage}>
    </StyledBackground>
  )
}

interface StyledBackgroundProps {
  backgroundImage: string
}

const StyledBackground = styled.div<StyledBackgroundProps>`
  position: fixed;
  z-index: -1;
  pointer-events: none;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-size: cover;
  background-image: url(${props => props.backgroundImage});
`

export default SiteBackground

