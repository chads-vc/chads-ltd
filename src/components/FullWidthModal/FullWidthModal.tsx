import React from 'react'
import styled, { keyframes } from 'styled-components'
import coppedBackground from '../../assets/img/mall-copped.jpg'

export interface FullWidthModalProps {
  cardId?: number,
  onDismiss?: () => void,
}

const FullWidthModal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>
        {children}
      </StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${props => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} .3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  background: #28D7E9;
  background-image: url(${coppedBackground});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 999;
`

const StyledModalContent = styled.div``

export default FullWidthModal
