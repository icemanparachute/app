import { type TokenData } from '@hai-on-op/sdk'
import { type ISafe, type CollateralLiquidationData } from './interfaces'

export enum VaultAction {
    DEPOSIT_BORROW,
    WITHDRAW_REPAY,
    CREATE,
    INFO
}

export type AvailableVaultPair = {
    collateralName: string,
    collateralizationFactor: string,
    apy: string,
    eligibleBalance?: string,
    myVaults?: ISafe[]
}

export type FormState = {
    deposit?: string,
    borrow?: string,
    withdraw?: string,
    repay?: string
}

export type Collateral = {
    name: string,
    data?: TokenData,
    total: string,
    available: string,
    balance: string,
    priceInUSD?: string,
    liquidationData?: CollateralLiquidationData
}

export type Debt = {
    total: string,
    data?: TokenData,
    available: string,
    balance: string,
    priceInUSD: string
}

export enum VaultInfoError {
    NO_WALLET,
    NO_PROXY,
    INSUFFICIENT_COLLATERAL,
    INSUFFICIENT_HAI,
    WITHDRAW_EXCEEDS_COLLATERAL,
    REPAY_EXCEEDS_OWED,
    ZERO_AMOUNT,
    DEBT_TOTAL,
    COLLATERAL_RATIO,
    GLOBAL_DEBT_CEILING,
    HAI_DEBT_CEILING,
    INDIVIDUAL_DEBT_CEILING,
    MINIMUM_MINT
}
export const vaultInfoErrors: Record<number, string> = {
    [VaultInfoError.NO_WALLET]: `Connect a valid wallet to continue`,
    [VaultInfoError.NO_PROXY]: `Create a proxy contract to continue`,
    [VaultInfoError.INSUFFICIENT_COLLATERAL]: `Insufficient collateral balance`,
    [VaultInfoError.INSUFFICIENT_HAI]: `Insufficient $HAI balance`,
    [VaultInfoError.WITHDRAW_EXCEEDS_COLLATERAL]: `Withdraw amount cannot exceed collateral balance`,
    [VaultInfoError.REPAY_EXCEEDS_OWED]: `Repay amount cannot exceed $HAI debt balance`,
    [VaultInfoError.ZERO_AMOUNT]: `Please enter a non-zero amount of collateral and/or $HAI`,
    [VaultInfoError.GLOBAL_DEBT_CEILING]: `Cannot exceed global debt ceiling`,
    [VaultInfoError.HAI_DEBT_CEILING]: `Cannot exceed HAI debt ceiling`,
    [VaultInfoError.MINIMUM_MINT]: `You must mint at least 1 $HAI to create a Vault`,
}

/* eslint-disable-next-line */
export type SummaryItemValue<T = {}> = T & {
    raw: string,
    formatted: string
}
/* eslint-disable-next-line */
export type SummaryItem<T = {}> = {
    current?: SummaryItemValue<T>,
    after: SummaryItemValue<T>
}
export type SummaryCurrency = {
    usdRaw: string,
    usdFormatted: string
}
