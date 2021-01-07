import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  message: string

  @JoinColumn({ name: 'senderId' })
  @ManyToOne(() => User, user => user.sentMessages)
  sender: User

  @JoinColumn({ name: 'receiverId' })
  @ManyToOne(() => User, user => user.receivedMessages)
  receiver: User

  @CreateDateColumn()
  readonly createdAt: string

  @UpdateDateColumn()
  readonly updatedAt: string
}
