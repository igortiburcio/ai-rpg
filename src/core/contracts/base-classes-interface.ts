export abstract class BaseClassesInterface {
  abstract getClass(className: 'Warrior' | 'Rogue' | 'Mage'): {
    name: string;
    level: number;
    experience: number;
    health: number;
    mana: number;
    attack: number;
    magicAttack: number;
    defense: number;
    intelligence: number;
    strength: number;
    agility: number;
    initialSpells: string[];
  };
}
