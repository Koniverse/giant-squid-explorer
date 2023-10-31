import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {NativeTransfer} from "./nativeTransfer.model"
import {StakingReward} from "./stakingReward.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    publicKey!: string

    @Index_()
    @Column_("text", {nullable: false})
    address!: string

    @OneToMany_(() => NativeTransfer, e => e.from)
    sendTransfers!: NativeTransfer[]

    @OneToMany_(() => NativeTransfer, e => e.to)
    receiveTransfers!: NativeTransfer[]

    @OneToMany_(() => StakingReward, e => e.account)
    rewards!: StakingReward[]
}
