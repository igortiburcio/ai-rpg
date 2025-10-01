import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core';

export const SpellsEntity = sqliteTable('spells', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  spellType: text('spell_type').notNull(),
  multiplier: numeric('multiplier').notNull(),
  manaCost: numeric('mana_cost').notNull(),
});
