export const nodeUri = process.env.NODE_URI || 'http://localhost:7545'
export const etherAddress = '0x0000000000000000000000000000000000000000' //ETH

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 80001,
    contractAddress: '0x7dBE30485c71263CB987B1F67aD18E7A9d83EE9c',
    defaultProvider: `https://rpc-mumbai.maticvigil.com/`,
    etherscanUrl: 'https://polygonscan.com/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: 137,
    contractAddress: '0x231E9a191598B7eBA9c374118c9abcF6d2ba41dF',
    defaultProvider: `https://polygon-rpc.com/`,
    etherscanUrl: 'https://explorer.matic.network/',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
}

// export default configurations['production']
export default configurations['development']

export type Configuration = {
  chainId: number
  etherscanUrl: string
  contractAddress: string
  defaultProvider: string
  config?: EthereumConfig
  pollingInterval?: number
  refreshInterval: number
  gasLimitMultiplier: number
}

export type EthereumConfig = {
  testing: boolean
  autoGasMultiplier: number
  defaultConfirmations: number
  defaultGas: string
  defaultGasPrice: string
  ethereumNodeTimeout: number
}

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
}