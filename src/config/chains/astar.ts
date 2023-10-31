import {ProcessorConfig} from '../processorConfig'
import api from './metadata/astar/api'

const config: ProcessorConfig = {
    chainName: 'astar',
    prefix: 'astar',
    dataSource: {
        chain: 'wss://rpc.astar.network',
    },
    api
}

export default config
