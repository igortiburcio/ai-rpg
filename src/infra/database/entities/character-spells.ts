import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const CharacterSpellsEntity = sqliteTable('character_spells', {
  id: integer('id').primaryKey(),
  characterId: integer('character_id').notNull(),
  spellId: integer('spell_id').notNull(),
});
