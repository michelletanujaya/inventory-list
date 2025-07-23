import { useState } from "react";
import { IconButton } from "../../ui/IconButton";
import { Pencil } from "../../ui/icons";
import InventoryModal from "./InventoryModal";
import { Inventory } from "../../lib/supabase";

interface EditTypeButtonProps {
  inventory: Inventory;
}

const EditTypeButton = ({ inventory }: EditTypeButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Edit"
        icon={<Pencil />}
        onClick={() => setOpen(true)}
        size="small"
      />
      <InventoryModal
        isOpen={open}
        inventory={inventory}
        onClose={() => setOpen(false)}
        title="Edit Inventory"
      />
    </>
  );
};

export default EditTypeButton;
