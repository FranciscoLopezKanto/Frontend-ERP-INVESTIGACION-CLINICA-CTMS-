import styled from 'styled-components';
import fonts from '../../../../types/fonts';
import colors from '../../../../types/colores';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    color: 'black',
    WebkitTextFillColor: 'black',
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: 'black',
  },
}));

export const Title = styled.h1`
    font-family: ${fonts.family.heading};
    font-size: ${fonts.size.title};
    font-weight: ${fonts.weight.bold};
    color: ${colors.grayStandard};
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const ToggleBtn = styled.div`
  position: absolute;
  display: flex;
  right: 12px;
  bottom: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`

