import { container } from 'tsyringe';
import { StringColorFiller } from './application/string-color-filler';

export function setupDependencies() {
  container.register('IStringColorFiller', { useClass: StringColorFiller });
}
