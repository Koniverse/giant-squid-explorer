import {Event, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {CHAIN_CONFIG} from "../config";
import {ensureAccount} from "./account";
import {NativeTransfer} from "../model";

export interface TransferEvent {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    success: boolean
    from: string
    to: string
    amount: bigint
    fee?: bigint
}

export async function saveNativeTransfer(ctx: ProcessorContext<StoreWithCache>, event: Event) {
  if (!CHAIN_CONFIG.eventDecoder?.nativeTransfer) return
  const data = await CHAIN_CONFIG.eventDecoder.nativeTransfer(ctx, event)
  if (!data) return

  const from = await ensureAccount(ctx, data.from);
  const to = await ensureAccount(ctx, data.to);

  let transfer = new NativeTransfer({
    id: data.id,
    blockNumber: event.block.height,
    timestamp: event.block.timestamp ? new Date(event.block.timestamp) : undefined,
    extrinsicHash: event.extrinsic?.hash,
    from,
    to,
    amount: data.amount,
    success: data.success,
  })

  await ctx.store.insert(transfer)
}