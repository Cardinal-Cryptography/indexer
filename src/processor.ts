import * as button from "./abi/button"
import addresses from './addresses/index';
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { Scores, ThePressiahComethScore, BackToTheFutureScore, EarlyBirdSpecialScore } from "./model"
import { In } from "typeorm"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import { toJSON } from '@subsquid/util-internal-json'
import { u8aToHex } from '@polkadot/util';
var util = require('util');

const EARLY_BIRD_SPECIAL = account2hex(addresses.early_bird_special)
const BACK_TO_THE_FUTURE = account2hex(addresses.back_to_the_future)
const THE_PRESSIAH_COMETH = account2hex(addresses.the_pressiah_cometh)

const processor = new SubstrateBatchProcessor()
    .setBatchSize(1000)
    .setDataSource({
        archive: util.format('%s://%s:%s/graphql', process.env.GATEWAY_PROTOCOL, process.env.GATEWAY_HOST, process.env.GATEWAY_PORT)
    })
    .addContractsContractEmitted(EARLY_BIRD_SPECIAL,{
        data: {
            event: {args: true}
        }
    } as const)
    .addContractsContractEmitted(BACK_TO_THE_FUTURE,{
        data: {
            event: {args: true}
        }
    } as const)
    .addContractsContractEmitted(THE_PRESSIAH_COMETH,{
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
        for (const item of block.items)        {
            if (item.name === 'Contracts.ContractEmitted'
                && [EARLY_BIRD_SPECIAL, BACK_TO_THE_FUTURE, THE_PRESSIAH_COMETH].includes(item.event.args.contract)) {

                const event = button.decodeEvent(item.event.args.data)
                if (event.__kind === 'ButtonPressed') {

                    ctx.log.debug(event, 'decoded button press event')

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

    var accountIds = new Set<string>()
    events.forEach(event => {
        accountIds.add (event.by)
    })

    console.log('processing events for accounts', accountIds)

    var scoresMap = await ctx.store.findBy(Scores, {
        id: In([...accountIds])
    }).then(scores => {
        return new Map(scores.map(userScores => [userScores.id, userScores]))
    })

    ctx.log.info(scoresMap, 'found previously persisted scores')

    events.forEach(async event => {

        var accountId = event.by

        var userScores = scoresMap.get (accountId)
        if (userScores == null) {
            userScores = new Scores ({
                id: accountId
            })
        }

        ctx.log.info(userScores, 'updating user scores')

        //  set game scores switching at event.game
        switch (event.game) {
            case addresses.early_bird_special:

                var game_score = userScores.earlyBirdSpecialScore;
                if (game_score == null) {
                    game_score = new EarlyBirdSpecialScore ({
                        id: accountId,
                        lastClickedInBlock: 0,
                        totalRewards: 0n
                    })
                }
                game_score.lastClickedInBlock = event.when
                game_score.totalRewards += event.score

                userScores.earlyBirdSpecialScore = game_score
                ctx.log.debug(game_score, 'updated EarlyBirdSpecial game score')
                break;

            case addresses.back_to_the_future:

                var game_score = userScores.backToTheFutureScore;
                if (game_score == null) {
                    game_score = new BackToTheFutureScore ({
                        id: accountId,
                        lastClickedInBlock: 0,
                        totalRewards: 0n
                    })
                }

                game_score.lastClickedInBlock = event.when
                game_score.totalRewards += event.score

                userScores.backToTheFutureScore = game_score
                ctx.log.debug(game_score, 'updated BackToTheFuture game score')
                break;

            case addresses.the_pressiah_cometh:

                var game_score = userScores.thePressiahComethScore
                if (game_score == null) {
                    game_score = new ThePressiahComethScore ({
                        id: accountId,
                        lastClickedInBlock: 0,
                        totalRewards: 0n
                    })
                }

                game_score.lastClickedInBlock = event.when
                game_score.totalRewards += event.score

                userScores.thePressiahComethScore = game_score
                ctx.log.debug(game_score, 'updated ThePressiahCometh game score')
                break;

            default:
                break;
        }

        scoresMap.set (accountId, userScores)
    })

    var earlyBirdSpecialScores: EarlyBirdSpecialScore[] = []
    var backToTheFutureScores: BackToTheFutureScore[] = []
    var thePressiahComethScores: ThePressiahComethScore[] = []

    scoresMap.forEach(function(userScores, accountId) {
        let earlyBirdSpecialScore = userScores.earlyBirdSpecialScore
        if (earlyBirdSpecialScore != null) {
            earlyBirdSpecialScores.push(earlyBirdSpecialScore)
        }

        let backToTheFutureScore = userScores.backToTheFutureScore
        if (backToTheFutureScore != null) {
            backToTheFutureScores.push (backToTheFutureScore)
        }

        let thePressiahComethScore = userScores.thePressiahComethScore
        if (thePressiahComethScore != null) {
            thePressiahComethScores.push (thePressiahComethScore)
        }

    })

    // persist
    console.log('persisting updated scores', scoresMap)
    await ctx.store.save(earlyBirdSpecialScores)
    await ctx.store.save(backToTheFutureScores)
    await ctx.store.save(thePressiahComethScores)
    await ctx.store.save([...scoresMap.values()])
})

function account2hex(account: string) : string {
    return u8aToHex(decodeAddress(account))
}
