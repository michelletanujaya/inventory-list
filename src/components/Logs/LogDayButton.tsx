import { useState } from "react";
import Button from "../../ui/Button";
import LogDayModal from "./LogDayModal";
import styled from "styled-components";

const StyledLogDayButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LogDayButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogDay = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledLogDayButton>
      <Button onClick={handleLogDay}>Log day</Button>
      <LogDayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </StyledLogDayButton>
  );
};

export default LogDayButton;
