import { BaseClassesInterface } from './contracts/base-classes-interface';

class InvalidClassNameError extends Error {
  code = 'INVALID_CLASS_NAME';
  constructor(className: string) {
    super(`Invalid class name: ${className}`);
  }
}

export default class BaseClasses implements BaseClassesInterface {
  getClass(className: 'Warrior' | 'Rogue' | 'Mage') {
    switch (className) {
      case 'Warrior':
        return this.getWarrior();
      case 'Rogue':
        return this.getRogue();
      case 'Mage':
        return this.getMage();
      default:
        throw new InvalidClassNameError(className);
    }
  }

  private getWarrior() {
    return {
      name: 'Warrior',
      level: 1,
      experience: 0,
      health: 150,
      mana: 30,
      attack: 15,
      magicAttack: 5,
      defense: 12,
      intelligence: 6,
      strength: 16,
      agility: 8,
      initialSpells: ['Slash', 'Taunt'],
    };
  }

  private getRogue() {
    return {
      name: 'Rogue',
      level: 1,
      experience: 0,
      health: 100,
      mana: 40,
      attack: 12,
      magicAttack: 7,
      defense: 8,
      intelligence: 10,
      strength: 10,
      agility: 16,
      initialSpells: ['Backstab', 'Stealth'],
    };
  }

  private getMage() {
    return {
      name: 'Mage',
      level: 1,
      experience: 0,
      health: 80,
      mana: 120,
      attack: 6,
      magicAttack: 18,
      defense: 5,
      intelligence: 18,
      strength: 6,
      agility: 10,
      initialSpells: ['Fireball', 'Magic Missile'],
    };
  }
}
