import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"

import addresses from './addresses.json';

// import * as erc20 from "./abi/erc20"
// import {Owner, Transfer} from "./model"

import { toJSON } from '@subsquid/util-internal-json'

const processor = new SubstrateBatchProcessor()
    .setBatchSize(500)
    .setDataSource({
        archive: "http://127.0.0.1:8000/graphql"
    })
    .addContractsContractEmitted(addresses.early_bird_special, {
        data: {
            event: {args: true}
        }
    } as const)

type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>

interface ButtonPress {
    by: string
    when: number
    score: bigint
}

function extractPressEvents(ctx: Ctx): ButtonPress[] {
    const events: ButtonPress[] = []
    for (const block of ctx.blocks) {
        ctx.log.info(`block: ${JSON.stringify(toJSON(block))}`)
    }
    return events
}

processor.run(new TypeormDatabase(), async ctx => {

    const events = extractPressEvents(ctx)

    // txs.forEach(tx => {
    //   ctx.log.error(`tx: ${JSON.stringify(toJSON(tx))}`)
    // })

})
