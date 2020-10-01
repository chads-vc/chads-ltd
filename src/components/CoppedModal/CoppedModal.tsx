import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import FullWidthModal, { FullWidthModalProps } from '../FullWidthModal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import coppedSpinner from '../../assets/img/copped-spinner.gif'
import wavyClipart from '../../assets/img/wavy-clipart.png'

const CoppedModal: React.FC<FullWidthModalProps> = ({ onDismiss, cardId }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <FullWidthModal>
      <StyledModalContent>
        <StyledCardWrapper>
          <StyledWavyClipartWrapper>
            <StyledWavyClipart src={wavyClipart} />
          </StyledWavyClipartWrapper>
          <StyledCard src={`https://api.chads.vc/img/${cardId}.gif`} />
          <StyledCoppedSpinnerWrapper>
            <StyledCoppedSpinner src={coppedSpinner} />
          </StyledCoppedSpinnerWrapper>
        </StyledCardWrapper>
      </StyledModalContent>

      <StyledModalActions>
        <Button text="Gallery" variant="secondary" onClick={onDismiss} />
      </StyledModalActions>
    </FullWidthModal>
  )
}

const StyledModalActions = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 200px;
  margin: auto;
  z-index: 9;
`

const StyledModalContent = styled.div`
  max-width: 720px;
  margin: auto;
  position: relative;
`

const StyledWavyClipartWrapper = styled.div`
  z-index: 1;
  width: 785px;
  height: 751px;
  position: absolute;
  top: -120px;
  left: -300px;
  overflow: hidden;
  transform: rotate(8.209103096004185deg);
  @media (max-width: 768px) {
    width: 140vw;
    height: 160vw;
  }
`
const StyledWavyClipart = styled.img`
  position: absolute;
  z-index: 1;
  width: 677px;
  height: 840px;
  left: 197px;
  top: 38px;
  object-fit: cover;
}`

const StyledCard = styled.img`
  z-index: 2;
  top: 60px;
  position: absolute;
  width: 100%;
`

const StyledCoppedSpinnerWrapper = styled.div`
  z-index: 3;
  position: absolute;
  top: 30px;
  left: -460px;
  width: 658px;
  height: 300px;
  overflow: hidden;
  transform: rotate(338.15541147928184deg);
  @media (max-width: 768px) {
    top: 0;
    left: -40vw;
    width: 120vw;
    height: 70vw;
  }
`

const StyledCoppedSpinner = styled.img`

  position: absolute;
  width: 920px;
  top: 60px;
  right: -170px;
  @media (max-width: 768px) {
    width: 150vw;
    top: 0px;
    right: -100px;
  }
`

const StyledCardWrapper = styled.div`
  max-width: 346px;
  margin: auto;
  margin-top: 70px;
  position: relative;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export default CoppedModal
