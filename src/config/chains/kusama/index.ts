import {ProcessorConfig} from '../../processorConfig'
import {decodeNativeTransfer} from "./balances/events";
import {decodeStakingReward} from "./staking/reward";

export const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 2,
    dataSource: {
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    eventDecoder: {
        nativeTransfer: decodeNativeTransfer,
        stakingReward: decodeStakingReward
    }
}

