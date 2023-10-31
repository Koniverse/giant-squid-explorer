import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/moonbeam/api";

const config: ProcessorConfig = {
    chainName: 'moonbeam',
    dataSource: {
        chain: 'wss://wss.api.moonbeam.network',
    },
    api
}

export default config
