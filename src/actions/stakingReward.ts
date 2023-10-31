import {Event, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {CHAIN_CONFIG} from "../config";
import {ensureAccount} from "./account";
import {NativeTransfer, StakingReward} from "../model";
import {encodeAddress} from "../utils";

export interface StakingRewardEvent {
  id: string
  blockNumber: number
  timestamp: Date
  extrinsicHash?: string
  success: boolean
  stash: string
  amount: bigint
  fee?: bigint,
  validatorStash?: string,
  era?: number
}

export async function saveStakingReward(ctx: ProcessorContext<StoreWithCache>, event: Event) {
  if (!CHAIN_CONFIG.eventDecoder?.stakingReward) return
  const data = await CHAIN_CONFIG.eventDecoder.stakingReward(ctx, event)
  if (!data) return

  const accountId = await ensureAccount(ctx, data.stash);

  let stakingReward = new StakingReward({
    id: data.id,
    blockNumber: event.block.height,
    timestamp: event.block.timestamp ? new Date(event.block.timestamp) : undefined,
    extrinsicHash: event.extrinsic?.hash,
    account: accountId,
    validatorId: data.validatorStash && encodeAddress(data.validatorStash),
    era: data.era,
    amount: data.amount
  })

  await ctx.store.insert(stakingReward)
}