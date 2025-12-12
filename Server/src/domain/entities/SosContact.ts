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
  private readonly _id?: string;
  private readonly _userId: string;
  private _name: string;
  private _phone: string;
  private _email?: string;
  private _relation?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SosContactProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._name = props.name;
    this._phone = props.phone;
    this._email = props.email;
    this._relation = props.relation;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this._id;
  }

  getUserId() {
    return this._userId;
  }

  getName() {
    return this._name;
  }

  getPhone() {
    return this._phone;
  }

  getEmail() {
    return this._email;
  }

  getRelation() {
    return this._relation;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }
  setEmail(email: string | undefined) {
    this._email = email;
  }
  setPhone(phone: string) {
    this._phone = phone;
  }
  setName(name: string) {
    this._name = name;
  }
  setRelation(relation: string | undefined) {
    this._relation = relation;
  }
  toJson() {
    return {
      id: this._id as string,
      name: this._name,
      phone: this._phone,
      email: this._email,
      relation: this._relation,
    };
  }
}
