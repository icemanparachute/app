import styled from 'styled-components'
import { CenteredFlex, Flex, Grid, HaiButton, Text } from '~/styles'
import { ZoomScene } from './ZoomScene'
import { BrandedTitle } from '~/components/BrandedTitle'
import { TOKEN_LOGOS } from '~/utils'
import { ProgressBar } from '~/components/ProgressBar'

export function Second({ ...props }) {
    return (
        <ZoomScene {...props}>
            <Container>
                <Flex
                    $column
                    $gap={24}>
                    <BrandedTitle
                        textContent="BORROW & EARN ON THE WORLD'S MOST DECENTRALIZED STABLECOIN PROTOCOL"
                        $fontSize="3rem"
                        $lineHeight="1.5"
                    />
                    <Text>
                        Amplify your portfolio with <strong>$HAI</strong>, take control with <strong>$KITE</strong>
                    </Text>
                </Flex>
                <PairContainer>
                    <Flex
                        $align="center"
                        $gap={12}>
                        <IconContainer>
                            <img
                                src={TOKEN_LOGOS.WETH}
                                alt="HAI"
                                width={48}
                                height={48}
                            />
                            <img
                                src={TOKEN_LOGOS.HAI}
                                alt="HAI"
                                width={48}
                                height={48}
                            />
                        </IconContainer>
                        <Text>
                            <strong>WETH/HAI</strong>&nbsp;#456
                        </Text>
                    </Flex>
                    <Grid
                        $width="100%"
                        $columns="min-content 1fr"
                        $align="center"
                        $gap={12}>
                        <Text>Ratio&nbsp;<strong>72%</strong></Text>
                        <ProgressBar progress={0.72}/>
                    </Grid>
                    <Flex
                        $width="100%"
                        $justify="space-between"
                        $align="center">
                        <HaiButton
                            $variant="yellowish"
                            $grow={0}>
                            DEPOSIT
                        </HaiButton>
                        <HaiButton $grow={0}>
                            GET HAI
                        </HaiButton>
                    </Flex>
                </PairContainer>
            </Container>
        </ZoomScene>
    )
}

const Container = styled(Grid).attrs(props => ({
    $columns: '1fr min-content',
    $justify: 'center',
    $align: 'center',
    ...props
}))`
    width: 1100px;
    padding: 72px 48px;
    border: ${({ theme }) => theme.border.medium};
    border-radius: 24px;
    background-color: #f1f1fb77;
`
const PairContainer = styled(Flex).attrs(props => ({
    $column: true,
    $justify: 'space-between',
    $align: 'flex-start',
    $gap: 24,
    ...props
}))`
    width: 320px;
    padding: 24px;
    border: ${({ theme }) => theme.border.medium};
    border-radius: 24px;
    background-color: #f1f1fb;
    transform: translateX(100px);
`
const IconContainer = styled(CenteredFlex)`
    width: 64px;

    & > img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: ${({ theme }) => theme.border.thin};

        &:nth-child(2) {
            margin-left: -10px;
        }
    }
`