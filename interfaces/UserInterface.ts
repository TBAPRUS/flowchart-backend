import {Optional } from "sequelize";

export interface UserAttributes {
    readonly SALT_LEN?: number;

    id: number;
    username: string;
    email: string;
    password: string;

    getSignedJwtToken: () => string;
    matchPassword: (password: string) => Promise<boolean>;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}