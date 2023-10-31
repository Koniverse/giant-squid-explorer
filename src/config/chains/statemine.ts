import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/kilt/api";

const config: ProcessorConfig = {
    chainName: 'statemine',
    prefix: 'statemine',
    dataSource: {
        chain: 'wss://statemine-rpc.polkadot.io',
    },
    api
}

export default config
