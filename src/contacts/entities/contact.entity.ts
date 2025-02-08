import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;
}
