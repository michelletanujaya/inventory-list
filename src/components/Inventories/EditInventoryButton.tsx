import { useState } from "react";
import { Pencil } from "../../ui/icons";
import InventoryModal from "./InventoryModal";
import { Inventory } from "../../lib/supabase";
import { useProjectId } from "../../hooks/useProjectId";
import { usePermissions } from "../../hooks/usePermissions";
import Button from "../../ui/Button";

interface EditInventoryButtonProps {
  inventory: Inventory;
}

const EditInventoryButton = ({ inventory }: EditInventoryButtonProps) => {
  const projectId = useProjectId();
  const { data: permissions } = usePermissions(projectId);
  const [open, setOpen] = useState(false);

  if (!permissions?.can_update) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <InventoryModal
        isOpen={open}
        inventory={inventory}
        onClose={() => setOpen(false)}
        title="Edit Inventory"
        projectId={projectId}
      />
    </>
  );
};

export default EditInventoryButton;
