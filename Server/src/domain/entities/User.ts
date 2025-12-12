import { Email } from '../value-objects/email';
import { Mobile } from '../value-objects/mobile';

export interface UserProps {
  id?: string;
  fullName: string;
  email: Email;
  mobile?: Mobile;
  password?: string;
  role: string;
  isBlocked: boolean;
  aadhaarVerified: boolean;
  licenceVerified: boolean;
  rating?: number;
  ratingCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly _id?: string;
  private _fullName: string;
  private _email: Email;
  private _mobile: Mobile | null;
  private _password: string | null;
  private _role: string;
  private _isBlocked: boolean;
  private _aadhaarVerified: boolean;
  private _licenceVerified: boolean;
  private _rating: number;
  private _ratingCount: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProps) {
    this._id = props.id;
    this._fullName = props.fullName;
    this._email = props.email;
    this._mobile = props.mobile || null;
    this._password = props.password || null;
    this._role = props.role;
    this._isBlocked = props.isBlocked || false;
    this._aadhaarVerified = props.aadhaarVerified || false;
    this._licenceVerified = props.licenceVerified || false;
    this._rating = props.rating || 0;
    this._ratingCount = props.ratingCount || 0;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this._id;
  }

  getFullName() {
    return this._fullName;
  }
  getEmail() {
    return this._email.getValue();
  }

  getMobile() {
    return this._mobile && this._mobile.getValue();
  }
  getPassword() {
    return this._password;
  }
  getRole() {
    return this._role;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getUpdatedAt() {
    return this._createdAt;
  }
  getIsBlocked() {
    return this._isBlocked;
  }
  setPassword(newPassword: string) {
    this._password = newPassword;
  }
  toggleIsBlocked() {
    this._isBlocked = !this._isBlocked;
  }
  getAadhaarVerified() {
    return this._aadhaarVerified;
  }
  getLicenceVerified() {
    return this._licenceVerified;
  }
  getIsVerifed() {
    return this._licenceVerified && this._aadhaarVerified;
  }
  setAadhaarVerified(data: boolean) {
    this._aadhaarVerified = data;
  }
  setLicenceVerified(data: boolean) {
    this._licenceVerified = data;
  }
  getRating() {
    return this._rating;
  }
  getRatingCount() {
    return this._ratingCount;
  }
  updateRatings(newRating: number) {
    const totalRating = this._rating * this._ratingCount + newRating;
    this._ratingCount++;
    this._rating = Number((totalRating / this._ratingCount).toFixed(1));
    this._updatedAt = new Date();
  }
}
