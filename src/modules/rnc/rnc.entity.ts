import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Rnc {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  commercialName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  creationDate: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  paymentSystem: string;
}
