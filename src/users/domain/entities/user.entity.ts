import { Exclude } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @MinLength(8)
  @Exclude()
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
