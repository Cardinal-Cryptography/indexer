import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class EarlyBirdSpecialScore {
    constructor(props?: Partial<EarlyBirdSpecialScore>) {
        Object.assign(this, props)
    }

    /**
     * Account id
     */
    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    lastClickedInBlock!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lastReward!: bigint

    @Column_("int4", {nullable: false})
    pressCount!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalRewards!: bigint
}
