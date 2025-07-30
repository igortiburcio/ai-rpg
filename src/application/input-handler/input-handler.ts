import { inject, injectable } from 'tsyringe';
import { IStringColorFiller } from '../string-collor-filler/contracts/string-color-filler.interface';
import InputObserverContract from './contracts/input-observer-contract';
import readline from 'readline';
import InputHandlerContract from './contracts/input-handler-contract';

@injectable()
export default class InputHandler extends InputHandlerContract {
  private observers: InputObserverContract[] = [];
  private rl?: readline.Interface;
  private isInitialized = false;

  constructor(@inject('IStringColorFiller') private stringColorFiller: IStringColorFiller) {
    super();
  }

  initialize(): void {
    if (this.isInitialized) return;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.setupEventListeners();
    this.isInitialized = true;
  }

  private setupEventListeners(): void {
    this.rl?.on('line', (line) => {
      const input = line.trim();

      if (input === '') {
        this.rl?.prompt(true);
        return;
      }

      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);

      console.log(`${this.stringColorFiller.purple('> Você:')} ${input}\n`);

      this.notifyObservers(input);

      this.rl?.prompt(true);
    });

    this.rl?.on('close', () => {
      this.notifyExit();
      process.exit(0);
    });
  }

  subscribe(observer: InputObserverContract): void {
    this.observers.push(observer);
    this.observers.sort((a, b) => b.getPriority() - a.getPriority());
  }

  unsubscribe(observer: InputObserverContract): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) this.observers.splice(index, 1);
  }

  private notifyObservers(input: string): void {
    for (const observer of this.observers) {
      if (observer.onInput(input)) {
        break;
      }
    }
  }

  private notifyExit(): void {
    this.observers.forEach((observer) => observer.onExit());
  }

  showMessage(message: string): void {
    console.log(message);
  }

  prompt(): void {
    this.rl?.prompt(true);
  }

  close(): void {
    this.rl?.close();
  }
}
