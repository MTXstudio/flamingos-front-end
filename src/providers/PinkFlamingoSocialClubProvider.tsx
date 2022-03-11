import { createContext, ReactElement, ReactNode, useCallback, useContext, useState } from 'react'

import { Contract, ethers } from 'ethers'
import appConfig from '../utils/appConfig'
import { useWeb3 } from './Web3Provider'
import abi from '../abi/PinkFlamingoSocialClub.json'
import { useWallet } from 'use-wallet'
import { getDefaultProvider } from '../utils/Wallet/provider'
import { useTransaction } from './TransactionProvider'

/**
 * @dev API module for TSM contracts
 */

interface PinkFlamingoSocialClubProviderValue {
  purchase: () => Promise<void>
  redeemFlamingo: () => Promise<void>
  price: () => Promise<string>
  mintedAndMax: () => Promise<{
    invocations: number
    maxInvocations: number
  }>
  checkIfEligibleForAirdrop: () => Promise<boolean | undefined>
  increaseAmount: () => void
  decreaseAmount: () => void
  counter: number
}

const PinkFlamingoSocialClubContext = createContext({} as PinkFlamingoSocialClubProviderValue)

function PinkFlamingoSocialClubProvider({ children }: { children: ReactNode }): ReactElement {
  const { wallet } = useWeb3()
  const { account } = useWallet()
  const { pushTransaction, waitForReceipt } = useTransaction()
  const [counter, setCounter] = useState<number>(1)

  const increaseAmount = () => {
    if(counter >= 10) {
      console.log('amount too big')
    } else {
      setCounter(counter => counter + 1)
      console.log(counter)
    }
  }

  const decreaseAmount = () => {
    if(counter <= 1) {
      console.log('amount too small')
    } else {
      setCounter(counter => counter - 1)
      console.log(counter)
    }
  }

  const price = useCallback(async (collectionID: number) => {
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const collectionDetails = await contract.viewCollectionDetails(collectionID)
    const value = collectionDetails[1]
    return ethers.utils.formatEther(value)
  }, [])

  const purchase = useCallback(async () => {
    if (!wallet || !account) return
    const contract = new Contract(appConfig.contractAddress, abi.abi, wallet.signer)
    const value = ((await contract.tokenPriceInWei())*counter).toString()
    const options = {
      value,
    }
    console.log(counter)
    const tx = await contract.mintPassport(counter, options)
    pushTransaction(tx)
    await tx.wait(1)
    const receipt = await waitForReceipt(tx)
    console.log(receipt)
  }, [account, wallet, pushTransaction, waitForReceipt, setCounter, counter])

  const mintedAndMax = useCallback(async (collectionID: number) => {
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const invocations = (await contract.totalSupply()).toNumber() as number
    const maxInvocations = 500

    return { invocations, maxInvocations }
  }, [])

  const checkIfEligibleForAirdrop = useCallback(async () => {
    if (!wallet || !account) return
    const contract = new Contract(appConfig.contractAddress, abi.abi, getDefaultProvider())
    const isEligible = (await contract.isEligableToRedeem(account)) as boolean
    return isEligible
  }, [wallet, account])

  const redeemFlamingo = useCallback(async () => {
    if (!wallet || !account) return
    const contract = new Contract(appConfig.contractAddress, abi.abi, wallet.signer)
    const tx = await contract.redeemFlamingo(account)
    pushTransaction(tx)
    const receipt = await waitForReceipt(tx)
    console.log(receipt)
  }, [account, wallet, pushTransaction, waitForReceipt])

  return (
    <PinkFlamingoSocialClubContext.Provider
      value={
        {
          purchase,
          redeemFlamingo,
          price,
          mintedAndMax,
          checkIfEligibleForAirdrop,
          counter, 
          increaseAmount, 
          decreaseAmount
        } as PinkFlamingoSocialClubProviderValue
      }
    >
      {children}
    </PinkFlamingoSocialClubContext.Provider>
  )
}

const useFlamingo = (): PinkFlamingoSocialClubProviderValue =>
  useContext(PinkFlamingoSocialClubContext)

export { PinkFlamingoSocialClubProvider, useFlamingo, PinkFlamingoSocialClubContext }
export default PinkFlamingoSocialClubProvider
