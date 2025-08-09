import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../../../api/users/types';
import { getRoleLabel } from '../../../utils';
import { HeaderCell, HoverRow } from './styles';

interface UsersTableProps {
  data: IUser[];
}

export default function UsersTable({ data }: UsersTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginated = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell sx={{ fontWeight: 'bold' }}>Nombre</HeaderCell>
              <HeaderCell sx={{ fontWeight: 'bold' }}>Correo</HeaderCell>
              <HeaderCell sx={{ fontWeight: 'bold' }}>Área</HeaderCell>
              <HeaderCell sx={{ fontWeight: 'bold' }}>Cargo</HeaderCell>
              <HeaderCell sx={{ fontWeight: 'bold' }}>Rol</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((user) => (
              <HoverRow
                key={user._id}
                onClick={() => navigate(`/colaboradores/${user._id}`)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.area}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{getRoleLabel(user.role)}</TableCell>
              </HoverRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </>
  );
}
