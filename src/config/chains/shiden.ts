import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/shiden/api";

const config: ProcessorConfig = {
    chainName: 'shiden',
    prefix: 'shiden',
    dataSource: {
        chain: 'wss://rpc.shiden.astar.network',
    },
    api
}

export default config
