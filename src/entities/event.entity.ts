import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';
  
@Entity('event')
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    address: string;

    @CreateDateColumn({ type: 'timestamp',nullable: false })
    date: Date;

    @CreateDateColumn({ type: 'timestamp',nullable: false })
    createdAt: Date;

    @ManyToOne(() => User, user => user.event,{nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

}