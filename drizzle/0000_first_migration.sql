CREATE TABLE `character_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`spell_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `characters` (
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
	`class` text NOT NULL,
	`character_spells` integer,
	FOREIGN KEY (`character_spells`) REFERENCES `character_spells`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`spell_type` text NOT NULL,
	`multiplier` numeric NOT NULL,
	`mana_cost` numeric NOT NULL
);
