import { inject, injectable } from 'tsyringe';
import { IStringColorFiller } from '../../application/string-collor-filler/contracts/string-color-filler.interface';
import InputHandlerContract from '../../application/input-handler/contracts/input-handler-contract';
import { GameStateManager } from '../../application/game-state-manager/game-state-manager';
import { GameStates } from '../../application/game-states/contracts/game-state-contract';

@injectable()
export class ConsoleView {
  constructor(
    @inject('IStringColorFiller') private stringColorFiller: IStringColorFiller,
    @inject('InputHandler') private inputHandler: InputHandlerContract,
    @inject('GameStateManager') private gameStateManager: GameStateManager,
  ) {}

  public start(): void {
    console.clear();

    console.log(`${this.stringColorFiller.green('Bem-vindo ao RPG AI!')}`);
    console.log(`${this.stringColorFiller.blue('Digite "sair" ou "exit" para sair.')}\n`);

    this.gameStateManager.setCurrentState(GameStates.INITIAL);
    this.gameStateManager.render();

    this.inputHandler.initialize();

    this.inputHandler.subscribe({
      onInput: async (input: string) => {
        await this.gameStateManager.processInput(input);

        return true;
      },
      onExit: () => {
        console.log(`${this.stringColorFiller.red('Saindo...')}`);
      },
      getPriority: () => 1,
    });

    this.inputHandler.prompt();
  }
}
