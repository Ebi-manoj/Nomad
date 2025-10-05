import { Email } from '../value-objects/email';

export interface AdminProps {
  id?: string;
  email: Email;
  password: string;
}

export class Admin {
  private readonly id?: string;
  private readonly email: Email;
  private readonly password: string;

  constructor(props: AdminProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
  }
  getId() {
    return this.id;
  }
  getPassword() {
    return this.password;
  }
  getEmail() {
    return this.email.getValue();
  }
}
