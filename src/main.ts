import {StoreWithCache, TypeormDatabaseWithCache} from '@belopash/typeorm-store'
import {decodeHex} from '@subsquid/substrate-processor'
import * as model from './model'
import {BlockHeader, Call, Event, Extrinsic, processor, ProcessorContext} from './processor'
import {saveBlock} from "./actions/block";
import {saveExtrinsic} from "./actions/extrinsic";
import {saveCall} from "./actions/call";
import {saveEvent} from "./actions/event";
import {CHAIN_CONFIG} from "./config";

processor.run(new TypeormDatabaseWithCache(), async (ctx) => {
    for (const {header: block, calls, events, extrinsics} of ctx.blocks) {
        ctx.log.debug(
            `block ${block.height}: extrinsics - ${extrinsics.length}, calls - ${calls.length}, events - ${events.length}`
        )

        await saveBlock(ctx, block)

        for (const extrinsic of extrinsics) {
            await saveExtrinsic(ctx, extrinsic)
        }

        for (const call of calls.reverse()) {
            await saveCall(ctx, call)
        }

        for (const event of events) {
            await saveEvent(ctx, event)
        }
    }
})







