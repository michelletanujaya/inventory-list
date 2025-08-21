import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import Modal from "../../ui/Modal";
import { TextInput } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { useToast } from "../../ui/Toast";
import { useForm } from "react-hook-form";

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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user?.user_metadata?.first_name || "",
      lastName: user?.user_metadata?.last_name || "",
    },
  });

  // Reset form values when modal opens/closes or user changes
  React.useEffect(() => {
    reset({
      firstName: user?.user_metadata?.first_name || "",
      lastName: user?.user_metadata?.last_name || "",
    });
  }, [isOpen, user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          display_name: `${data.firstName} ${data.lastName}`.trim(),
        },
      });

      if (error) {
        showToast(error.message, "error");
      } else {
        showToast("Profile updated successfully!", "success");
        onClose();
      }
    } catch (error) {
      showToast("Failed to update profile", "error");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onHandleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onHandleClose} title="Edit Profile">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormFields>
          <TextInput
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
            required
          />
          <TextInput
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            required
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
            Save
          </Button>
        </StyledAction>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
