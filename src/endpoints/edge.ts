// import { get } from '@vercel/edge-config'
import { ethers } from 'ethers'
import ERC20_ABI from '~/abis/erc20.json'

export const edge = true

export default async function handler() {
    const provider = new ethers.providers.AlchemyProvider('optimism', process.env.VITE_ALCHEMY_KEY)
    const address = '0xf467C7d5a4A9C4687fFc7986aC6aD5A4c81E1404'
    const erc20 = new ethers.Contract(address, ERC20_ABI, provider)
    const totalSupply = ethers.utils.formatUnits(await erc20.totalSupply())
    return new Response(totalSupply, {
        status: 200,
    })
}
