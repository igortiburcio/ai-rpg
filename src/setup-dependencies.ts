import { container } from 'tsyringe';
import { StringColorFiller } from './application/string-collor-filler/string-color-filler';

export function setupDependencies() {
  container.register('IStringColorFiller', { useClass: StringColorFiller });
}
