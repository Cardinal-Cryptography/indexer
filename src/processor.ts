import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"

import addresses from './addresses.json';

// import * as erc20 from "./abi/erc20"
// import {Owner, Transfer} from "./model"

import { toJSON } from '@subsquid/util-internal-json' 
 
// const CONTRACT_ADDRESS = '0x5207202c27b646ceeb294ce516d4334edafbd771f869215cb070ba51dd7e2c72'
// const EARLY_BIRD_SPECIAL = '5HiLTXq83SaxbFZmdi8hiaxMsP1VyKNvDdg97oFPhxHqAQM6'

const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive("shibuya", { release: "FireSquid" })
    })
    .addContractsContractEmitted(addresses.early_bird_special, {
        data: {
            event: {args: true}
        }
    } as const)
 
type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>
 
 
processor.run(new TypeormDatabase(), async ctx => {
    const txs = extractTransferRecords(ctx)
 
    txs.forEach(tx => {

      ctx.log.error(`tx: ${JSON.stringify(toJSON(tx))}`)
        
    })
 
 

    
})
 
 
interface TransferRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
}
 
 
function extractTransferRecords(ctx: Ctx): TransferRecord[] {

    const records: TransferRecord[] = []
    
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {

                const event = erc20.decodeEvent(item.event.args.data)
                if (event.__kind === 'Transfer') {

                    records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(5).encode(event.from),
                        to: event.to && ss58.codec(5).encode(event.to),
                        amount: event.value,
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp)
                    })
                    
                }
                
            }
        }
    }
    return records
}
 
