import {Account} from "../model";
import {ProcessorContext} from "../processor";
import {StoreWithCache} from "@belopash/typeorm-store";
import * as model from "../model";
import {decodeAddress, encodeAddress} from "../utils";

export async function ensureAccount(ctx: ProcessorContext<StoreWithCache>, publicKey: string) {
  const address = encodeAddress(publicKey)
  let account = await ctx.store.get(model.Account, publicKey)

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
