export interface InventoryItem {
  id: string;
  name: string;
  price: number;
}

export const inventoryTypes: InventoryItem[] = [
  {
    id: "beefMayo",
    name: "Beef Mayo",
    price: 10,
  },
  {
    id: "beefMentai",
    name: "Beef Mentai",
    price: 10,
  },
  {
    id: "bolognese",
    name: "Bolognese",
    price: 10,
  },
  {
    id: "kani",
    name: "Kani",
    price: 10,
  },
  {
    id: "kornet",
    name: "Kornet",
    price: 10,
  },
  {
    id: "ragout",
    name: "Ragout",
    price: 10,
  },
  {
    id: "saltedEgg",
    name: "Salted Egg",
    price: 10,
  },
  {
    id: "truffle",
    name: "Truffle",
    price: 10,
  },
];
