import readline from 'readline';
import { inject, injectable } from 'tsyringe';
import { IStringColorFiller } from '../../application/string-collor-filler/contracts/string-color-filler.interface';

@injectable()
export class ConsoleView {
  constructor(@inject('IStringColorFiller') private stringColorFiller: IStringColorFiller) {}

  public start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.clear();

    console.log(`${this.stringColorFiller.green('Bem-vindo ao RPG AI!')}`);
    console.log(`${this.stringColorFiller.blue('Digite "sair" ou "exit" para sair.')}`);
    rl.prompt(true);

    rl.on('line', (line) => {
      if (line === 'sair' || line === 'exit') {
        rl.close();
        process.exit(0);
      }

      const text = line.trim();

      if (text === '') {
        rl.prompt(true);
        return;
      }

      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);

      console.log(`${this.stringColorFiller.purple('> Você:')} ${text}\n`);
      console.log(`${this.stringColorFiller.yellow('> AI:')} TESTANDO\n`);

      rl.prompt(true);
    });

    rl.on('close', () => {
      console.log(`${this.stringColorFiller.red('Saindo...')}`);
      process.exit(0);
    });
  }
}
