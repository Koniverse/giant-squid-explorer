import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/hydradx/api";

const config: ProcessorConfig = {
    chainName: 'hydradx',
    prefix: 'hydradx',
    dataSource: {
        chain: 'wss://rpc.hydradx.cloud',
    },
    api
}

export default config
