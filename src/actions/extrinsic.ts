import {Extrinsic, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";
import {decodeHex} from "@subsquid/substrate-processor";

export async function saveExtrinsic(ctx: ProcessorContext<StoreWithCache>, extrinsic: Extrinsic) {
    const block = await ctx.store.getOrFail(model.Block, extrinsic.block.id)

    const entity = new model.Extrinsic({
        id: extrinsic.id,
        block,
        error: extrinsic.error,
        fee: extrinsic.fee,
        hash: decodeHex(extrinsic.hash),
        index: extrinsic.index,
        signature: new model.ExtrinsicSignature(extrinsic.signature),
        success: extrinsic.success,
        tip: extrinsic.tip,
        version: extrinsic.version,
    })
    await ctx.store.insert(entity)

    block.extrinsicsCount += 1
    await ctx.store.upsert(block)
}