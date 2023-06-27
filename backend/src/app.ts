import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { ERC20__factory, SafeAggregatorOracle__factory } from './__generated__/ethers'

const rpcProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://endpoints.omniatech.io/v1/arbitrum/one/public',
  42161,
)

export const getOraclePrice = async (tokenAddress: string) => {
  const oracleAddress = '0xcae5f47707cba25aa67e8c67fd539e0a1b9cd640'

  const oracleContract = SafeAggregatorOracle__factory.connect(oracleAddress, rpcProvider)
  const tokenContract = ERC20__factory.connect(tokenAddress, rpcProvider)

  const oracleResult = await oracleContract.getSafeUSDPriceE36(tokenAddress)
  const decimalsResult = await tokenContract.decimals()

  return { priceUSD: new BigNumber(oracleResult[0].toString()).times(`1e${decimalsResult}`).div(1e36).toNumber() }
}
