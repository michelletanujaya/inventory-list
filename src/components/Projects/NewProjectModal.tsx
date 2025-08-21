import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../ui/Modal";
import { TextInput } from "../../ui/TextInput";
import Button from "../../ui/Button";
import styled from "styled-components";
import TextArea from "../../ui/TextArea";
import { useCreateProject } from "../../hooks/useProjects";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledAction = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectFormValues {
  name: string;
  description: string;
}

const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const createProject = useCreateProject();

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      await createProject.mutateAsync({
        name: data.name,
        description: data.description,
      });

      onHandleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onHandleClose} title="New Shop">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormFields>
          <TextInput
            type="text"
            placeholder="Shop Name"
            {...register("name", { required: true })}
            required
          />
          <TextArea
            placeholder="Description"
            rows={3}
            {...register("description")}
          />
        </StyledFormFields>
        <StyledAction>
          <Button
            type="button"
            variant="secondary"
            onClick={onHandleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </StyledAction>
      </Form>
    </Modal>
  );
};

export default NewProjectModal;
