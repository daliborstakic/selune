import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;
}
