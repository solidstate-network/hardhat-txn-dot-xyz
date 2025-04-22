import pkg from '../package.json';
import taskTxnDotXyzEncode from './tasks/txn_dot_xyz_encode.js';
import taskTxnDotXyzSend from './tasks/txn_dot_xyz_send.js';
import type { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name,
  tasks: [taskTxnDotXyzEncode, taskTxnDotXyzSend],
};

export default plugin;
