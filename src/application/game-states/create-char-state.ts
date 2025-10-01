import { GameStateContract, GameStates } from './contracts/game-state-contract';
import { CharactersRepository } from '../../infra/database/repository/characters-repository';
import { IStringColorFiller } from '../string-collor-filler/contracts/string-color-filler.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCharState extends GameStateContract {
  stateName = GameStates.CHARACTER_CREATION;
  step = 0;
  characterName: string = '';

  constructor(
    @inject('CharactersRepository') private charactersRepository: CharactersRepository,
    @inject('IStringColorFiller') private stringColorFiller: IStringColorFiller,
  ) {
    super();
  }

  async processInput(input: string): Promise<GameStates> {
    if (this.step === 0) {
      this.step++;

      this.characterName = input;

      return GameStates.CHARACTER_CREATION;
    }

    if (this.step === 1) {
      this.step++;

      if (input !== 'Warrior' && input !== 'Rogue' && input !== 'Mage') {
        console.log(this.stringColorFiller.red('Classe inválida.'));

        this.step--;

        return GameStates.CHARACTER_CREATION;
      }

      await this.charactersRepository.create({ name: this.characterName, class: input });

      return GameStates.INITIAL;
    }

    return GameStates.INITIAL;
  }

  async render() {
    if (this.step === 0) {
      console.log(this.stringColorFiller.green('Digite o nome do personagem:'));
    }

    if (this.step === 1) {
      console.log(this.stringColorFiller.green('Digite a classe do personagem (Warrior, Rogue ou Mage):'));
    }
  }
}
