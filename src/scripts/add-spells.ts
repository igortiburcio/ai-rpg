import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { SpellsEntity } from '../infra/database/entities/spells';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

const sqlite = new Database('sqlite.db');
const db = drizzle({ client: sqlite });

(async () => {
  migrate(db, { migrationsFolder: './drizzle' });
})();

type Spell = {
  name: string;
  description: string;
  spellType: string;
  multiplier: number;
  manaCost: number;
};

const spells: Spell[] = [
  {
    name: 'Fireball',
    description: 'Uma bola de fogo que causa dano de fogo ao alvo. Deixa o alvo queimando.',
    spellType: 'magic',
    multiplier: 1.3,
    manaCost: 10,
  },
  {
    name: 'Magic Missile',
    description: 'Um misil mágico que causa dano mágico ao alvo.',
    spellType: 'magic',
    multiplier: 1.5,
    manaCost: 15,
  },
  {
    name: 'Backstab',
    description: 'Um golpe que só funciona nas costas do alvo e causa dano físico muito maior ao alvo.',
    spellType: 'physical',
    multiplier: 2.5,
    manaCost: 5,
  },
  {
    name: 'Stealth',
    description: 'Se torna invisível por tempo indeterminado.',
    spellType: 'magic',
    multiplier: 0,
    manaCost: 15,
  },
  {
    name: 'Stone Skin',
    description: 'Aumenta a defesa do usuário.',
    spellType: 'magic',
    multiplier: 1.4,
    manaCost: 15,
  },
  {
    name: 'Slash',
    description: 'Um golpe que causa dano físico ao alvo.',
    spellType: 'physical',
    multiplier: 1.2,
    manaCost: 10,
  },
];

async function addSpells() {
  for (const spell of spells) {
    await db.insert(SpellsEntity).values({
      name: spell.name,
      description: spell.description,
      spellType: spell.spellType,
      multiplier: spell.multiplier.toString(),
      manaCost: spell.manaCost.toString(),
    });
  }
}

addSpells();
