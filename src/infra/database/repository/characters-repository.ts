import { db } from '../../../main';
import { CharactersEntity } from '../entities/characters';
import { injectable } from 'tsyringe';
import { SpellsEntity } from '../entities/spells';
import { inject } from 'tsyringe';
import BaseClasses from '../../../core/base-classes';
import { eq, inArray } from 'drizzle-orm';
import { CharacterSpellsEntity } from '../entities/character-spells';

@injectable()
export class CharactersRepository {
  constructor(@inject('BaseClasses') private baseClasses: BaseClasses) {}

  public async create(character: { name: string; class: 'Warrior' | 'Rogue' | 'Mage' }) {
    const classData = this.baseClasses.getClass(character.class);

    const [newCharacter] = await db
      .insert(CharactersEntity)
      .values({
        name: character.name,
        level: classData.level,
        experience: classData.experience,
        health: classData.health,
        mana: classData.mana,
        attack: classData.attack,
        magicAttack: classData.magicAttack,
        defense: classData.defense,
        intelligence: classData.intelligence,
        strength: classData.strength,
        agility: classData.agility,
        class: classData.name,
      })
      .returning();

    const spells = await db.select().from(SpellsEntity).where(inArray(SpellsEntity.name, classData.initialSpells));

    await db.insert(CharacterSpellsEntity).values(
      spells.map((spell) => ({
        characterId: newCharacter.id,
        spellId: spell.id,
      })),
    );

    return { character: newCharacter };
  }

  public async getAll() {
    const characters = await db.select().from(CharactersEntity);

    return characters;
  }
}
