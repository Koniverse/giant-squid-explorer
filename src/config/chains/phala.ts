import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/phala/api";

const config: ProcessorConfig = {
    chainName: 'phala',
    prefix: 'phala',
    dataSource: {
        chain: 'wss://api.phala.network/ws',
    },
    api
}

export default config
