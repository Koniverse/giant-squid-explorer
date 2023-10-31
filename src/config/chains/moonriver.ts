import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/moonriver/api";

const config: ProcessorConfig = {
    chainName: 'moonriver',
    dataSource: {
        chain: 'wss://wss.api.moonriver.moonbeam.network',
    },
    api
}

export default config
