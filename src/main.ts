import 'reflect-metadata';

import { container } from 'tsyringe';
import { ConsoleView } from './presentation/console/console-view';
import { setupDependencies } from './setup-dependencies';

setupDependencies();

const consoleView = container.resolve(ConsoleView);
consoleView.start();
