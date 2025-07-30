import { injectable } from 'tsyringe';
import { IStringColorFiller } from './contracts/string-color-filler.interface';

@injectable()
export class StringColorFiller implements IStringColorFiller {
  public purple(text: string): string {
    return `\x1b[35m${text}\x1b[0m`;
  }

  public yellow(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
  }

  public red(text: string): string {
    return `\x1b[31m${text}\x1b[0m`;
  }

  public green(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
  }

  public blue(text: string): string {
    return `\x1b[34m${text}\x1b[0m`;
  }

  public brown(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
  }

  public pink(text: string): string {
    return `\x1b[35m${text}\x1b[0m`;
  }

  public white(text: string): string {
    return `\x1b[37m${text}\x1b[0m`;
  }

  public orange(text: string): string {
    return `\x1b[38m${text}\x1b[0m`;
  }
}
