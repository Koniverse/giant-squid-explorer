import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/statemint/api";

const config: ProcessorConfig = {
    chainName: 'statemint',
    prefix: 'statemint',
    dataSource: {
        chain: 'wss://statemint-rpc.polkadot.io',
    },
    api
}

export default config
