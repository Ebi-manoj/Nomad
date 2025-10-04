import { Email } from '../value-objects/email';
import { Mobile } from '../value-objects/mobile';

export interface UserProps {
  id?: string;
  fullName: string;
  email: Email;
  mobile?: Mobile;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly id?: string;
  private fullName: string;
  private email: Email;
  private mobile: Mobile | null;
  private password: string | null;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.mobile = props.mobile || null;
    this.password = props.password || null;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this.id;
  }

  getFullName() {
    return this.fullName;
  }
  getEmail() {
    return this.email.getValue();
  }

  getMobile() {
    return this.mobile && this.mobile.getValue();
  }
  getPassword() {
    return this.password;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.createdAt;
  }
  setPassword(newPassword: string) {
    this.password = newPassword;
  }
}
