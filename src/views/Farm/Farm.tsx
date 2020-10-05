import React, { useMemo, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Loader from '../../components/Loader'
import DroppedCoppedLabel from '../../components/DroppedCoppedLabel'

import useEarnings from '../../hooks/useEarnings'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useModal from '../../hooks/useModal'

import Harvest from './components/Harvest'

import CoppedModal from '../../components/CoppedModal'

import useYam from '../../hooks/useYam'
import { chadletsCards } from '../../yam/lib/constants.js';
import { getTotalCopped } from '../../yamUtils';

import greekRare from '../../assets/img/greek-rare.png'
import greekCommon from '../../assets/img/greek-common.png'
import gradientBg from '../../assets/img/button-bg-all-thirds.png'
import wavyClipArt from '../../assets/img/wavy-clipart.png'

import buyButtonActive from '../../assets/img/buy-button-active.gif'
import buyButtonDisabled from '../../assets/img/buy-button-disabled.png'

const Farm: React.FC = () => {
  const farmId = "chads_eth_uni_lp"
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

  const [totalCopped, setTotalCopped] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  const { account } = useWallet()
  const yam = useYam()

  const { onRedeem } = useRedeem(contract)
  const [onPresentCoppedModal1] = useModal(<CoppedModal cardId={1} />)
  const [onPresentCoppedModal2] = useModal(<CoppedModal cardId={2} />)
  const [onPresentCoppedModal3] = useModal(<CoppedModal cardId={3} />)
  const [onPresentCoppedModal4] = useModal(<CoppedModal cardId={4} />)
  const [onPresentCoppedModal5] = useModal(<CoppedModal cardId={5} />)
  const [onPresentCoppedModal6] = useModal(<CoppedModal cardId={6} />)
  const [onPresentCoppedModal7] = useModal(<CoppedModal cardId={7} />)

  const earnings = useEarnings(contract)
  const rows = chunk(chadletsCards, 3);
  console.log(rows);

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])
 
  const fetchTotalCopped = useCallback(async () => {
    let result = [];
    for (let i = 1; i <= chadletsCards.length; i++) {
      const cardCopped = await getTotalCopped(yam, i)
      result.push(cardCopped.toNumber());
    }
    setTotalCopped(result);
  }, [yam, setTotalCopped])

  useEffect(() => {
    if (yam) {
      fetchTotalCopped()
    }
  }, [yam, fetchTotalCopped])

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
          (<StyledRow key={i}>
            <StyledRowHeader>
              {i === 0 && 
               	<React.Fragment>
                  <StyledGreekImage src={greekCommon} />
                  <StyledHeading>
                    69 Chadlets
                  </StyledHeading>
                  <StyledWavyCommon src={wavyClipArt} />
                </React.Fragment>
              }
              {i > 0 &&
                 <React.Fragment>
                  <StyledGreekImage src={greekRare} />
                  <StyledHeading>
                    420 Chadlets
                  </StyledHeading>
                  <StyledWavyRare src={wavyClipArt} />
                </React.Fragment>
	       }
            </StyledRowHeader>
            <StyledCardsRow>
              {cardRow.map((card, j) => {
                return (<StyledCard key={j}>
                  <StyledCardContent>
                    <StyledContent>
                      <StyledCardImage src={`https://api.chads.vc/img/${card.index}.gif`} />
                    </StyledContent>
                    <StyledCardActions>
                      <Button
                        onClick={() => {
                          if (card.index == 1) {
                            onRedeem("1").then(txnHash => onPresentCoppedModal1());
                          } else if (card.index == 2) {
                            onRedeem("2").then(txnHash => onPresentCoppedModal2());
                          } else if (card.index == 3) {
                            onRedeem("3").then(txnHash => onPresentCoppedModal3());
                          } else if (card.index == 4) {
                            onRedeem("4").then(txnHash => onPresentCoppedModal4());
                          } else if (card.index == 5) {
                            onRedeem("5").then(txnHash => onPresentCoppedModal5());
                          } else if (card.index == 6) {
                            onRedeem("6").then(txnHash => onPresentCoppedModal6());
                          } else if (card.index == 7) {
                            onRedeem("7").then(txnHash => onPresentCoppedModal7());
                          }

                        }}
                        text=""
                        disabled={(earnings.toNumber() < card.pool.points) || (totalCopped[card.index-1] >= card.max_supply)} 
                      />
                      <StyledBuyButton src={(earnings.toNumber() < card.pool.points) ? buyButtonDisabled : buyButtonActive} />
                      { <DroppedCoppedLabel dropped={card.max_supply} copped={totalCopped[card.index-1]} /> }
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
    margin-top: 350px;
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
    margin-bottom: 350px;
    flex-flow: column nowrap;
    align-items: center;
  }
  @media (max-width: 768px) {
    margin-bottom: 310px;
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
  @media (max-width: 1024px) {
    width: calc(100% - 50px);
    height: 20vw;
    padding-top: 80px;
    display: flex;
    margin: 25px;
    flex-wrap: wrap;
  }

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
  @media (max-width: 1024px) {
    font-size: 8vw;
    bottom: 8px;
    right: 20px;
   }
`

const StyledGreekImage = styled.img`
  position: absolute;
  left: -120px;
  top: -80px;
  width: 400px;
  transform: rotate(-10deg);
  @media (max-width: 1024px) {
    left: -6vw;
    top: -6vw;
    width: 46vw;
    z-index: 2;
  }
`
const StyledWavyRare = styled.img`
  position: absolute;
  right: -30px;
  top: 0px;
  transform: rotate(-210deg);
  width: 263px;
  height: 204px;
  object-fit: cover;
  @media (max-width: 1024px) {
    transform: rotate(-190deg);
    width: 50vw;
    height: 30vw;
    right: 10px;
    top: -20px;
  }
`
const StyledWavyCommon = styled.img`
  position: absolute;
  right: -30px;
  top: 0px;
  transform: rotate(110deg);
  width: 223px;
  height: 284px;
  object-fit: cover;
  @media (max-width: 1024px) {
    transform: rotate(110deg);
    width: 183px;
    height: 164px;
    right: 10px;
    top: -30px;
  }
`

const StyledCardContent = styled.div`
`

const StyledCardsRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-top: 10vw;
  }
  @media (max-width: 768px) {
    margin-top: 3vw;
  }
  @media (max-width: 512px) {
    margin-top: -3vw;
  }
  @media (max-width: 400px) {
    margin-top: -40px;
  }
  @media (max-width: 350px) {
    margin-top: -60px;
  }
`

const StyledCardImage = styled.img`
  width: 100%;
`
const StyledCard = styled.div`
  width: 30%;
  @media (max-width: 520px) {
    width: 100%;
    padding: 25px;
  }
`

const StyledBuyButton = styled.img`
  position: absolute;
  width: 82px;
  pointer-events: none;
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
