import {Event, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";
import {saveNativeTransfer} from "./nativeTransfer";
import {saveStakingReward} from "./stakingReward";

export async function saveEvent(ctx: ProcessorContext<StoreWithCache>, event: Event) {
    ctx._chain
    const block = await ctx.store.getOrFail(model.Block, event.block.id)
    const extrinsic = event.extrinsic ? await ctx.store.getOrFail(model.Extrinsic, event.extrinsic.id) : undefined
    const call = event.call ? await ctx.store.getOrFail(model.Call, event.call.id) : undefined

    const [pallet, name] = event.name.split('.')

    const entity = new model.Event({
        id: event.id,
        block,
        args: event.args,
        call,
        extrinsic,
        index: event.index,
        name,
        pallet,
        phase: event.phase,
    })
    await ctx.store.insert(entity)

    // Fetch data from event
    await saveNativeTransfer(ctx, event);
    // await saveStakingReward(ctx, event)

    block.eventsCount += 1
    await ctx.store.upsert(block)
}
