import { container } from 'tsyringe';
import { StringColorFiller } from './application/string-collor-filler/string-color-filler';
import InputHandler from './application/input-handler/input-handler';

export function setupDependencies() {
  container.register('IStringColorFiller', { useClass: StringColorFiller });
  container.register('InputHandler', { useClass: InputHandler });
}
