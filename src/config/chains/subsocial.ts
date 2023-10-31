import {ProcessorConfig} from '../processorConfig'
import api from "./metadata/subsocial/api";

const config: ProcessorConfig = {
    chainName: 'subsocial',
    prefix: 'subsocial',
    dataSource: {
        chain: 'wss://para.f3joule.space',
    },
    api
}

export default config
