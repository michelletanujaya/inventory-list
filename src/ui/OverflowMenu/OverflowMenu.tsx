import React, { useState, useRef, useEffect } from "react";
import IconButton from "../IconButton";
import { MoreVertical } from "../icons";
import {
  StyledMenuDropdown,
  StyledMenuItem,
  StyledMenuSeparator,
  StyledOverflowMenu,
} from "./styles";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface OverflowMenuProps {
  items: MenuItem[];
  triggerIcon?: React.ReactNode;
  triggerSize?: "x-small" | "small" | "medium" | "large";
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  disabled?: boolean;
  className?: string;
}

export const OverflowMenu: React.FC<OverflowMenuProps> = ({
  items,
  triggerIcon = <MoreVertical />,
  triggerSize = "medium",
  placement = "bottom-end",
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen]);

  const visibleItems = items.filter(
    (item) => item.id !== "separator" || item.label === "---"
  );

  return (
    <StyledOverflowMenu className={className}>
      <IconButton
        aria-label="Open menu"
        icon={triggerIcon}
        ref={triggerRef}
        size={triggerSize}
        variant="ghost"
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      />

      {isOpen && (
        <StyledMenuDropdown ref={menuRef} placement={placement} role="menu">
          {visibleItems.map((item, index) => {
            if (item.label === "---") {
              return <StyledMenuSeparator key={`separator-${index}`} />;
            }

            return (
              <StyledMenuItem
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                destructive={item.destructive}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
              >
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                <span className="menu-label">{item.label}</span>
              </StyledMenuItem>
            );
          })}
        </StyledMenuDropdown>
      )}
    </StyledOverflowMenu>
  );
};
