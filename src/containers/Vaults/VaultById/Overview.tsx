import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { type QueriedVault, formatNumberWithStyle, getRatePercentage } from '~/utils'
import { useStoreState } from '~/store'

import styled from 'styled-components'
import { type DashedContainerProps, DashedContainerStyle, Flex, Grid, Text, CenteredFlex } from '~/styles'
import { OverviewProgressStat, OverviewStat } from '../Manage/OverviewStat'
import { AlertTriangle, ArrowLeft, ArrowRight } from 'react-feather'

type OverviewProps = {
    vault?: QueriedVault
}
export function Overview({ vault }: OverviewProps) {
    const { t } = useTranslation()

    const { vaultModel: vaultState } = useStoreState((state) => state)

    const haiPrice = parseFloat(vaultState.liquidationData?.currentRedemptionPrice || '1')
    const collateralPrice = parseFloat(vault?.collateralType.currentPrice.value || '0')

    const progressProps = useMemo(() => {
        if (!vault)
            return {
                progress: {
                    progress: 0,
                    label: '0%',
                },
                colorLimits: [0, 0.5, 1] as [number, number, number],
            }

        const { safetyCRatio } = vault.liquidationData
        const safetyRatio = safetyCRatio ? 100 * parseFloat(safetyCRatio.toString()) : undefined
        if (!vault.collateralRatio || !safetyRatio)
            return {
                progress: {
                    progress: 0,
                    label: '0%',
                },
                colorLimits: [0, 0.5, 1] as [number, number, number],
            }

        const MAX_FACTOR = 2.5

        const min = safetyRatio
        const max = min * MAX_FACTOR
        const labels = [
            {
                progress: 1 / MAX_FACTOR,
                label: (
                    <CenteredFlex $column $fontWeight={700}>
                        <CenteredFlex $gap={4}>
                            <AlertTriangle size={10} strokeWidth={2.5} />
                            <Text>{`${Math.floor(min)}%`}</Text>
                        </CenteredFlex>
                        <CenteredFlex $gap={2}>
                            <ArrowLeft size={8} />
                            <Text>LIQUIDATION</Text>
                        </CenteredFlex>
                    </CenteredFlex>
                ),
            },
            {
                progress: 1.5 / MAX_FACTOR,
                label: (
                    <CenteredFlex $column>
                        <Text>{`${Math.floor(1.5 * min)}%`}</Text>
                        <CenteredFlex $gap={2}>
                            <Text>OKAY</Text>
                            <ArrowRight size={8} />
                        </CenteredFlex>
                    </CenteredFlex>
                ),
            },
            {
                progress: 2.2 / MAX_FACTOR,
                label: (
                    <CenteredFlex $column>
                        <Text>{`${Math.floor(2.2 * min)}%`}</Text>
                        <CenteredFlex $gap={2}>
                            <Text>SAFE</Text>
                            <ArrowRight size={8} />
                        </CenteredFlex>
                    </CenteredFlex>
                ),
            },
        ]

        return {
            progress: {
                progress: Math.min(parseFloat(vault.collateralRatio), max) / max,
                label: formatNumberWithStyle(vault.collateralRatio, {
                    maxDecimals: 1,
                    scalingFactor: 0.01,
                    style: 'percent',
                }),
            },
            labels,
            colorLimits: labels.map(({ progress }) => progress) as [number, number, number],
        }
    }, [vault])

    return (
        <Container>
            <Header>
                <Text $fontWeight={700}>Details</Text>
            </Header>
            <Inner $borderOpacity={0.2}>
                <OverviewStat
                    value={vault ? formatNumberWithStyle(vault.collateral) : '--'}
                    token={(vault?.collateralToken || '???') as any}
                    label="Collateral Asset"
                    convertedValue={
                        vault && collateralPrice
                            ? formatNumberWithStyle(parseFloat(vault.collateral) * collateralPrice, {
                                  style: 'currency',
                              })
                            : '$--'
                    }
                />
                <OverviewStat
                    value={vault ? formatNumberWithStyle(vault.debt) : '--'}
                    token="HAI"
                    label="Debt Asset"
                    convertedValue={
                        vault ? formatNumberWithStyle(parseFloat(vault.debt) * haiPrice, { style: 'currency' }) : '$--'
                    }
                />
                <OverviewProgressStat
                    value={
                        vault
                            ? formatNumberWithStyle(vault.collateralRatio, {
                                  scalingFactor: 0.01,
                                  style: 'percent',
                              })
                            : '--%'
                    }
                    label="Ratio:"
                    alert={vault?.status ? { status: vault.status } : undefined}
                    {...progressProps}
                    fullWidth
                />
                <OverviewStat
                    value={
                        vault
                            ? formatNumberWithStyle(
                                  getRatePercentage(
                                      vault.liquidationData.totalAnnualizedStabilityFee || '0',
                                      4,
                                      true
                                  ).toString(),
                                  { style: 'percent' }
                              )
                            : '--%'
                    }
                    label="Stability Fee"
                    tooltip={t('stability_fee_tip')}
                />
                <OverviewStat
                    value={vault ? formatNumberWithStyle(vault.liquidationPrice, { style: 'currency' }) : '$--'}
                    label="Liq. Price"
                    tooltip={t('liquidation_price_tip')}
                />
            </Inner>
        </Container>
    )
}

const Container = styled(Flex).attrs((props) => ({
    $width: '100%',
    $column: true,
    $justify: 'flex-start',
    $align: 'flex-start',
    ...props,
}))`
    padding: 48px;

    ${({ theme }) => theme.mediaWidth.upToSmall`
        padding: 24px;
    `}
`
const Header = styled(Flex).attrs((props) => ({
    $width: '100%',
    $justify: 'flex-start',
    $align: 'center',
    $gap: 12,
    ...props,
}))`
    height: 60px;
    padding: 24px 0px;
`

const Inner = styled(Grid).attrs((props) => ({
    $width: '100%',
    $columns: '1fr 1fr',
    $align: 'center',
    ...props,
}))<DashedContainerProps>`
    ${DashedContainerStyle}
    & > * {
        padding: 24px;
        min-height: 100px;
    }
    &::after {
        border-top: none;
        border-right: none;
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
        grid-template-columns: 1fr;
    `}
`
