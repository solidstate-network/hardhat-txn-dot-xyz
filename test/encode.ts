import { encode } from '../src/lib/transaction.js';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import queryString from 'query-string';

describe('encode', () => {
  it('returns txn.xyz transaction URL with encoded query string', async () => {
    const chainId = '0x1';
    const to = '0x' + '0'.repeat(40);
    const fnSignature = 'test()';

    const url = await encode(hre, {
      chainId,
      to,
      fnSignature,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v0/decode/');

    assert.deepEqual(parsed.query, {
      chainID: '1',
      contractAddress: to,
      fn: 'test',
      abi: '[{"type":"function","name":"test","constant":false,"payable":false,"inputs":[],"outputs":[]}]',
    });
  });

  it('encodes current chain id if not specified', async () => {
    const to = '0x' + '0'.repeat(40);
    const fnSignature = 'test()';

    const url = await encode(hre, {
      to,
      fnSignature,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v0/decode/');

    assert.deepEqual(parsed.query, {
      chainID: '31337',
      contractAddress: to,
      fn: 'test',
      abi: '[{"type":"function","name":"test","constant":false,"payable":false,"inputs":[],"outputs":[]}]',
    });
  });
});
