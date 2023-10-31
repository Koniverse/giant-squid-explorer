import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/bifrost/api";

const config: ProcessorConfig = {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
        chain: 'wss://eu.bifrost-rpc.liebi.com/ws',
    },
    api
}

export default config
