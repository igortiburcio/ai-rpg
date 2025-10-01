import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const CharactersEntity = sqliteTable('characters', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  level: integer('level').notNull(),
  experience: integer('experience').notNull(),
  health: integer('health').notNull(),
  mana: integer('mana').notNull(),
  attack: integer('attack').notNull(),
  magicAttack: integer('magic_attack').notNull(),
  defense: integer('defense').notNull(),
  intelligence: integer('intelligence').notNull(),
  strength: integer('strength').notNull(),
  agility: integer('agility').notNull(),
  class: text('class').notNull(),
});
