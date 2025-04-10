import pkg from '../package.json';
import './tasks/txn_dot_xyz_encode';
import './tasks/txn_dot_xyz_send';
import type { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name,
};
