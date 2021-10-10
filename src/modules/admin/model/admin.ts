// import { Entity } from "typeorm";

import { Entity } from "typeorm";

// @Entity()
@Entity()
export class Admin {
  id: number;
  username: string;
  password: string;
};
