import * as button from "./abi/button"
import addresses from './addresses.json';
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { Scores } from "./model"
import { In } from "typeorm"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import { toJSON } from '@subsquid/util-internal-json'
import { u8aToHex } from '@polkadot/util';

const early_bird_special = account2hex(addresses.early_bird_special)
const back_to_the_future = account2hex(addresses.back_to_the_future)
const the_pressiah_cometh = account2hex(addresses.the_pressiah_cometh)

const processor = new SubstrateBatchProcessor()
    .setBatchSize(500)
    .setDataSource({
        archive: "http://127.0.0.1:8000/graphql"
    })
    .addContractsContractEmitted(early_bird_special,{
        data: {
            event: {args: true}
        }
    } as const)

type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>

interface ButtonPressEvent {
    game: string
    by: string
    when: number
    score: bigint
}

function extractPressEvents(ctx: Ctx): ButtonPressEvent[] {
    const events: ButtonPressEvent[] = []
    for (const block of ctx.blocks) {

        ctx.log.debug(block, 'block')
        for (const item of block.items)        {
            if (item.name === 'Contracts.ContractEmitted' &&
                [early_bird_special, back_to_the_future, the_pressiah_cometh].includes(item.event.args.contract)) {

                const event = button.decodeEvent(item.event.args.data)
                if (event.__kind === 'ButtonPressed') {
                    ctx.log.info(event, 'decoded button press event')

                    events.push({
                        game: encodeAddress(item.event.args.contract),
                        by: encodeAddress (event.by),
                        when: event.when,
                        score: event.score
                    })

                }

            }
        }
    }
    return events
}

processor.run(new TypeormDatabase(), async ctx => {

    const events = extractPressEvents(ctx)

    const accounts = new Set<string>()
    events.forEach(event => {
        accounts.add (event.by)
    })

    ctx.log.info(accounts, '@ accounts')

    ctx.log.info(`accounts: ${JSON.stringify(toJSON(accounts))}`)

    // events.forEach(async event => {
    //     ctx.log.info(event, 'event')

    //     let userScore =
    //         await ctx.store.findBy(EarlyBirdSpecialScores, {
    //         id: event.by
    //     }).then((scores) => {

    //         ctx.log.info(scores, 'found existing user scores')

    //         // ctx.log.info(score [0].account, 'score.account')
    //         // ctx.log.info(score [0].lastClickedInBlock, 'score.lastClickedInBlock')
    //         // ctx.log.info(score [0].totalRewards, 'score.totalRewards')

    //         // return score

    //         // scores.map(score => {

    //         //     ctx.log.info(score, 'found existing user score')
    //         //     return score
    //         // })


    //     })

    // })

})

function account2hex(account: string) {
    return u8aToHex(decodeAddress(account))
}
