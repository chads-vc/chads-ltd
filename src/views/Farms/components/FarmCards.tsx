import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps} from 'react-countdown'
import { useWallet } from 'use-wallet'
import numeral from 'numeral'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import Page from '../../../components/Page'

import useFarms from '../../../hooks/useFarms'
import useYam from '../../../hooks/useYam'

import { Farm } from '../../../contexts/Farms'

import { bnToDec } from '../../../utils'
import { getEarned, getPoolStartTime } from '../../../yamUtils'

import greekRare from '../../../assets/img/greek-rare.png'
import greekCommon from '../../../assets/img/greek-common.png'
import gradientBg from '../../../assets/img/blue-pink-gradient.png'
import wavyClipArt from '../../../assets/img/wavy-clipart.png'

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  return (
    <Page>
      <StyledCards>
        {!!rows[0].length ? rows.map((farmRow, i) => (
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
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>)
        )) : (
            <StyledLoadingWrapper>
              <Loader text="Loading.." />
            </StyledLoadingWrapper>
          )}
      </StyledCards>
    </Page>
  )
}

interface FarmCardProps {
  farm: Farm,
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { contract } = farm
  const { account } = useWallet()
  const yam = useYam()

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      getStartTime()
    }
  }, [farm, getStartTime])

  useEffect(() => {
    async function fetchEarned () {
      const earned = await getEarned(yam, contract, account)
      setHarvestable(bnToDec(earned))
    }
    if (yam && account) {
      fetchEarned()
    }
  }, [yam, contract, account, setHarvestable])
  
  const poolActive = startTime * 1000 - Date.now() <= 0
  return (
    <StyledCardWrapper>
      {farm.id === 'ycrv_yam_uni_lp' && (
        <StyledCardAccent />
      )}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.depositToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <StyledHarvestable>
              {harvestable ? `${numeral(harvestable).format('0.00a')} YAMs ready to harvest.` : undefined}
            </StyledHarvestable>
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/farms/${farm.id}`}
            >
              {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
            </Button>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
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

const StyledDetails = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${props => props.theme.color.grey[500]};
`

const StyledHarvestable = styled.div`
  color: ${props => props.theme.color.secondary.main};
  font-size: 16px;
  height: 48px;
  text-align: center;
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

export default FarmCards
