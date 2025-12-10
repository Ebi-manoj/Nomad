export interface SosContactProps {
  id?: string;
  userId: string;
  name: string;
  phone: string;
  email?: string;
  relation?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SosContact {
  private readonly id?: string;
  private readonly userId: string;
  private readonly name: string;
  private readonly phone: string;
  private readonly email?: string;
  private readonly relation?: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: SosContactProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.phone = props.phone;
    this.email = props.email;
    this.relation = props.relation;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.name;
  }

  getPhone() {
    return this.phone;
  }

  getEmail() {
    return this.email;
  }

  getRelation() {
    return this.relation;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
