import { SubscriptionFeatures } from './Subscription';

export type Pricing = {
  monthly: number;
  yearly: number;
};

export type StripeIds = {
  monthly: string;
  yearly: string;
};

export interface SubscriptionPlanProps {
  id?: string;
  tier: string;
  description: string;
  badgeColor: string;
  displayOrder: number;
  features: SubscriptionFeatures;
  price: Pricing;
  stripeId: StripeIds;
  isActive?: boolean;
  isDeleted?: boolean;
  isPopular?: boolean;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export class SubscriptionPlan {
  private _id?: string;
  private _tier: string;
  private _description: string;
  private _badgeColor: string;
  private _displayOrder: number;
  private _features: SubscriptionFeatures;
  private _price: Pricing;
  private _stripeId: StripeIds;
  private _isActive: boolean;
  private _isPopular: boolean;
  private _isDeleted: boolean;
  private readonly _isDefault: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SubscriptionPlanProps) {
    this._id = props.id;
    this._tier = this.initializeTier(props.tier);
    this._description = props.description;
    this._badgeColor = props.badgeColor;
    this._displayOrder = props.displayOrder;
    this._features = props.features;
    this._price = props.price;
    this._stripeId = props.stripeId;
    this._isActive = props.isActive ?? true;
    this._isPopular = props.isPopular ?? false;
    this._createdAt = props.createdAt || new Date();
    this._isDeleted = props.isDeleted || false;
    this._isDefault = props.isDefault || false;
    this._updatedAt = props.updatedAt || new Date();
  }
  initializeTier(tier: string) {
    return tier.toUpperCase();
  }

  getId() {
    return this._id;
  }
  getTier() {
    return this._tier;
  }
  getDescription() {
    return this._description;
  }
  getBadgeColor() {
    return this._badgeColor;
  }
  getDisplayOrder() {
    return this._displayOrder;
  }
  getFeatures() {
    return this._features;
  }
  getPrice() {
    return this._price;
  }
  getStripeId() {
    return this._stripeId;
  }
  getIsActive() {
    return this._isActive;
  }
  getIsPopular() {
    return this._isPopular;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getUpdatedAt() {
    return this._updatedAt;
  }
  getIsDefault() {
    return this._isDefault;
  }
  setTier(tier: string) {
    this._tier = tier;
  }
  setDescription(description: string) {
    this._description = description;
  }
  setBadgeColor(color: string) {
    this._badgeColor = color;
  }
  setDisplayOrder(order: number) {
    this._displayOrder = order;
  }
  setMonthlyPricing(price: number) {
    this._price.monthly = price;
  }
  setYearlyPricing(price: number) {
    this._price.yearly = price;
  }
  setPricing(price: Pricing) {
    this._price = price;
  }
  setPopular(popular: boolean) {
    this._isPopular = popular;
  }

  setFeatures(features: SubscriptionFeatures) {
    this._features = features;
  }
  toggleIsActive() {
    this._isActive = !this._isActive;
  }
  getIsDeleted() {
    return this._isDeleted;
  }
  delete() {
    this._isDeleted = true;
  }
}
