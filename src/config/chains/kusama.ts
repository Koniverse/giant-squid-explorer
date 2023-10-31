import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/kusama/api";

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    api
}

export default config
