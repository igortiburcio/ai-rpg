import { container } from 'tsyringe';
import { ConsoleView } from './presentation/console/console-view';
import { setupDependencies } from './setup-dependencies';
import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

setupDependencies();

const sqlite = new Database('sqlite.db');
export const db = drizzle({ client: sqlite });

const consoleView = container.resolve(ConsoleView);
consoleView.start();
