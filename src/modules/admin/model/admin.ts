import { Entity } from "typeorm";

@Entity()
export class Admin {
  id: number;
  username: string;
  password: string;
};
