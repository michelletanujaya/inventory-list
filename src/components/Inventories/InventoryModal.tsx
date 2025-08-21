import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { TextInput } from "../../ui/TextInput";
import {
  useCreateInventory,
  useUpdateInventory,
} from "../../hooks/useInventories";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { Inventory, InventoryInsert } from "../../lib/supabase";
import Field from "../../ui/Field";
import { useToast } from "../../ui/Toast";
import { useEffect } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inventory?: Inventory;
  projectId: string;
}

const InventoryModal = ({
  isOpen,
  onClose,
  title,
  inventory,
  projectId,
}: InventoryModalProps) => {
  const { showSuccess, showError } = useToast();

  const getDefaultValues = (inventory: Partial<Inventory> | undefined) => {
    return {
      name: inventory?.name || "",
      price: inventory?.price || 0,
    };
  };

  const form = useForm<InventoryInsert>({
    defaultValues: getDefaultValues(inventory),
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(inventory));
    }
  }, [inventory, isOpen, reset]);

  const onHandleClose = () => {
    reset();
    onClose();
  };

  const createInventory = useCreateInventory(projectId, {
    onSuccess: () => {
      showSuccess("Inventory created successfully!");
      onHandleClose();
    },
    onError: () => {
      showError("Failed to create inventory");
    },
  });

  const updateInventory = useUpdateInventory(projectId, {
    onSuccess: () => {
      showSuccess("Inventory updated successfully!");
      onHandleClose();
    },
    onError: () => {
      showError("Failed to update inventory");
    },
  });

  const onHandleSubmit = async (data: InventoryInsert) => {
    const formData = {
      name: data.name,
      price: data.price,
      project_id: projectId,
    };

    console.log("formData", formData);

    if (inventory) {
      await updateInventory.mutateAsync({
        id: inventory.id,
        updates: formData,
      });
    } else {
      await createInventory.mutateAsync(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onHandleClose}
      title={title}
      actions={
        <Button
          type="submit"
          form="inventory-form"
          isLoading={createInventory.isPending || updateInventory.isPending}
        >
          {title}
        </Button>
      }
    >
      <StyledForm id="inventory-form" onSubmit={handleSubmit(onHandleSubmit)}>
        <Field label="Name" name="name">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => <TextInput label="Name" {...field} />}
          />
        </Field>
        <Field label="Price" name="price">
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <TextInput label="Price" type="number" {...field} />
            )}
          />
        </Field>
      </StyledForm>
    </Modal>
  );
};

export default InventoryModal;
