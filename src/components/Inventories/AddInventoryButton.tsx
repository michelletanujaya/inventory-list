import { useState } from "react";
import { Plus } from "../../ui/icons";
import InventoryModal from "./InventoryModal";
import Button from "../../ui/Button";

const AddInventoryButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} icon={<Plus />}>
        Add inventory
      </Button>
      <InventoryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Inventory"
      />
    </>
  );
};

export default AddInventoryButton;
