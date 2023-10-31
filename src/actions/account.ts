import {Account} from "../model";
import {ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";
import {decodeAddress} from "../utils";

export async function ensureAccount(ctx: ProcessorContext<StoreWithCache>, address: string) {
  const publicKey = decodeAddress(address)
  let account = await ctx.store.getOrFail(model.Account, publicKey)

  if (!account) {
    account = new Account({
      id: publicKey,
      address,
      publicKey,
    })
    await ctx.store.insert(account)
  }

  return account;
}
