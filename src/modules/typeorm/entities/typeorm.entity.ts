import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TypeormEntity2 {
  @PrimaryColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;
}
