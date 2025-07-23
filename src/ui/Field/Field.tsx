import styled from "styled-components";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 120px;

  @media (min-width: 640px) {
    width: 150px;
    flex-shrink: 0;
  }
`;

interface FieldProps {
  children: React.ReactNode;
  label: string;
  name: string;
}

const Field = ({ children, label, name }: FieldProps) => {
  return (
    <StyledField>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {children}
    </StyledField>
  );
};

export default Field;
