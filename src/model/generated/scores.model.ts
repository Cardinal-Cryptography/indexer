import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {EarlyBirdSpecialScore} from "./earlyBirdSpecialScore.model"
import {BackToTheFutureScore} from "./backToTheFutureScore.model"
import {ThePressiahComethScore} from "./thePressiahComethScore.model"

@Entity_()
export class Scores {
  constructor(props?: Partial<Scores>) {
    Object.assign(this, props)
  }

  /**
   * Account id
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => EarlyBirdSpecialScore, {nullable: true})
  earlyBirdSpecialScore!: EarlyBirdSpecialScore | undefined | null

  @Index_()
  @ManyToOne_(() => BackToTheFutureScore, {nullable: true})
  backToTheFutureScore!: BackToTheFutureScore | undefined | null

  @Index_()
  @ManyToOne_(() => ThePressiahComethScore, {nullable: true})
  thePressiahComethScore!: ThePressiahComethScore | undefined | null
}
