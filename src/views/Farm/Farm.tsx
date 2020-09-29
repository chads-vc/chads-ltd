import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Card from '../../components/Card'
import CardContent from '../../components/CardContent'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Loader from '../../components/Loader'
import DroppedCoppedLabel from '../../components/DroppedCoppedLabel'

import useEarnings from '../../hooks/useEarnings'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'

import { chadletsCards } from '../../yam/lib/constants.js';

import greekRare from '../../assets/img/greek-rare.png'
import greekCommon from '../../assets/img/greek-common.png'
import gradientBg from '../../assets/img/blue-pink-gradient.png'
import wavyClipArt from '../../assets/img/wavy-clipart.png'

import cardImg1 from '../../assets/img/cards/1.gif'
import cardImg2 from '../../assets/img/cards/2.gif'
import cardImg3 from '../../assets/img/cards/3.gif'
import cardImg4 from '../../assets/img/cards/4.gif'
import cardImg5 from '../../assets/img/cards/5.gif'
import cardImg6 from '../../assets/img/cards/6.gif'

import buyButtonActive from '../../assets/img/buy-button-active.gif'
import buyButtonDisabled from '../../assets/img/buy-button-disabled.png'

const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const earnings = useEarnings(contract)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  const rows = chunk(chadletsCards, 3);

  const cardImages = [
    cardImg1,
    cardImg2,
    cardImg3,
    cardImg4,
    cardImg5,
    cardImg6
  ]
  return (
    <>
      {false && <PageHeader
        icon={icon}
        subtitle={`Deposit ${depositTokenName} and earn ${earnTokenName}`}
        title={name}
      />}
      {false && <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={contract} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>}

      <StyledCards>
        {!!rows[0].length ? rows.map((cardRow, i) => (
          (i === 0 || i === 1) && (<StyledRow key={i}>
            <StyledRowHeader>
              {i === 0 && 
                <React.Fragment>
                  <StyledGreekImage src={greekRare} />
                  <StyledHeading>
                    420 Chadlets
                  </StyledHeading>
                  <StyledWavyRare src={wavyClipArt} />
                </React.Fragment>
              }
              {i === 1 &&
                <React.Fragment>
                  <StyledGreekImage src={greekCommon} />
                  <StyledHeading>
                    69 Chadlets
                  </StyledHeading>
                  <StyledWavyCommon src={wavyClipArt} />
                </React.Fragment>
              }
            </StyledRowHeader>
            <StyledCardsRow>
              {cardRow.map((card, j) => {
                console.log(card);
                return (<StyledCard key={j}>
                  <StyledCardContent>
                    <StyledContent>
                      <StyledCardImage src={cardImages[i*3+j]} />
                    </StyledContent>
                    <StyledCardActions>
                      <Button
                        onClick={() => onRedeem(i + 1)}
                        text=""
                        disabled={!earnings.toNumber()}
                      />
                      <StyledBuyButton src={!earnings.toNumber() ? buyButtonDisabled : buyButtonActive} />
                      <DroppedCoppedLabel dropped={i === 0 ? 100 : 1000} copped={0} />
                    </StyledCardActions>
                  </StyledCardContent>
                </StyledCard>)
              })}
            </StyledCardsRow>
          </StyledRow>)
        )) : (
          <StyledLoadingWrapper>
            <Loader text="Loading.." />
          </StyledLoadingWrapper>
        )}
      </StyledCards>
    </>
  )
}

function chunk(array, size) {
  if (!array) return [];
  const firstChunk = array.slice(0, size);
  if (!firstChunk.length) {
    return array;
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size)); 
}

const StyledCardActions = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`

const StyledCards = styled.div`
  width: 90%;
  margin-top: 220px;
  max-width: 980px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  position: relative;
  margin-top: 230px;
  margin-bottom: 300px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`
const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  width: 50px;
  height: 50px;
`

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`
const StyledRowHeader = styled.div`
  height: 164px;
  width: 890px;
  position: absolute;
  right: 0;
  top: -230px;
  background-size: 100% 100%;
  background-image: url(${gradientBg});
`

const StyledHeading = styled.div`
  display: block;
  text-align: right;
  text-shadow: rgba(0, 0, 0, 0.298039) 0px 5px 0px;
  font-size: 75px;
  color: #02F2F2;
  text-transform: uppercase;
  position: absolute;
  bottom: 0px;
  right: 10px;
  z-index: 2;
`

const StyledGreekImage = styled.img`
  position: absolute;
  left: -120px;
  top: -80px;
  width: 400px;
  transform: rotate(-10deg);
`
const StyledWavyRare = styled.img`
  position: absolute;
  right: -30px;
  top: 0px;
  transform: rotate(-210deg);
  width: 263px;
  height: 204px;
  object-fit: cover;
`
const StyledWavyCommon = styled.img`
  position: absolute;
  right: -30px;
  top: 0px;
  transform: rotate(110deg);
  width: 223px;
  height: 284px;
  object-fit: cover;
`

const StyledCardContent = styled.div`
`

const StyledCardsRow = styled.div`
  display: flex;
  justify-content: space-around;
`

const StyledCardImage = styled.img`
  width: 100%;
`
const StyledCard = styled.div`
  width: 30%;
`

const StyledBuyButton = styled.img`
  position: absolute;
  width: 82px;
  height: 61px;
  object-fit: cover;
`
const StyledDroppedContainer = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 82px;
  height: 61px;
  object-fit: cover;
`
const StyledCoppedContainer = styled.img`
  position: absolute;
  width: 82px;
  height: 61px;
  top: 0;
  right: 0;
  object-fit: cover;
`


export default Farm
