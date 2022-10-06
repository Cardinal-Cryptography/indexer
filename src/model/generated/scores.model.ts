import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Scores {
  constructor(props?: Partial<Scores>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  game!: string

  @Column_("text", {nullable: false})
  account!: string

  @Column_("int4", {nullable: false})
  lastClickedInBlock!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalRewards!: bigint
}
