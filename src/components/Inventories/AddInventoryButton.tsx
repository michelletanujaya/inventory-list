import { useState } from "react";
import { Plus } from "../../ui/icons";
import Button from "../../ui/Button";
import InventoryModal from "./InventoryModal";
import { useProjectId } from "../../hooks/useProjectId";
import { usePermissions } from "../../hooks/usePermissions";

const AddInventoryButton = () => {
  const projectId = useProjectId();
  const { data: permissions } = usePermissions(projectId);
  const [open, setOpen] = useState<boolean>(false);

  if (!(permissions?.can_add || permissions?.is_admin)) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} icon={<Plus />}>
        Add inventory
      </Button>
      <InventoryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        projectId={projectId}
        title="Add Inventory"
      />
    </>
  );
};

export default AddInventoryButton;
