import {Event, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {CHAIN_CONFIG} from "../config";
import {ensureAccount} from "./account";
import {NativeTransfer} from "../model";

export async function saveNativeTransfer(ctx: ProcessorContext<StoreWithCache>, event: Event) {
  const data = CHAIN_CONFIG.api.events.balances.Transfer.decode(ctx, event)

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