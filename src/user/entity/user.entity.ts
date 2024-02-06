import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 255 })
  name: string;

  @Column({ nullable: true, length: 255 })
  email: string;

  @Column({ nullable: true, length: 255 })
  password: string;
}
