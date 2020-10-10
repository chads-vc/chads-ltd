import React from 'react'
import styled, { keyframes } from 'styled-components'

interface DroppedCoppedLabelProps {
  dropped?: number,
  copped?: number
}

const DroppedCoppedLabel: React.FC<DroppedCoppedLabelProps> = ({ dropped, copped }) => {
  return (
    <StyledDroppedCoppedWrapper>
      <StyledDroppedContainer>
        <StyledDroppedLabel>DROPPED</StyledDroppedLabel>
        <StyledDroppedSpan>{dropped}</StyledDroppedSpan>
      </StyledDroppedContainer>
      <StyledCoppedContainer>
        <StyledCoppedLabel>COPPED</StyledCoppedLabel>
        <StyledCoppedSpan>{copped}</StyledCoppedSpan>
      </StyledCoppedContainer>
    </StyledDroppedCoppedWrapper>
  )
}



const StyledDroppedSpan = styled.span`
  display: block;
  text-align: center;
  color: #BA83F0;
`

const StyledDroppedLabel = styled.label`
  font-size: 20px;
  color: #BA83F0;
  display: block;
`
const StyledCoppedSpan = styled.span`
  display: block;
  text-align: center;
  color: #BA83F0;
`
const StyledCoppedLabel = styled.label`
  font-size: 20px;
  color: #BA83F0;
  display: block;
`

const StyledDroppedCoppedWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  width: 100%;
  top: 0;
  left: 0;
`

const StyledDroppedContainer = styled.div`
  display: block;
  line-height: 1;
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
`

const StyledCoppedContainer = styled.div`
  display: block;
  line-height: 1;
  position: absolute;
  padding: 10px;
  top: 0;
  right: 0;
`

export default DroppedCoppedLabel;
