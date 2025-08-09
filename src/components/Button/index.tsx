import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../types/colores';
import { darken, transparentize } from 'polished';
import fonts from '../../types/fonts';
import { CircularProgress } from '@mui/material';

type Variant = 'contained' | 'outlined' | 'text';
type ColorType = 'primary' | 'secondary' | 'danger' | 'gray';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  $variant?: Variant;
  color?: ColorType;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const getColorStyles = (color: ColorType, variant: Variant) => {
  const colorsMain = {
    primary: colors.standardDarkBlue,
    secondary: transparentize(0.2, colors.standardDarkBlue),
    danger: '#d32f2f',
    gray: '#6c757d',
  };

  const base = colorsMain[color] || colorsMain.primary;

  if (variant === 'contained') {
    return css`
      background-color: ${base};
      color: white;
      border: none;

      &:hover {
        background-color: ${darken(0.1, base)};
      }
    `;
  }

  if (variant === 'outlined') {
    return css`
      background-color: transparent;
      color: ${base};
      border: 2px solid ${base};

      &:hover {
        background-color: ${base}22;
      }
    `;
  }

  return css`
    background-color: transparent;
    color: ${base};
    border: none;

    &:hover {
      text-decoration: underline;
    }
  `;
};

const StyledButton = styled.button.attrs(props => ({
  type: props.type ?? 'button', 
}))<CustomButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  padding: ${({ size }) => {
    if (size === 'small') return '6px 12px';
    if (size === 'large') return '12px 30px';
    return '10px 24px';
  }};
  
  font-family: ${fonts.family.body};
  font-weight: ${fonts.weight.medium};
  font-size: ${fonts.size.base};
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  ${({ color = 'primary', $variant = 'contained' }) => getColorStyles(color, $variant)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  color = 'primary',
  $variant = 'contained',
  size = 'medium',
  ...props
}) => {
  return (
    <StyledButton 
      color={color} 
      $variant={$variant} 
      size={size} 
      disabled={props.disabled || props.loading} 
      {...props}
      >
      {props.loading ? (
        <>
          <CircularProgress
            size={20}
            sx={{ color: 'white', marginRight: children ? 1 : 0 }}
          />
          {props.loadingText && <span style={{ marginLeft: 8}}>{props.loadingText}</span>}
        </>
      ) : (
        <>
          {props.startIcon && <span style={{ display: 'flex', marginRight: 8 }}>{props.startIcon}</span>}
          {children}
          {props.endIcon && <span style={{ display: 'flex', marginLeft: 8 }}>{props.endIcon}</span>}
      </>
      )}
    </StyledButton>
  );
};

export default CustomButton;
