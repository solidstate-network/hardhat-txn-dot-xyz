import hardhatTxnDotXyz from './src/index.js';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [hardhatTxnDotXyz],
};

export default config;
