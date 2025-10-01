import { container } from 'tsyringe';
import { StringColorFiller } from './application/string-collor-filler/string-color-filler';
import InputHandler from './application/input-handler/input-handler';
import BaseClasses from './core/base-classes';
import { CharactersRepository } from './infra/database/repository/characters-repository';
import InitialState from './application/game-states/initial-state';
import CreateCharState from './application/game-states/create-char-state';
import { GameStateManager } from './application/game-state-manager/game-state-manager';

export function setupDependencies() {
  container.register('IStringColorFiller', { useClass: StringColorFiller });
  container.register('InputHandler', { useClass: InputHandler });
  container.register('BaseClasses', { useClass: BaseClasses });
  container.register('CharactersRepository', { useClass: CharactersRepository });
  container.register('InitialState', { useClass: InitialState });
  container.register('CreateCharState', { useClass: CreateCharState });
  container.register('GameStateManager', { useClass: GameStateManager });
}
