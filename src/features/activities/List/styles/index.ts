import { Box } from '@mui/material';
import styled from 'styled-components';
import colors from '../../../../types/colores';

export const ActivityCard = styled(Box)(() => ({
  border: `1px solid`,
  borderColor: colors.standardDarkBlue,
  backgroundColor: `${colors.standardLightBlue}22`, // con transparencia (~13%)
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '24px',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: `${colors.standardLightBlue}44` // mayor opacidad al pasar el mouse
  }
}));

import { Pagination } from '@mui/material';

export const ActivitiesPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: ${colors.standardDarkBlue};

    &:hover {
      background-color: ${colors.standardDarkBlue}22;
    }

    &.Mui-selected {
      background-color: ${colors.standardDarkBlue};
      color: white;

      &:hover {
        background-color: ${colors.standardDarkBlue};
      }
    }
  }
`;