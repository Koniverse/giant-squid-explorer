import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/karura/api";

const config: ProcessorConfig = {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
        chain: 'wss://karura-rpc-2.aca-api.network/ws',
    },
    api
}

export default config
