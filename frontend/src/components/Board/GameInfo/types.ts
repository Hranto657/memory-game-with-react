import { CardType } from "@/types/commonTypes";

export interface IGameInfo {
  matchedCards: CardType[];
  onReset: () => void;
}
