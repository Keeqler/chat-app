import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Message } from './Message'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  username: string

  @Column({ select: false })
  password?: string

  @Column({ nullable: true })
  avatar?: string

  @JoinColumn()
  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[]

  @JoinColumn()
  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[]

  @CreateDateColumn()
  readonly createdAt: string

  @UpdateDateColumn()
  readonly updatedAt: string
}
