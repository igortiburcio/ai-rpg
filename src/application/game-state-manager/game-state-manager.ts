import { injectable, container } from 'tsyringe';
import { GameStateContract, GameStates } from '../game-states/contracts/game-state-contract';

@injectable()
export class GameStateManager {
  private currentState: GameStateContract | null = null;
  private instancedStates: GameStateContract[] = [];

  public getCurrentState(): GameStateContract | null {
    return this.currentState;
  }

  public setCurrentState(stateName: GameStates): void {
    this.currentState = this.createState(stateName);
  }

  public async processInput(input: string): Promise<void> {
    if (!this.currentState) {
      throw new Error('No current state set');
    }

    const nextStateName = await this.currentState.processInput(input);

    this.setCurrentState(nextStateName);
    this.render();
  }

  public async render(): Promise<void> {
    if (!this.currentState) {
      throw new Error('No current state set');
    }

    await this.currentState.render();
  }

  private createState(stateName: GameStates): GameStateContract {
    let state: GameStateContract = this.instancedStates.find((s) => s.stateName === stateName) as GameStateContract;

    switch (stateName) {
      case GameStates.INITIAL:
        if (!state) {
          state = container.resolve('InitialState') as GameStateContract;
          this.instancedStates.push(state);
        }

        return state;
      case GameStates.CHARACTER_CREATION:
        if (!state) {
          state = container.resolve('CreateCharState') as GameStateContract;
          this.instancedStates.push(state);
        }

        return state;
      default:
        throw new Error(`Unknown state: ${stateName}`);
    }
  }
}
