import { CharactersRepository } from '../../infra/database/repository/characters-repository';
import { IStringColorFiller } from '../string-collor-filler/contracts/string-color-filler.interface';
import { GameStateContract, GameStates } from './contracts/game-state-contract';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class InitialState extends GameStateContract {
  stateName = GameStates.INITIAL;

  constructor(
    @inject('CharactersRepository') private charactersRepository: CharactersRepository,
    @inject('IStringColorFiller') private stringColorFiller: IStringColorFiller,
  ) {
    super();
  }

  async processInput(input: string): Promise<GameStates> {
    const characters = await this.charactersRepository.getAll();
    const characterNames = characters.map((character) => character.name);

    if (input === 'criar') {
      return GameStates.CHARACTER_CREATION;
    }

    if (characterNames.includes(input)) {
      return GameStates.INITIAL;
    }

    return GameStates.INITIAL;
  }

  async render() {
    const characters = await this.charactersRepository.getAll();

    if (characters.length === 0) {
      console.log(
        this.stringColorFiller.yellow('Nenhum personagem encontrado. Digite "criar" para criar um personagem.'),
      );
    } else {
      console.log(
        this.stringColorFiller.white(
          'Digite o nome do personagem para jogar ou "criar" para criar um novo personagem:\n',
        ),
      );

      characters.forEach((character) => {
        console.log(this.stringColorFiller.purple(`${character.name} - ${character.class}`));
      });
    }
  }
}
