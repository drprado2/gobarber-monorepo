import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import User from './User'

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  // eslint-disable-next-line camelcase
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: string

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: string
}
