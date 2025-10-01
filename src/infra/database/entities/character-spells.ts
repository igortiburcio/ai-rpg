import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { CharactersEntity } from './characters';
import { SpellsEntity } from './spells';

export const CharacterSpellsEntity = sqliteTable('character_spells', {
  id: integer('id').primaryKey(),
  characterId: integer('character_id')
    .notNull()
    .references(() => CharactersEntity.id),
  spellId: integer('spell_id')
    .notNull()
    .references(() => SpellsEntity.id),
});
