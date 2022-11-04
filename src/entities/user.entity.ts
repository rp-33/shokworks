import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { Event } from './event.entity';
  
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar',unique: true, nullable: false })
    email: string;
  
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToMany(() => Event, event => event.user,{nullable: false})
    event: Event[];

}