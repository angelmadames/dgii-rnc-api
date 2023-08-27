import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Rnc {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  commercialName: string;

  @Column()
  description: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @Column()
  paymentSystem: string;
}
