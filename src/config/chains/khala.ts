import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/khala/api";

const config: ProcessorConfig = {
    chainName: 'khala',
    prefix: 'khala',
    dataSource: {
        chain: 'wss://khala-api.phala.network/ws',
    },
    api
}

export default config
