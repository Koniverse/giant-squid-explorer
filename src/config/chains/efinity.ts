import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/efinity/api";

const config: ProcessorConfig = {
    chainName: 'efinity',
    prefix: 'efinity',
    dataSource: {
        chain: 'wss://rpc.efinity.io',
    },
    api
}

export default config
