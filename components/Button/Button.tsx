//* Refactored
import React, { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  style?: CSSProperties;
  children?: ReactNode;
}

export const GhostButton: React.FC<ButtonProps> = ({ style, children }) => {
  return (
    <button style={style} className='ghost-btn'>
      {children}
    </button>
  );
};

export const ContainedButton: React.FC<ButtonProps> = ({ style, children }) => {
  return (
    <button style={style} className='contained-btn'>
      {children}
    </button>
  );
};

export const GhostButtonSm: React.FC<ButtonProps> = ({ style, children }) => {
  return (
    <button style={style} className='ghost-btn ghost-btn--sm'>
      {children}
    </button>
  );
};

export const ContainedButtonSm: React.FC<ButtonProps> = ({ style, children }) => {
  return (
    <button style={style} className='contained-btn contained-btn--sm'>
      {children}
    </button>
  );
};
