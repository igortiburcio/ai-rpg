import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Characters {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'int', nullable: false })
  level!: number;

  @Column({ type: 'int', nullable: false })
  experience!: number;

  @Column({ type: 'int', nullable: false })
  health!: number;

  @Column({ type: 'int', nullable: false })
  mana!: number;

  @Column({ type: 'int', nullable: false })
  attack!: number;

  @Column({ type: 'int', nullable: false })
  magicAttack!: number;

  @Column({ type: 'int', nullable: false })
  defense!: number;

  @Column({ type: 'int', nullable: false })
  intelligence!: number;

  @Column({ type: 'int', nullable: false })
  strength!: number;

  @Column({ type: 'int', nullable: false })
  agility!: number;

  @Column({ type: 'array', array: true, nullable: false })
  initialSpells!: string[];
}
