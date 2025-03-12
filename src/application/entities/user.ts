import { Replace } from "@helpers/replace"
import { randomUUID } from "node:crypto"
export interface UserModel {
  name: string
  email: string
  password: string
  balance?: number | null
  createdAt: Date
}

export class User {
  private _id: string;
  private props: UserModel;

  constructor(
    props: Replace<UserModel, { balance?: number, createdAt?: Date }>,
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

  public set balance(balance: number) {
    this.props.balance = balance;
  }

  public get balance(): number {
    return this.props.balance ?? 0;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public increase(amount: number) {
    this.props.balance = (this.props.balance ?? 0) + amount;
  }

  public decrease(amount: number) {
    this.props.balance = (this.props.balance ?? 0) - amount;
  }
}
