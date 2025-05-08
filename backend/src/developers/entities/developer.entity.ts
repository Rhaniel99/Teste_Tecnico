import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
const { nanoid } = require("nanoid");

@Entity() 
export class Developer {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dateOfBirth: Date;

    @BeforeInsert()
    generateId() {
        this.id = `dev_${nanoid()}`;
    }
}
