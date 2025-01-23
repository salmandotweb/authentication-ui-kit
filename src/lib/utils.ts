import { PlanFeatures } from "@/interfaces/billing";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return format(date, "MMM dd, yyyy");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export const getFeaturesList = (features: PlanFeatures): string[] => {
  return [
    `Collect ${features.maxEmails} Emails`,
    `${features.maxVerifications} Email Verifications`,
    `${features.maxEmailsSent} Email Sent Monthly`,
    `${features.maxContactLists} Contact List`,
    `${features.maxDomains} Domain Attach`,
    "No charge for duplicates",
    "Export Contacts to CSV",
    ...(features.hasPremiumSupport
      ? ["Premium Support"]
      : ["Standard Support"]),
    ...(features.hasApiAccess ? ["API Access"] : []),
  ];
};