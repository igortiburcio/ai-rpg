PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`level` integer NOT NULL,
	`experience` integer NOT NULL,
	`health` integer NOT NULL,
	`mana` integer NOT NULL,
	`attack` integer NOT NULL,
	`magic_attack` integer NOT NULL,
	`defense` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`strength` integer NOT NULL,
	`agility` integer NOT NULL,
	`class` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_characters`("id", "name", "level", "experience", "health", "mana", "attack", "magic_attack", "defense", "intelligence", "strength", "agility", "class") SELECT "id", "name", "level", "experience", "health", "mana", "attack", "magic_attack", "defense", "intelligence", "strength", "agility", "class" FROM `characters`;--> statement-breakpoint
DROP TABLE `characters`;--> statement-breakpoint
ALTER TABLE `__new_characters` RENAME TO `characters`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_character_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`spell_id` integer NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`spell_id`) REFERENCES `spells`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_character_spells`("id", "character_id", "spell_id") SELECT "id", "character_id", "spell_id" FROM `character_spells`;--> statement-breakpoint
DROP TABLE `character_spells`;--> statement-breakpoint
ALTER TABLE `__new_character_spells` RENAME TO `character_spells`;