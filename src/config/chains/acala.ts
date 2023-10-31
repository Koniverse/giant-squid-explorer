import {ProcessorConfig} from '../processorConfig'
import api from './metadata/acala/api'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        chain: 'wss://acala-rpc-2.aca-api.network/ws',
    },
    api
}

export default config
