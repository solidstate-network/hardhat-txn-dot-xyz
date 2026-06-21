import { encode } from '../src/lib/transaction.js';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import queryString from 'query-string';

describe('encode', () => {
  it('returns txn.xyz v1 transaction URL with encoded query string', async () => {
    const chainId = '0x1';
    const to = '0x' + '0'.repeat(40);
    const fnSignature = 'test()';

    const url = await encode(hre, {
      chainId,
      to,
      fnSignature,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v1/decode');

    assert.deepEqual(parsed.query, {
      chainId: '1',
      to,
      fnSignature,
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

    assert.equal(parsed.url, 'https://txn.xyz/v1/decode');

    assert.deepEqual(parsed.query, {
      chainId: '31337',
      to,
      fnSignature,
    });
  });

  it('encodes function arguments as a JSON array', async () => {
    const chainId = '0x1';
    const to = '0x' + '0'.repeat(40);
    const fnSignature = 'transfer(address,uint256)';
    const fnParams = [to, '100'];

    const url = await encode(hre, {
      chainId,
      to,
      fnSignature,
      fnParams,
    });

    const parsed = queryString.parseUrl(url);

    assert.equal(parsed.url, 'https://txn.xyz/v1/decode');

    assert.deepEqual(parsed.query, {
      chainId: '1',
      to,
      fnSignature,
      fnArgs: JSON.stringify(fnParams),
    });
  });
});
