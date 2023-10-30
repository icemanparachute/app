import styled from 'styled-components'
import { CenteredFlex, Flex, Text } from '~/styles'
import { type SplashImage, ZoomScene, type ZoomSceneProps } from './ZoomScene'
import { BrandedTitle } from '~/components/BrandedTitle'
import RightArrow from '~/components/Icons/RightArrow'
import { FloatingElements } from './FloatingElements'

const elves: SplashImage[] = [
    {
        index: 3,
        width: '230px',
        style: {
            right: '6vw',
            top: '-80px'
        },
        rotation: 20,
        zIndex: 1
    },
    {
        index: 4,
        width: '200px',
        style: {
            left: '-10px',
            bottom: '-60px'
        },
        rotation: -20,
        zIndex: 1
    }
]

const clouds: SplashImage[] = [
    {
        index: 0,
        width: '280px',
        style: {
            left: '-160px',
            top: '-190px'
        },
        zIndex: -2
    },
    {
        index: 1,
        width: '220px',
        style: {
            right: '14vw',
            bottom: '-60px'
        },
        zIndex: 1
    }
]

export function Third({ zIndex }: ZoomSceneProps) {
    return (
        <ZoomScene
            $zIndex={zIndex}
            style={{ marginTop: '100px' }}>
            <Container>
                <LearnCard title="BORROW HAI TO MULTIPLY YOUR CRYPTO EXPOSURE"/>
                <LearnCard title="COLLECT MONTHLY REWARDS FOR PROVIDING LIQUIDITY"/>
                <LearnCard title="ACQUIRE LIQUIDATED ASSETS"/>
                {/* <LearnCard title="BORROW HAI TO MULTIPLY YOUR CRYPTO EXPOSURE"/> */}
            </Container>
            <FloatingElements
                elves={elves}
                clouds={clouds}
            />
        </ZoomScene>
    )
}

const Container = styled(Flex).attrs(props => ({
    $justify: 'flex-start',
    $align: 'center',
    $gap: 24,
    ...props
}))`
    max-width: 100vw;
    padding: 12px 48px;
    overflow: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 12px 24px;
    `}
`

const LearnCardContainer = styled(Flex).attrs(props => ({
    $column: true,
    $justify: 'space-between',
    $align: 'flex-start',
    $shrink: 0,
    ...props
}))`
    width: min(calc(100vw - 48px), 400px);
    height: 500px;
    border: ${({ theme }) => theme.border.medium};
    border-radius: 24px;
    /* background-color: #f1f1fb77; */
    backdrop-filter: blur(13px);
    padding: 48px;
    scroll-snap-align: center;

    & svg {
        width: auto;
        height: 1rem;
    }
`

function LearnCard({ title }: { title: string }) {
    return (
        <LearnCardContainer>
            <CenteredFlex $gap={12}>
                <Text
                    $fontSize="1.2rem"
                    $fontWeight={700}
                    $letterSpacing="0.35rem">
                    LEARN
                </Text>
                <RightArrow/>
            </CenteredFlex>
            <BrandedTitle
                textContent={title}
                $fontSize="2.5rem"
                $lineHeight="3.6rem"
            />
        </LearnCardContainer>
    )
}