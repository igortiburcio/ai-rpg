import { inject, injectable } from 'tsyringe';
import { IStringColorFiller } from '../../application/string-collor-filler/contracts/string-color-filler.interface';
import InputHandlerContract from '../../application/input-handler/contracts/input-handler-contract';

@injectable()
export class ConsoleView {
  constructor(
    @inject('IStringColorFiller') private stringColorFiller: IStringColorFiller,
    @inject('InputHandler') private inputHandler: InputHandlerContract,
  ) {}

  public start(): void {
    console.clear();

    console.log(`${this.stringColorFiller.green('Bem-vindo ao RPG AI!')}`);
    console.log(`${this.stringColorFiller.blue('Digite "sair" ou "exit" para sair.')}\n`);

    this.inputHandler.initialize();
    this.inputHandler.subscribe({
      onInput: (input: string) => {
        console.log(`${this.stringColorFiller.yellow('> AI:')} TESTANDO\n`);

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
