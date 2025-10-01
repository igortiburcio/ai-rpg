import { container } from 'tsyringe';
import { ConsoleView } from './presentation/console/console-view';
import { setupDependencies } from './setup-dependencies';
import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

setupDependencies();

const sqlite = new Database('sqlite.db');
export const db = drizzle({ client: sqlite });

migrate(db, { migrationsFolder: './drizzle' });

const consoleView = container.resolve(ConsoleView);
consoleView.start();
