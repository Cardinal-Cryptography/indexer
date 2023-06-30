import * as button from './abi/button';
import addresses from './addresses/index';
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from '@subsquid/substrate-processor';
import {
  Scores,
  ThePressiahComethScore,
  BackToTheFutureScore,
  EarlyBirdSpecialScore,
} from './model';
import { In } from 'typeorm';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import { toJSON } from '@subsquid/util-internal-json';
import { u8aToHex } from '@polkadot/util';
var util = require('util');

const EARLY_BIRD_SPECIAL_CONTRACT_ADDRESS = account2hex(
  addresses.early_bird_special,
);
const BACK_TO_THE_FUTURE_CONTRACT_ADDRESS = account2hex(
  addresses.back_to_the_future,
);
const THE_PRESSIAH_COMETH_CONTRACT_ADDRESS = account2hex(
  addresses.the_pressiah_cometh,
);

var onBoot = true;

const processor = new SubstrateBatchProcessor()
  .setBatchSize(1000)
  .setDataSource({
    archive: util.format(
      '%s://%s:%s/graphql',
      process.env.GATEWAY_PROTOCOL,
      process.env.GATEWAY_HOST,
      process.env.GATEWAY_PORT,
    ),
  })
  .addContractsContractEmitted(EARLY_BIRD_SPECIAL_CONTRACT_ADDRESS, {
    data: {
      event: { args: true },
    },
  } as const)
  .addContractsContractEmitted(BACK_TO_THE_FUTURE_CONTRACT_ADDRESS, {
    data: {
      event: { args: true },
    },
  } as const)
  .addContractsContractEmitted(THE_PRESSIAH_COMETH_CONTRACT_ADDRESS, {
    data: {
      event: { args: true },
    },
  } as const);

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

interface RewardMintedEvent {
  game: string;
  when: number;
  to: string;
  amount: bigint;
}

function extractPressEvents(ctx: Ctx): RewardMintedEvent[] {
  const events: RewardMintedEvent[] = [];
  for (const { header: block, items } of ctx.blocks) {
    for (const item of items) {
      if (
        item.name === 'Contracts.ContractEmitted' &&
        [
          EARLY_BIRD_SPECIAL_CONTRACT_ADDRESS,
          BACK_TO_THE_FUTURE_CONTRACT_ADDRESS,
          THE_PRESSIAH_COMETH_CONTRACT_ADDRESS,
        ].includes(item.event.args.contract)
      ) {
        const event = button.decodeEvent(item.event.args.data);
        if (event.__kind === 'RewardMinted') {
          ctx.log.debug(event, 'decoded button press event');
          events.push({
            game: encodeAddress(item.event.args.contract),
            to: encodeAddress(event.to),
            when: block.height,
            amount: event.reward,
          });
        }
      }
    }
  }

  return events;
}

processor.run(new TypeormDatabase(), async (ctx) => {
  if (onBoot) {
    ctx.log.info(addresses, 'processor listens to the events from addresses');
    onBoot = false;
  }

  const events = extractPressEvents(ctx);

  if (!(events.length === 0)) {
    var accountIds = new Set<string>();
    events.forEach((event) => {
      accountIds.add(event.to);
    });

    ctx.log.info(accountIds, 'processing events for accounts');

    var scoresMap = await ctx.store
      .find(Scores, {
        where: {
          id: In([...accountIds]),
        },
        relations: {
          earlyBirdSpecialScore: true,
          backToTheFutureScore: true,
          thePressiahComethScore: true,
        },
      })
      .then((scores) => {
        return new Map(scores.map((userScores) => [userScores.id, userScores]));
      });

    ctx.log.info(scoresMap, 'found previously persisted scores');

    events.forEach(async (event) => {
      ctx.log.info(event, 'processing an event');
      var accountId = event.to;

      var userScores = scoresMap.get(accountId);
      if (userScores == null) {
        userScores = new Scores({
          id: accountId,
        });
      }

      ctx.log.info(userScores, 'updating user scores');

      //  set game scores switching at event.game
      switch (event.game) {
        case addresses.early_bird_special:
          var game_score = userScores.earlyBirdSpecialScore;
          if (game_score == null) {
            game_score = new EarlyBirdSpecialScore({
              id: accountId,
              lastClickedInBlock: 0,
              lastReward: 0n,
              pressCount: 0,
              totalRewards: 0n,
            });
          }

          game_score.lastClickedInBlock = event.when;
          game_score.lastReward = event.amount;
          game_score.totalRewards += event.amount;
          game_score.pressCount += 1;

          userScores.earlyBirdSpecialScore = game_score;
          ctx.log.debug(game_score, 'updated EarlyBirdSpecial game score');
          break;

        case addresses.back_to_the_future:
          var game_score = userScores.backToTheFutureScore;
          if (game_score == null) {
            game_score = new BackToTheFutureScore({
              id: accountId,
              lastClickedInBlock: 0,
              lastReward: 0n,
              pressCount: 0,
              totalRewards: 0n,
            });
          }

          game_score.lastClickedInBlock = event.when;
          game_score.lastReward = event.amount;
          game_score.totalRewards += event.amount;
          game_score.pressCount += 1;

          userScores.backToTheFutureScore = game_score;
          ctx.log.debug(game_score, 'updated BackToTheFuture game score');
          break;

        case addresses.the_pressiah_cometh:
          var game_score = userScores.thePressiahComethScore;
          if (game_score == null) {
            game_score = new ThePressiahComethScore({
              id: accountId,
              lastClickedInBlock: 0,
              lastReward: 0n,
              pressCount: 0,
              totalRewards: 0n,
            });
          }

          game_score.lastClickedInBlock = event.when;
          game_score.lastReward = event.amount;
          game_score.totalRewards += event.amount;
          game_score.pressCount += 1;

          userScores.thePressiahComethScore = game_score;
          ctx.log.debug(game_score, 'updated ThePressiahCometh game score');
          break;

        default:
          break;
      }

      scoresMap.set(accountId, userScores);
    });

    var earlyBirdSpecialScores: EarlyBirdSpecialScore[] = [];
    var backToTheFutureScores: BackToTheFutureScore[] = [];
    var thePressiahComethScores: ThePressiahComethScore[] = [];

    scoresMap.forEach(function (userScores, accountId) {
      let earlyBirdSpecialScore = userScores.earlyBirdSpecialScore;
      if (earlyBirdSpecialScore != null) {
        earlyBirdSpecialScores.push(earlyBirdSpecialScore);
      }

      let backToTheFutureScore = userScores.backToTheFutureScore;
      if (backToTheFutureScore != null) {
        backToTheFutureScores.push(backToTheFutureScore);
      }

      let thePressiahComethScore = userScores.thePressiahComethScore;
      if (thePressiahComethScore != null) {
        thePressiahComethScores.push(thePressiahComethScore);
      }
    });

    // persist
    ctx.log.info(scoresMap, 'persisting updated scores');
    await ctx.store.save(earlyBirdSpecialScores);
    await ctx.store.save(backToTheFutureScores);
    await ctx.store.save(thePressiahComethScores);
    await ctx.store.save([...scoresMap.values()]);
  }
});

function account2hex(account: string): string {
  return u8aToHex(decodeAddress(account));
}
