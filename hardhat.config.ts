import HardhatTxnDotXyz from './src/index.js';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [HardhatTxnDotXyz],
  defaultNetwork: 'hardhat',
};

export default config;
