import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/gmordie/api";

const config: ProcessorConfig = {
    chainName: 'gmordie',
    prefix: 'gm',
    dataSource: {
        chain: 'wss://kusama.gmordie.com',
    },
    api
}

export default config
