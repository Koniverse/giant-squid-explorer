import {SubstrateBatchProcessor} from '@subsquid/substrate-processor'
import {Event, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {TransferEvent} from "../actions/nativeTransfer";
import {StakingRewardEvent} from "../actions/stakingReward";

export interface ProcessorConfig {
    chainName: string
    prefix: number
    dataSource: Parameters<SubstrateBatchProcessor<any>['setDataSource']>[0]
    blockRange?: Parameters<SubstrateBatchProcessor<any>['setBlockRange']>[0]
    eventDecoder: {
        nativeTransfer?: (ctx: ProcessorContext<StoreWithCache>, event: Event) => Promise<TransferEvent | null>
        stakingReward?: (ctx: ProcessorContext<StoreWithCache>, event: Event) => Promise<StakingRewardEvent | null>
    }
}
