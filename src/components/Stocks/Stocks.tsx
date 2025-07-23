import styled from "styled-components";
import Button from "../../ui/Button";
import { useInventories } from "../../hooks/useInventories";
import { useLogsByDate, useUpdateLog, useCreateLog } from "../../hooks/useLogs";
import { useForm } from "react-hook-form";
import { columns, StockRow } from "./columns";
import { useEffect, useState } from "react";
import { editableColumns } from "./editableColumns";
import { Inventory, Log } from "../../lib/supabase";
import StocksTable from "./StocksTable";
import { useToast } from "../Toast";

type StocksValue = Record<
  string,
  { quantityAdded: number; quantitySold: number }
>;

export interface StockFormValues {
  stocks: StocksValue;
}

const getDefaultValues = (inventories: Inventory[], logs: Partial<Log>[]) => {
  const stocks: StocksValue = {};
  inventories.forEach((inventory) => {
    const log = logs.find((log) => log.inventory_id === inventory.id);
    stocks[inventory.id] = {
      quantityAdded: log?.add_quantity ?? 0,
      quantitySold: log?.sold_quantity ?? 0,
    };
  });

  return {
    stocks,
  };
};

const StyledStocksForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

interface StocksProps {
  logDate: string;
}

const Stocks = ({ logDate }: StocksProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showSuccess, showError } = useToast();

  const { data: inventories } = useInventories();
  const { data: logs } = useLogsByDate(logDate);

  const form = useForm<StockFormValues>({
    defaultValues: getDefaultValues(inventories ?? [], logs ?? []),
  });

  useEffect(() => {
    form.reset(getDefaultValues(inventories ?? [], logs ?? []));
  }, [inventories, logs]);

  const { control, handleSubmit, reset } = form;

  const updateLog = useUpdateLog();
  const createLog = useCreateLog();

  const onCancel = () => {
    reset(getDefaultValues(inventories ?? [], logs ?? []));
    setIsEditing(false);
  };

  const onHandleSubmit = (data: StockFormValues) => {
    const { stocks } = data;
    try {
      Promise.all(
        Object.entries(stocks).map(([inventoryId, stock]) => {
          const log = logs?.find((log) => log.inventory_id === inventoryId);
          if (log) {
            return updateLog.mutateAsync({
              id: log.id!,
              updates: {
                add_quantity: stock.quantityAdded ?? 0,
                sold_quantity: stock.quantitySold ?? 0,
              },
            });
          } else {
            return createLog.mutateAsync({
              inventory_id: inventoryId,
              add_quantity: stock.quantityAdded ?? 0,
              sold_quantity: stock.quantitySold ?? 0,
              date: logDate,
            });
          }
        })
      );
      showSuccess("Stocks updated successfully!");
      setIsEditing(false);
    } catch (error) {
      showError("Error submitting form");
    }
  };

  const tableData: StockRow[] =
    inventories?.map((inventory) => ({
      id: inventory.id,
      name: inventory.name,
      quantityAdded:
        logs?.find((log) => log.inventory_id === inventory.id)?.add_quantity ??
        0,
      quantitySold:
        logs?.find((log) => log.inventory_id === inventory.id)?.sold_quantity ??
        0,
      control: control,
    })) ?? [];

  return (
    <StyledStocksForm onSubmit={handleSubmit(onHandleSubmit)}>
      <StyledActions>
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              type="button"
              disabled={updateLog.isPending || createLog.isPending}
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={updateLog.isPending || createLog.isPending}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        )}
      </StyledActions>
      <StocksTable
        data={tableData}
        isEditing={isEditing}
        editableColumns={editableColumns}
        columns={columns}
      />
    </StyledStocksForm>
  );
};

export default Stocks;
