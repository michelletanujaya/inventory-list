import {
  supabase,
  type Inventory,
  type InventoryInsert,
  type InventoryUpdate,
} from "../lib/supabase";

// Get all inventories
export const getInventories = async (): Promise<Inventory[]> => {
  const { data, error } = await supabase
    .from("inventories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

// Get inventory by ID
export const getInventoryById = async (
  id: string
): Promise<Inventory | null> => {
  const { data, error } = await supabase
    .from("inventories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Create new inventory
export const createInventory = async (
  inventory: InventoryInsert
): Promise<Inventory> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("inventories")
    .insert({ ...inventory, user_id: user?.id })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update inventory
export const updateInventory = async (
  id: string,
  updates: InventoryUpdate
): Promise<Inventory> => {
  const { data, error } = await supabase
    .from("inventories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete inventory
export const deleteInventory = async (id: string): Promise<void> => {
  const { error } = await supabase.from("inventories").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
