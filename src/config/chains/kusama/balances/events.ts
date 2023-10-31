import {EventType, sts} from '../support'
import assert from "assert";
import {Event, ProcessorContext} from "../../../../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {TransferEvent} from "../../../../actions/nativeTransfer";

export const AccountId = sts.bytes()
export const AccountId32 = sts.bytes()
export const Balance = sts.bigint()

export const transfer = {
  name: 'Balances.Transfer',
  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  v1020: new EventType(
    'Balances.Transfer',
    sts.tuple([AccountId, AccountId, Balance, Balance])
  ),
  /**
   *  Transfer succeeded (from, to, value).
   */
  v1050: new EventType(
    'Balances.Transfer',
    sts.tuple([AccountId, AccountId, Balance])
  ),
  /**
   * Transfer succeeded.
   */
  v9130: new EventType(
    'Balances.Transfer',
    sts.struct({
      from: AccountId32,
      to: AccountId32,
      amount: Balance,
    })
  ),
}

export async function decodeNativeTransfer(ctx: ProcessorContext<StoreWithCache>, event: Event): Promise<TransferEvent | null> {
  if (event.name == transfer.name) {
    let rec: { from: string; to: string; amount: bigint }
    if (transfer.v1020.is(event)) {
      let [from, to, amount] = transfer.v1020.decode(event)
      rec = {from, to, amount}
    } else if (transfer.v1050.is(event)) {
      let [from, to, amount] = transfer.v1050.decode(event)
      rec = {from, to, amount}
    } else if (transfer.v9130.is(event)) {
      rec = transfer.v9130.decode(event)
    } else {
      throw new Error('Unsupported spec')
    }

    const block = event.block;

    assert(block.timestamp, `Got an undefined timestamp at block ${block.height}`)

    return {
      id: event.id,
      blockNumber: block.height,
      timestamp: new Date(block.timestamp),
      extrinsicHash: event.extrinsic?.hash,
      success: !!event.extrinsic?.success,
      from: rec.from,
      to: rec.to,
      amount: rec.amount,
      fee: event.extrinsic?.fee || 0n,
    }
  }

  return null;
}