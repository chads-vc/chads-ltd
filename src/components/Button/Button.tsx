import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import gradientBgFirst from '../../assets/img/button-bg-first-third.png'
import gradientBgSecond from '../../assets/img/button-bg-second-third.png'
import gradientBgThird from '../../assets/img/button-bg-third-third.png'
import gradientBgAll from '../../assets/img/button-bg-all-thirds.png'

import { Link } from 'react-router-dom'

interface ButtonProps {
  customColor?: 'purple' | 'blue' | 'pink',
  backgroundGradient?: string,
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary'
}

const Button: React.FC<ButtonProps> = ({
  customColor,
  backgroundGradient,
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let backgroundUrl: string

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  switch (customColor) {
    case 'purple':
      buttonColor = "#BA83F0"
      break
    case 'blue':
      buttonColor = "#02F2F2"
      break
    case 'pink':
      buttonColor = "#F5C1F0"
      break
    default:
      buttonColor = color.primary.main
  }

  switch (backgroundGradient) {
    case 'first':
      backgroundUrl = gradientBgFirst
      break
    case 'second':
      backgroundUrl = gradientBgSecond
      break
    case 'third':
      backgroundUrl = gradientBgThird
      break
    case 'all':
      backgroundUrl = gradientBgAll
      break
    default:
      backgroundUrl = gradientBgAll
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      backgroundUrl={backgroundUrl}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string,
  backgroundUrl: string,
  color: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  font-weight: bold;
  line-height: 0.9;
  text-shadow: rgba(255, 255, 255, 0.6) 0.2px 0.2px 0.2px, rgba(0, 0, 0, 0.6) -0.2px -0.2px 0.2px;
  text-transform: uppercase;
  background-color: transparent;
  border: 0;
  color: ${props => !props.disabled ? props.color : `${props.color}55`};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: 700;
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;
  background-image: url(${props => props.backgroundUrl});
  background-size: 100% 100%;
  box-shadow: none;
  &:hover {
    opacity: 0.9;
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button
