import { styled } from "styled-components"
import fonts from "../../../types/fonts"
import colors from "../../../types/colores"
import { NavLink } from "react-router-dom"
import { DialogTitle, DialogContent } from '@mui/material';


export const Container = styled.aside<{ $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '48px' : '224px')};
  padding: 22px 16px;
  height: 100vh;
  border-right: 1px solid #eee;
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

export const Section = styled.div`
  margin-bottom: 32px;
`

export const SectionTitle = styled.h4`
  font-family: ${fonts.family.body};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  color: ${colors.grayStandard};
  margin-bottom: 12px;
`

export const ToggleButton = styled.button<{ $collapsed?: boolean }>`    display: flex;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'flex-start' : 'flex-end')};
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  cursor: pointer;
  color: ${colors.grayStandard};
  background-color: transparent;
  width: 100%;
  border: none;

  &:hover {
    background-color: rgba(0, 151, 178, 0.1);
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;


export const MenuButton = styled(NavLink)<{ $active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.family.body};
  font-size: 15px;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  color: ${colors.grayStandard};
  text-decoration: none;
  background-color: ${({ $active }) => ($active ? 'rgba(0, 151, 178, 0.1)' : 'transparent')};

  &:hover {
    background-color: rgba(0, 151, 178, 0.1);
  }

  &.active {
    background-color: rgba(0, 151, 178, 0.2);
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

export const LogOutButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.family.body};
  font-size: 15px;
  padding: 10px 12px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  color: ${colors.grayStandard};
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(0, 151, 178, 0.1);
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

export const CustomDialogTitle = styled(DialogTitle)`
    font-family: ${fonts.family.heading};
  font-size: 20px;
  font-weight: bold;
  color: #0097B2;
`;

export const CustomDialogContent = styled(DialogContent)`
font-family: ${fonts.family.body};
  font-size: 16px;
  color: #444;
`;
