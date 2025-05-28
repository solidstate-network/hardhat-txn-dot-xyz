import { TASK_TXN_DOT_XYZ_ENCODE } from '../../src/task_names.js';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import queryString from 'query-string';

describe(TASK_TXN_DOT_XYZ_ENCODE, () => {
  it('returns txn.xyz transaction URL with encoded query string', async () => {
    const chainId = '0x1';
    const contractAddress = '0x' + '0'.repeat(40);
    const fnSignature = 'test()';

    const url = await hre.tasks.getTask(TASK_TXN_DOT_XYZ_ENCODE).run({
      chainId,
      contractAddress,
      fnSignature,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v0/decode/');

    assert.deepEqual(parsed.query, {
      chainID: '1',
      contractAddress,
      fn: 'test',
      abi: '[{"type":"function","name":"test","constant":false,"payable":false,"inputs":[],"outputs":[]}]',
    });
  });

  it('encodes current chain id if not specified', async () => {
    const contractAddress = '0x' + '0'.repeat(40);
    const fnSignature = 'test()';

    const url = await hre.tasks.getTask(TASK_TXN_DOT_XYZ_ENCODE).run({
      contractAddress,
      fnSignature,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v0/decode/');

    assert.deepEqual(parsed.query, {
      chainID: '31337',
      contractAddress,
      fn: 'test',
      abi: '[{"type":"function","name":"test","constant":false,"payable":false,"inputs":[],"outputs":[]}]',
    });
  });
});
