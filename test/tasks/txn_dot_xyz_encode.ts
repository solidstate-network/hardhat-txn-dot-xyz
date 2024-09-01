import { TASK_TXN_DOT_XYZ_ENCODE } from '../../src/task_names';
import { expect } from 'chai';
import hre from 'hardhat';

describe(TASK_TXN_DOT_XYZ_ENCODE, () => {
  it('returns txn.xyz transaction URL with encoded query string', async () => {
    const chainId = 1;
    const contractAddress = '0x' + '0'.repeat(40);

    const url = await hre.run(TASK_TXN_DOT_XYZ_ENCODE, {
      chainId,
      contractAddress,
    });

    expect(url).to.equal(
      'https://txn.xyz/v0/decode/?chainID=1&contractAddress=0x0000000000000000000000000000000000000000',
    );
  });

  it('encodes current chain id if not specified', async () => {
    const contractAddress = '0x' + '0'.repeat(40);

    const url = await hre.run(TASK_TXN_DOT_XYZ_ENCODE, {
      contractAddress,
    });

    expect(url).to.equal(
      'https://txn.xyz/v0/decode/?chainID=31337&contractAddress=0x0000000000000000000000000000000000000000',
    );
  });
});
