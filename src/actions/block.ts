import {BlockHeader, ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";
import {decodeHex} from "@subsquid/substrate-processor";

export async function saveBlock(ctx: ProcessorContext<StoreWithCache>, block: BlockHeader) {
    const entity = new model.Block({
        id: block.id,
        height: block.height,
        hash: decodeHex(block.hash),
        parentHash: decodeHex(block.parentHash),
        timestamp: new Date(block.timestamp ?? 0),
        extrinsicsicRoot: decodeHex(block.extrinsicsRoot),
        specName: block.specName,
        specVersion: block.specVersion,
        implName: block.implName,
        implVersion: block.implVersion,
        stateRoot: decodeHex(block.stateRoot),
        validator: block.validator ? decodeHex(block.validator) : undefined,
        extrinsicsCount: 0,
        callsCount: 0,
        eventsCount: 0,
    })

    await ctx.store.insert(entity)
}