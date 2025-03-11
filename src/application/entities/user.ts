import { Replace } from "@helpers/replace"
import { randomUUID } from "node:crypto"
export interface UserModel {
  name: string
  email: string
  password: string
  balance?: string | null
  createdAt: Date
}

export class User {
  private _id: string;
  private props: UserModel;

  constructor(
    props: Replace<UserModel, { amount?: string, createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password() {
    return this.props.password;
  }

  public set balance(balance: string) {
    this.props.balance = balance;
  }

  public get balance(): string | null | undefined {
    return this.props.balance;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
