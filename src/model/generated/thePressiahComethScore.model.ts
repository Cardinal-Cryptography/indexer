import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class ThePressiahComethScore {
  constructor(props?: Partial<ThePressiahComethScore>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  lastClickedInBlock!: number

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalRewards!: bigint
}
