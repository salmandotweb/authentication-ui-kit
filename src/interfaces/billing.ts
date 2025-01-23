export enum SubscriptionStatus {
   ACTIVE = 'active',
   CANCELLED = 'cancelled',
   PAST_DUE = 'past_due',
   PAUSED = 'paused',
   EXPIRED = 'expired'
}

export enum BillingInterval {
   MONTHLY = 'monthly',
   YEARLY = 'yearly',
   FREE = 'free'
}

export interface Subscription {
   id: string;
   paddleSubscriptionId: string | null;
   planId: string;
   status: SubscriptionStatus;
   nextBillDate: string;
   amount: number;
   currency: string;
   metadata?: Record<string, any>;
   billingInterval: BillingInterval;
   createdAt: string;
   updatedAt: string;
   cancelledAt?: string;
}

export enum PlanType {
   FREE = 'free',
   BASIC = 'basic',
   GROWTH = 'growth',
   BUSINESS = 'business'
}

export interface PlanFeatures {
   maxEmails: number;
   maxVerifications: number;
   maxEmailsSent: number;
   maxContactLists: number;
   maxDomains: number;
   hasApiAccess: boolean;
   hasPremiumSupport: boolean;
}

export interface PricingPlan {
   name: string;
   type: PlanType;
   description: string;
   monthlyPrice: number;
   yearlyPrice: number;
   monthlyPriceId?: string;
   yearlyPriceId?: string;
   features: PlanFeatures;
   popular?: boolean;
}

export interface SubscriptionWithPlan {
   subscription: Subscription;
   plan: PricingPlan;
}

export type PlanFeatureKey = keyof PlanFeatures;

export const isPlanAtLeast = (currentPlan: PlanType, requiredPlan: PlanType): boolean => {
   const planOrder = [PlanType.FREE, PlanType.BASIC, PlanType.GROWTH, PlanType.BUSINESS];
   return planOrder.indexOf(currentPlan) >= planOrder.indexOf(requiredPlan);
};

export const formatPrice = (price: number, currency: string = 'USD'): string => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
   }).format(price);
};

export const getBillingIntervalLabel = (interval: BillingInterval): string => {
   switch (interval) {
      case BillingInterval.MONTHLY:
         return '/month';
      case BillingInterval.YEARLY:
         return '/year';
      case BillingInterval.FREE:
         return '';
      default:
         return 'unknown';
   }
};

export enum TransactionStatus {
   COMPLETED = 'completed',
   REFUNDED = 'refunded',
   FAILED = 'failed'
}

export interface ITransaction {
   id: string;
   paddleTransactionId: string;
   amount: number;
   currency: string;
   status: TransactionStatus;
   createdAt: Date;
   subscription?: {
      id: string;
      planId: string;
      status: string;
   };
   metadata?: Record<string, any>;
}

export interface TransactionResponse {
   transactions: ITransaction[];
   total: number;
}

export interface UsageMetrics {
   emailsCollected: number;
   emailsVerified: number;
   emailsSent: number;
   contactListsCreated: number;
   domainsAttached: number;
   lastResetAt: Date;
}