import pkg from '../package.json';
import taskTxnDotXyzSend from './tasks/txn_dot_xyz_send.js';
import type { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name,
  npmPackage: pkg.name,
  tasks: [taskTxnDotXyzSend],
};

export default plugin;
