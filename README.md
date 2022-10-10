# Hardhat txn.xyz Client

Format and trigger secure on-chain transactions via [txn.xyz](https://www.txn.xyz/).

## Installation

```bash
npm install --save-dev @solidstate/hardhat-txn-dot-xyz
# or
yarn add --dev @solidstate/hardhat-txn-dot-xyz
```

## Usage

Load plugin in Hardhat config:

```javascript
require('@solidstate/hardhat-txn-dot-xyz');
```

This example will trigger a Mainnet transaction which revokes the sender's approval to spend DAI from [vitalik.eth](https://etherscan.io/address/0xd8da6bf26964af9d7eed9e03e53415d37aa96045).

```bash
npx hardhat txn-dot-xyz-send --chain-id 1 --contract-address 0x6b175474e89094c44da98b954eedeac495271d0f --fn approve --fn-params '["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 0]'
# or
yarn run hardhat txn-dot-xyz-send --chain-id 1 --contract-address 0x6b175474e89094c44da98b954eedeac495271d0f --fn approve --fn-params '["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 0]'
```

It may also be run from within the Hardhat environment:

```javascript
await hre.run('txn-dot-xyz-send', {
  chainId: 1,
  contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
  fn: 'approve',
  fnParams: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 0],
});
```
