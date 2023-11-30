import { useMemo } from 'react'

import {
    type Collateral,
    type Debt,
    Status,
    VaultAction,
    getCollateralRatio,
    getLiquidationPrice,
    ratioChecker,
    riskStateToStatus
} from '~/utils'
import { useStoreState } from '~/store'

export type Simulation = {
    collateral?: string,
    debt?: string,
    collateralRatio?: string,
    riskStatus?: Status,
    liquidationPrice?: string
}

type Props = {
    action: VaultAction,
    formState: any,
    collateral: Collateral,
    debt: Debt
}
export function useSimulation({ action, formState, collateral, debt }: Props): Simulation | undefined {
    const { liquidationData } = useStoreState(({ safeModel }) => safeModel)

    const simulation = useMemo(() => {
        if (!Object.values(formState).some((value = '0') => Number(value) > 0)) {
            return undefined
        }

        switch(action) {
            case VaultAction.DEPOSIT_BORROW:
            case VaultAction.CREATE: {
                const { deposit = '0', borrow = '0' } = formState
                if (Number(deposit) <= 0 && Number(borrow) <= 0) return undefined
                return {
                    collateral: Number(deposit) > 0 ? deposit: undefined,
                    debt: Number(borrow) > 0 ? borrow: undefined
                }
            }
            case VaultAction.WITHDRAW_REPAY: {
                const { withdraw = '0', repay = '0' } = formState
                if (Number(withdraw) <= 0 && Number(repay) <= 0) return undefined
                return {
                    collateral: Number(withdraw) > 0 ? withdraw: undefined,
                    debt: Number(repay) > 0 ? repay: undefined
                }
            }
            default: return undefined
        }
    }, [action, formState])

    // TODO: clarify accumulatedRate as it affects total debt calculations
    // const simulatedDebt = useMemo(() => {
    //     if (!vault || Number(safeData.rightInput || '0') <= 0) return undefined

    //     const currentDebt = parseFloat(vault.debt)
    //     const inputDebt = parseFloat(safeData.rightInput)
    //     if (vaultInfo.action === VaultAction.WITHDRAW_REPAY) {
    //         return Math.max(currentDebt - inputDebt, 0)
    //     }
    //     return currentDebt + inputDebt
    // }, [vault, vaultInfo, safeData])

    const [collateralRatio, riskStatus] = useMemo(() => {
        if (!simulation) return []
        if (!collateral.liquidationData) return []

        const {
            currentPrice,
            liquidationCRatio,
            safetyCRatio
        } = collateral.liquidationData
        const cr = getCollateralRatio(
            collateral.total,
            debt.total,
            currentPrice.liquidationPrice,
            liquidationCRatio
        ).toString()
        const state = ratioChecker(Number(cr), Number(safetyCRatio))
        const status = riskStateToStatus[state] || Status.UNKNOWN
        return [cr, status]
    }, [simulation, collateral, debt])

    const liquidationPrice = useMemo(() => {
        if (!simulation || !collateral.liquidationData || !liquidationData?.currentRedemptionPrice) {
            return undefined
        }

        return getLiquidationPrice(
            collateral.total,
            debt.total,
            collateral.liquidationData.liquidationCRatio,
            liquidationData?.currentRedemptionPrice
        ).toString()
    }, [simulation, collateral, debt, liquidationData])

    return simulation
        ? {
            ...simulation,
            collateralRatio,
            riskStatus,
            liquidationPrice
        }
        : undefined
}