import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/calamari/api";

const config: ProcessorConfig = {
    chainName: 'calamari',
    prefix: 'calamari',
    dataSource: {
        chain: 'wss://ws.calamari.systems/',
    },
    api
}

export default config
