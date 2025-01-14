import React, { MouseEvent } from 'react';
import styled from 'styled-components';

interface DefaultButtonProps {
  buttonType: 'follow' | 'following' | 'secondary' | 'active' | 'thirdly';
  size: 'small' | 'medium' | 'large';
  children?: string;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  font?: string;
}

const sizes = {
  small: { width: 120, height: 38, fontSize: 16 },
  medium: { width: 224, height: 56, fontSize: 24 },
  large: { width: 350, height: 85, fontSize: 32 },
};

const buttonTypes = {
  follow: {
    color: '#fff',
    fontColor: '#586A9A',
  },
  following: {
    color: '#586A9A',
    fontColor: '#fff',
  },
  secondary: {
    color: '#4A6970',
    fontColor: '#fff',
  },
  active: {
    color: '#58964F',
    fontColor: '#fff',
  },
  thirdly: {
    color: '#9AACA1',
    fontColor: '#fff',
  },
};

const CustomDefaultButton = styled.button`
  color: ${(props: DefaultButtonProps) => buttonTypes[props.buttonType].fontColor};
  background-color: ${(props: DefaultButtonProps) => buttonTypes[props.buttonType].color};
  width: ${(props: DefaultButtonProps) => sizes[props.size].width}px;
  height: ${(props: DefaultButtonProps) => sizes[props.size].height}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 20px;
  font-family: ${(props) => (props.font ? props.font : 'Bangers')};;
  font-size: ${(props: DefaultButtonProps) => sizes[props.size].fontSize}px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  
  &:hover {
    cursor: pointer;
  }
  
  &:disabled {
    cursor: default;
  }

`;

function DefaultButton({
  buttonType,
  children,
  size,
  isDisabled,
  onClick,
  font,
}: DefaultButtonProps) {
  return (
    <CustomDefaultButton
      type="button"
      buttonType={buttonType}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      font={font}
    >
      {children}
    </CustomDefaultButton>
  );
}

export default DefaultButton;
