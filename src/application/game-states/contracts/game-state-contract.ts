export enum GameStates {
  INITIAL = 'initial',
  CHARACTER_CREATION = 'game',
}

export abstract class GameStateContract {
  abstract stateName: string;

  abstract processInput(input: string): Promise<GameStates>;
  abstract render(): Promise<void>;
}
