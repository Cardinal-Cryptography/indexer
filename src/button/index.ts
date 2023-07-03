export interface RewardMintedEvent {
  game: string;
  when: number;
  to: string;
  amount: bigint;
}
