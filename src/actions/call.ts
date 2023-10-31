import {Call, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";

export async function saveCall(ctx: ProcessorContext<StoreWithCache>, call: Call) {
    const block = await ctx.store.getOrFail(model.Block, call.block.id)
    const extrinsic = await ctx.store.getOrFail(model.Extrinsic, call.getExtrinsic().id)
    const parent = call.parentCall ? await ctx.store.getOrFail(model.Call, call.parentCall.id) : undefined

    const [pallet, name] = call.name.split('.')

    const entity = new model.Call({
        id: call.id,
        block,
        address: call.address,
        args: call.args,
        error: call.error,
        extrinsic,
        name,
        pallet,
        parent,
        success: call.success,
    })
    await ctx.store.insert(entity)

    block.callsCount += 1
    await ctx.store.upsert(block)

    if (call.address.length == 0) {
        extrinsic.call = entity
        await ctx.store.upsert(extrinsic)
    }
}
