import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';
import colors from '../../../../../types/colores';
import { transparentize } from 'polished';

export const HeaderCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
}));

export const HoverRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: transparentize(0.9, colors.deepBlueV2),
  },
}));
