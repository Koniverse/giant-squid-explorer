import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/polkadot/api";

const config: ProcessorConfig = {
    chainName: 'polkadot',
    prefix: 'polkadot',
    dataSource: {
        chain: 'wss://rpc.polkadot.io',
    },
    api
}

export default config
