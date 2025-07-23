import styled from "styled-components";
import Button from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { LogInsert } from "../../lib/supabase";
import Field from "../../ui/Field";
import { TextInput } from "../../ui/TextInput";
import { useCreateLog } from "../../hooks/useLogs";
import { useToast } from "../Toast";
import { Alert } from "../../ui/Alert";
import { useState, useEffect } from "react";
import { useInventories } from "../../hooks/useInventories";
import { getLogByDate } from "../../services/logs";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface LogDayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogDayModal = ({ isOpen, onClose }: LogDayModalProps) => {
  const { showSuccess, showError } = useToast();
  const [isError, setIsError] = useState<boolean>(false);

  const { data: inventories } = useInventories();

  const form = useForm<LogInsert>({
    defaultValues: { date: new Date().toISOString().slice(0, 10) },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onHandleClose = () => {
    reset();
    onClose();
  };

  const createLog = useCreateLog({
    onSuccess: () => {
      showSuccess("Log created successfully!");
      onHandleClose();
    },
    onError: () => {
      showError("Failed to create log");
    },
  });

  const onHandleSubmit = async (data: LogInsert) => {
    setIsError(false);

    // if date is already in the database, don't add it again
    const existingLog = await getLogByDate(data.date);

    if (existingLog.length > 0) {
      setIsError(true);
      return;
    }

    if (inventories) {
      await Promise.all(
        inventories.map(async (inventory) => {
          const formData = {
            date: data.date,
            inventory_id: inventory.id,
            add_quantity: 0,
            sold_quantity: 0,
          };
          await createLog.mutateAsync(formData);
        })
      );
    }
  };

  return (
    <Modal
      title="Log day"
      isOpen={isOpen}
      onClose={onHandleClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="log-day-form"
            isLoading={createLog.isPending}
          >
            Log day
          </Button>
        </>
      }
    >
      <StyledForm id="log-day-form" onSubmit={handleSubmit(onHandleSubmit)}>
        <Field label="Date" name="date">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextInput id="logDate" type="date" {...field} />
            )}
          />
        </Field>
      </StyledForm>
      {isError && (
        <Alert title="Log for this day is already exists" variant="error" />
      )}
    </Modal>
  );
};

export default LogDayModal;
