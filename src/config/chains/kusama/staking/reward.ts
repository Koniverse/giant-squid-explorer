import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import assert from "assert";
import {Event, ProcessorContext} from "../../../../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import {StakingRewardEvent} from "../../../../actions/stakingReward";

export const AccountId = sts.bytes()
export const AccountId32 = sts.bytes()
export const Stash = sts.bytes()
export const ValidatorStash = sts.bytes()
export const Amount = sts.bigint()
export const Era = sts.number()

export const staking = {
  name: 'Staking.Reward',
  name2: 'Staking.Rewarded',
  /**
   *  All validators have been rewarded by the first balance; the second is the remainder
   *  from the maximum amount of reward.
   */
  v1020: new EventType(
    'Staking.Reward',
    sts.unknown()
  ),
  /**
   *  The staker has been rewarded by this amount. AccountId is controller account.
   */
  v1050: new EventType(
    'Staking.Reward',
    sts.tuple([Stash, Amount])
  ),
  v1058: new EventType(
    'Staking.payout_stakers',
    sts.struct({validatorStash: ValidatorStash, era: Era})
  ),
  /**
   * The nominator has been rewarded by this amount.
   */
  v9090: new EventType(
    'Staking.Rewarded',
    sts.tuple([Stash, Amount])
  ),
  /**
   * The nominator has been rewarded by this amount.
   */
  v9300: new EventType(
    'Staking.Rewarded',
    sts.struct({stash: Stash, amount: Amount})
  ),
}

export async function decodeStakingReward(ctx: ProcessorContext<StoreWithCache>, event: Event): Promise<StakingRewardEvent | null> {
  if (event.name == staking.name || event.name === staking.name2) {
    let rec: { stash: string; amount: bigint }
    if (staking.v1020.is(event)) {
      return null;
    } else if (staking.v1050.is(event)) {
      let [stash, amount] = staking.v1050.decode(event)
      rec = {stash, amount}
    } else if (staking.v9090.is(event)) {
      let [stash, amount] = staking.v9090.decode(event)
      rec = {stash, amount}
    } else if (staking.v9300.is(event)) {
      rec = staking.v9300.decode(event)
    } else {
      throw new Error('Unsupported spec')
    }

    let validatorStash = undefined;
    let era = undefined;
  if (event.call && staking.v1058.is(event.call)) {
    const c = staking.v1058.decode(event.call);
    validatorStash = c.validatorStash
    era = c.era
  }

    const block = event.block;

    assert(block.timestamp, `Got an undefined timestamp at block ${block.height}`)

    return {
      id: event.id,
      blockNumber: block.height,
      timestamp: new Date(block.timestamp),
      extrinsicHash: event.extrinsic?.hash,
      success: !!event.extrinsic?.success,
      stash: rec.stash,
      amount: rec.amount,
      fee: event.extrinsic?.fee || 0n,
      validatorStash,
      era
    }
  }

  return null;
}