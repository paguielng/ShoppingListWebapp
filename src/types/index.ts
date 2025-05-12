export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: ItemCategory;
  purchased: boolean;
  addedBy: string;
  addedAt: Date;
}

export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  items: ShoppingItem[];
  ownerId: string;
  sharedWith: string[];
  archived: boolean;
  totalEstimatedCost: number;
}

export enum ItemCategory {
  GROCERIES = "Groceries",
  FRESH_PRODUCTS = "Fresh Products",
  DAIRY = "Dairy",
  BAKERY = "Bakery",
  MEAT = "Meat",
  HYGIENE = "Hygiene",
  HOUSEHOLD = "Household",
  OTHER = "Other"
}

export interface ShoppingHistory {
  lists: ShoppingList[];
  totalSpent: number;
  categorySummary: Record<ItemCategory, number>;
}