import { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { CenteredFlex } from '~/styles'
import HaiFace from './Icons/HaiFace'
import Kite from './Icons/Kite'

type HaiCoinProps = {
    variant?: 'hai' | 'kite',
    width?: string,
    style?: object,
    animated?: boolean
}

export function HaiCoin({ variant = 'hai', width, animated, ...props }: HaiCoinProps) {
    const [animDuration] = useState(1.5 + 0.75 * Math.random())

    return (
        <HaiCoinImage
            {...props}
            $width={width}>
			<Inner
                $variant={variant}
                $animated={animated}
                $animDur={animDuration}>
                <Face>
                    {variant === 'hai'
                        ? <HaiFace filled/>
                        : <Kite/>
                    }
                </Face>
                <BackFace/>
            </Inner>
        </HaiCoinImage>
    )
}

const rotate = keyframes`
    0% { transform: rotateY(-45deg); }
    100% { transform: rotateY(45deg); }
`

export const HaiCoinImage = styled(CenteredFlex)<{ $width?: string }>`
    position: absolute;
    width: ${({ $width = 'auto' }) => $width};
    height: ${({ $width = 'auto' }) => $width};
`
const Face = styled(CenteredFlex)`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.greenish};
    transform: translateZ(12px);
    z-index: 2;

    & svg {
        width: 70%;
        height: 70%;
    }
`
const BackFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #B2E3AD;
    transform: translateZ(-12px);
    z-index: 1;
`
const Inner = styled(CenteredFlex)<{
    $variant?: 'hai' | 'kite',
    $animated?: boolean,
    $animDur: number
}>`
    width: 100%;
    height: 100%;
    perspective: 1000px;
    transform-style: preserve-3d;
    ${({ $animated, $animDur }) => $animated && css`animation: ${rotate} ${$animDur}s ease-in-out infinite alternate;`}

    ${({ theme, $variant = 'hai' }) => ($variant === 'hai'
        ? css`
            & ${Face} {
                background-color: ${theme.colors.greenish};
            }
            & ${BackFace} {
                background-color: #B2E3AD;
            }
        `
        : css`
            & ${Face} {
                background-color: #EECABC;
            }
            & ${BackFace} {
                background-color: #D6B5A8;
            }
        `
    )}
`