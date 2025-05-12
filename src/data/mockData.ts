import { ItemCategory, ShoppingItem, ShoppingList, User } from "../types";

// Mock current user
export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
};

// Mock users for sharing
export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

// Mock shopping items
export const generateItems = (listId: string): ShoppingItem[] => {
  const items: Record<string, ShoppingItem[]> = {
    "list-1": [
      {
        id: "item-1",
        name: "Milk",
        quantity: 2,
        price: 3.99,
        category: ItemCategory.DAIRY,
        purchased: false,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000),
      },
      {
        id: "item-2",
        name: "Bread",
        quantity: 1,
        price: 2.49,
        category: ItemCategory.BAKERY,
        purchased: true,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000 * 2),
      },
      {
        id: "item-3",
        name: "Eggs",
        quantity: 12,
        price: 4.99,
        category: ItemCategory.GROCERIES,
        purchased: false,
        addedBy: "user-2",
        addedAt: new Date(Date.now() - 86400000 * 3),
      },
    ],
    "list-2": [
      {
        id: "item-4",
        name: "Shampoo",
        quantity: 1,
        price: 7.99,
        category: ItemCategory.HYGIENE,
        purchased: false,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000),
      },
      {
        id: "item-5",
        name: "Toothpaste",
        quantity: 2,
        price: 3.49,
        category: ItemCategory.HYGIENE,
        purchased: false,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000 * 2),
      },
    ],
    "list-3": [
      {
        id: "item-6",
        name: "Chicken Breast",
        quantity: 500,
        price: 9.99,
        category: ItemCategory.MEAT,
        purchased: false,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000),
      },
      {
        id: "item-7",
        name: "Rice",
        quantity: 1,
        price: 2.99,
        category: ItemCategory.GROCERIES,
        purchased: true,
        addedBy: "user-3",
        addedAt: new Date(Date.now() - 86400000 * 2),
      },
      {
        id: "item-8",
        name: "Tomatoes",
        quantity: 5,
        price: 3.49,
        category: ItemCategory.FRESH_PRODUCTS,
        purchased: false,
        addedBy: "user-1",
        addedAt: new Date(Date.now() - 86400000 * 3),
      },
    ],
  };

  return items[listId] || [];
};

// Calculate the total estimated cost
const calculateTotalCost = (items: ShoppingItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Mock shopping lists
export const shoppingLists: ShoppingList[] = [
  {
    id: "list-1",
    name: "Weekly Groceries",
    description: "Regular items for the week",
    createdAt: new Date(Date.now() - 86400000 * 7),
    updatedAt: new Date(Date.now() - 86400000),
    items: generateItems("list-1"),
    ownerId: "user-1",
    sharedWith: ["user-2"],
    archived: false,
    totalEstimatedCost: calculateTotalCost(generateItems("list-1")),
  },
  {
    id: "list-2",
    name: "Bathroom Supplies",
    description: "Monthly bathroom essentials",
    createdAt: new Date(Date.now() - 86400000 * 14),
    updatedAt: new Date(Date.now() - 86400000 * 2),
    items: generateItems("list-2"),
    ownerId: "user-1",
    sharedWith: [],
    archived: false,
    totalEstimatedCost: calculateTotalCost(generateItems("list-2")),
  },
  {
    id: "list-3",
    name: "Dinner Party",
    description: "Items for Saturday's dinner party",
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(),
    items: generateItems("list-3"),
    ownerId: "user-1",
    sharedWith: ["user-2", "user-3"],
    archived: false,
    totalEstimatedCost: calculateTotalCost(generateItems("list-3")),
  },
];

// Mock archived lists
export const archivedLists: ShoppingList[] = [
  {
    id: "list-4",
    name: "Camping Trip",
    description: "Supplies for summer camping",
    createdAt: new Date(Date.now() - 86400000 * 90),
    updatedAt: new Date(Date.now() - 86400000 * 85),
    items: [],
    ownerId: "user-1",
    sharedWith: ["user-3"],
    archived: true,
    totalEstimatedCost: 156.75,
  },
];

// Mock shopping history
export const shoppingHistory = {
  lists: [...archivedLists],
  totalSpent: 782.45,
  categorySummary: {
    [ItemCategory.GROCERIES]: 245.65,
    [ItemCategory.FRESH_PRODUCTS]: 123.45,
    [ItemCategory.DAIRY]: 89.99,
    [ItemCategory.BAKERY]: 56.78,
    [ItemCategory.MEAT]: 187.45,
    [ItemCategory.HYGIENE]: 45.67,
    [ItemCategory.HOUSEHOLD]: 33.46,
    [ItemCategory.OTHER]: 0,
  },
};