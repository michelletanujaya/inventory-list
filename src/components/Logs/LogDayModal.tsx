import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useForm } from "react-hook-form";
import Field from "../../ui/Field";
import { TextInput } from "../../ui/TextInput";
import { useCreateLog } from "../../hooks/useLogs";
import { useToast } from "../../ui/Toast";
import { Alert } from "../../ui/Alert";
import { useState, useEffect } from "react";
import { useInventories } from "../../hooks/useInventories";
import { getLogByDate } from "../../services/logs";
import { useRouter } from "next/router";
import { StockRow } from "../StocksTable/columns";
import StocksTable from "../StocksTable/StocksTable";
import { StockFormValues, StocksValue } from "../Stocks/Stocks";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface LogDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const LogDayModal = ({ isOpen, onClose, projectId }: LogDayModalProps) => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [date, setDate] = useState<string>("");
  const [showLogForm, setShowLogForm] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { data: inventories } = useInventories(projectId);

  const getDefaultValues = (): StockFormValues => {
    const stocks: StocksValue = {};
    if (inventories) {
      inventories.forEach((inventory) => {
        stocks[inventory.id] = {
          quantityAdded: 0,
          quantitySold: 0,
        };
      });
    }
    return {
      stocks,
    };
  };

  const form = useForm<StockFormValues>({
    defaultValues: getDefaultValues(),
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues());
    }
  }, [isOpen, reset]);

  const onHandleClose = () => {
    setShowLogForm(false);
    setDate("");
    reset();
    onClose();
  };

  const createLog = useCreateLog(projectId);

  const onHandleNext = async () => {
    setIsError(false);

    // if date is already in the database, don't add it again
    const existingLog = await getLogByDate(date);

    if (existingLog.length > 0) {
      setIsError(true);
      return;
    }
    setShowLogForm(true);
  };

  const onHandleSubmit = async (data: StockFormValues) => {
    const { stocks } = data;
    try {
      await Promise.all(
        Object.entries(stocks).map(async ([inventoryId, stock]) => {
          return createLog.mutateAsync({
            inventory_id: inventoryId,
            add_quantity: stock.quantityAdded ?? 0,
            sold_quantity: stock.quantitySold ?? 0,
            date: date,
            project_id: projectId,
          });
        })
      );

      showSuccess(`Log entries created for ${date}!`);
      onHandleClose();
    } catch (error) {
      showError("Failed to create log entries");
      console.error("Error creating logs:", error);
    }
  };

  // showSuccess(`Log entries created for!`);
  const hasInventories = inventories && inventories.length > 0;

  // Prepare table data for StocksTable
  const tableData: StockRow[] =
    inventories?.map((inventory) => ({
      id: inventory.id,
      name: inventory.name,
      quantityAdded: 0, // Default value for new logs
      quantitySold: 0, // Default value for new logs
      control: control,
    })) ?? [];

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
          {showLogForm ? (
            hasInventories ? (
              <Button
                variant="primary"
                type="submit"
                form="log-day-form"
                isLoading={createLog.isPending}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="secondary"
                type="button"
                onClick={() => router.push(`/project/${projectId}/inventories`)}
              >
                Go to Inventories
              </Button>
            )
          ) : (
            <Button
              variant="primary"
              type="button"
              isLoading={createLog.isPending}
              onClick={onHandleNext}
            >
              Next
            </Button>
          )}
        </>
      }
    >
      {showLogForm ? (
        <StyledForm id="log-day-form" onSubmit={handleSubmit(onHandleSubmit)}>
          {hasInventories ? (
            <StocksTable data={tableData} isEditing={true} />
          ) : (
            <Alert
              title="No inventories yet"
              variant="info"
              message="You need to create some inventory items before you can log daily activities."
            />
          )}
        </StyledForm>
      ) : (
        <Field label="Date" name="date">
          <TextInput
            id="logDate"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Field>
      )}
      {isError && (
        <Alert title="Log for this day is already exists" variant="error" />
      )}
    </Modal>
  );
};

export default LogDayModal;
