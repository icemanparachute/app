import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'

import { type ISafe } from '~/utils'
import { useStoreState } from '~/store'
import { useVault } from '~/providers/VaultProvider'

import { Text } from '~/styles'
import { NavContainer } from '~/components/NavContainer'
import { CheckboxButton } from '~/components/CheckboxButton'
import { BrandedDropdown, DropdownOption } from '~/components/BrandedDropdown'
import { ProxyPrompt } from '~/components/ProxyPrompt'
import { AvailableVaultsTable } from './AvailableVaultsTable'
import { MyVaultsTable } from './MyVaultsTable'

const assets = [
    'All',
    'WETH',
    'WSTETH',
    'OP'
]

const dummyVaults: any[] = [
    {
        id: '123',
        collateralName: 'WETH',
        collateralRatio: '110',
        liquidationCRatio: '110'
    },
    {
        id: '234',
        collateralName: 'WSTETH',
        collateralRatio: '110',
        liquidationCRatio: '110'
    },
    {
        id: '345',
        collateralName: 'OP',
        collateralRatio: '110',
        liquidationCRatio: '110'
    }
]

const myDummySafes: ISafe[] = [
    {
        id: '123',
        date: '',
        safeHandler: '',
        riskState: 1,
        collateral: '2000',
        debt: '1600000',
        totalDebt: '1600000',
        availableDebt: '1600000',
        accumulatedRate: '',
        collateralRatio: '250',
        currentRedemptionPrice: '$1.05',
        currentLiquidationPrice: '$0.98',
        internalCollateralBalance: '2000',
        liquidationCRatio: '120',
        liquidationPenalty: '',
        liquidationPrice: '1365.43',
        totalAnnualizedStabilityFee: '0.072',
        currentRedemptionRate: '',
        collateralType: '',
        collateralName: 'WETH'
    },
    {
        id: '456',
        date: '',
        safeHandler: '',
        riskState: 3,
        collateral: '1300',
        debt: '1600',
        totalDebt: '1600',
        availableDebt: '1600',
        accumulatedRate: '',
        collateralRatio: '140',
        currentRedemptionPrice: '$1.05',
        currentLiquidationPrice: '$0.98',
        internalCollateralBalance: '1300',
        liquidationCRatio: '120',
        liquidationPenalty: '',
        liquidationPrice: '2.42',
        totalAnnualizedStabilityFee: '0.072',
        currentRedemptionRate: '',
        collateralType: '',
        collateralName: 'OP'
    }
]

type VaultsListProps = {
    navIndex: number,
    setNavIndex: Dispatch<SetStateAction<number>>
}
export function VaultsList({ navIndex, setNavIndex }: VaultsListProps) {
    const { setActiveVault } = useVault()

    const [eligibleOnly, setEligibleOnly] = useState(false)
    const [assetsFilter, setAssetsFilter] = useState<string>()

    const { safeModel: safeState } = useStoreState(state => state)

    const myVaults = useMemo(() => {
        const temp = [...safeState.list, ...myDummySafes]
        if (!assetsFilter) return temp

        return temp.filter(({ collateralName }) => (
            collateralName.toUpperCase() === assetsFilter
        ))
    }, [safeState.list, assetsFilter])

    return (
        <NavContainer
            navItems={[`All Vaults`, `My Vaults`]}
            selected={navIndex}
            onSelect={(i: number) => setNavIndex(i)}
            headerContent={navIndex === 0
                ? (
                    <CheckboxButton
                        checked={eligibleOnly}
                        toggle={() => setEligibleOnly(e => !e)}>
                        Eligible Vaults Only
                    </CheckboxButton>
                )
                : (
                    <BrandedDropdown label={(
                        <Text
                            $fontWeight={400}
                            $textAlign="left"
                            style={{ width: '160px' }}>
                            Collateral Assets: <strong>{assetsFilter || 'All'}</strong>
                        </Text>
                    )}>
                        {assets.map(label => (
                            <DropdownOption
                                key={label}
                                onClick={(e: any) => {
                                    // e.stopPropagation()
                                    setAssetsFilter(label === 'All' ? undefined: label)
                                }}>
                                {label}
                            </DropdownOption>
                        ))}
                    </BrandedDropdown>
                )
            }>
            {navIndex === 0
                ? (
                    <AvailableVaultsTable
                        rows={dummyVaults}
                        onSelect={setActiveVault}
                        myVaults={myVaults}
                    />
                )
                : (
                    <ProxyPrompt>
                        <MyVaultsTable
                            rows={myVaults}
                            onSelect={setActiveVault}
                        />
                    </ProxyPrompt>
                )
            }
        </NavContainer>
    )
}