import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import { In } from "typeorm"
import { u8aToHex } from '@polkadot/util';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import * as button from "./abi/button"
import addresses from './addresses.json';
import { EarlyBirdSpecialScores } from "./model"
import { toJSON } from '@subsquid/util-internal-json'

const early_bird_special = account2hex(addresses.early_bird_special)

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
    by: string
    when: number
    score: bigint
}

function extractPressEvents(ctx: Ctx): ButtonPressEvent[] {
    const events: ButtonPressEvent[] = []
    for (const block of ctx.blocks) {

        ctx.log.debug(block, 'block')
        for (const item of block.items)        {
            if (item.name === 'Contracts.ContractEmitted') {
                switch(item.event.args.contract) {
                    case early_bird_special: {

                        ctx.log.debug(item, 'early_bird_special event')
                        const event = button.decodeEvent(item.event.args.data)
                        ctx.log.debug(event, 'early_bird_special decoded event')

                        if (event.__kind === 'ButtonPressed') {
                            ctx.log.debug(event, 'early_bird_special button press event')

                            events.push({
                                by: encodeAddress (event.by),
                                when: event.when,
                                score: event.score
                            })

                        }

                        break;
                    }

                    default: {
                        break;
                    }
                }
            }
        }
    }
    return events
}

processor.run(new TypeormDatabase(), async ctx => {

    const events = extractPressEvents(ctx)

    events.forEach(async event => {
        ctx.log.info(event, 'event')

        let userScore = await ctx.store.findBy(EarlyBirdSpecialScores, {
            id: event.by
        }).then((score) => {

            ctx.log.info(score, 'found existing user score')            
            
            return score
        })

    })

})

function account2hex(account: string) {
    return u8aToHex(decodeAddress(account))
}
