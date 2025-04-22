import { TASK_TXN_DOT_XYZ_ENCODE } from '../../src/task_names.js';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe(TASK_TXN_DOT_XYZ_ENCODE, () => {
  it('returns txn.xyz transaction URL with encoded query string', async () => {
    const chainId = 1;
    const contractAddress = '0x' + '0'.repeat(40);
    const fn = 'test';

    const url = await hre.tasks.getTask(TASK_TXN_DOT_XYZ_ENCODE).run({
      chainId,
      contractAddress,
      fn,
    });

    assert.equal(
      url,
      'https://txn.xyz/v0/decode/?chainID=1&contractAddress=0x0000000000000000000000000000000000000000&fn=test',
    );
  });

  it('encodes current chain id if not specified', async () => {
    const contractAddress = '0x' + '0'.repeat(40);
    const fn = 'test';

    const url = await hre.tasks.getTask(TASK_TXN_DOT_XYZ_ENCODE).run({
      contractAddress,
      fn,
    });

    assert.equal(
      url,
      'https://txn.xyz/v0/decode/?chainID=31337&contractAddress=0x0000000000000000000000000000000000000000&fn=test',
    );
  });

  it('encodes ABI if specified', async () => {
    const contractAddress = '0x' + '0'.repeat(40);
    const fn = 'test';
    const abi: any[] = [];

    const url = await hre.tasks.getTask(TASK_TXN_DOT_XYZ_ENCODE).run({
      contractAddress,
      fn,
      abi,
    });

    assert.equal(
      url,
      'https://txn.xyz/v0/decode/?abi=%5B%5D&chainID=31337&contractAddress=0x0000000000000000000000000000000000000000&fn=test',
    );
  });
});
