// features/estudios/components/EstudiosTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Estudio } from '../../types';
import { HoverRow } from '../../../users/List/UsersTable/styles';

interface Props {
  estudios: Estudio[];
}

export default function EstudiosTable({ estudios }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginated = estudios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow >
                <TableCell sx={{ px: 3 }}><strong>Código</strong></TableCell>
                <TableCell sx={{ px: 3 }}><strong>Patología</strong></TableCell>
                <TableCell sx={{ px: 3 }}><strong>Estado Actual</strong></TableCell>
                <TableCell sx={{ px: 3 }}><strong>Investigador Principal</strong></TableCell>
                <TableCell sx={{ px: 3 }}><strong>Area</strong></TableCell>
                <TableCell sx={{ px: 3 }}><strong>Sponsor</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((estudio) => (
                <HoverRow
                  key={estudio._id}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/investigaciones/${estudio._id}`)}
                >
                  <TableCell sx={{ px: 3 }}>{estudio.protocolo}</TableCell>
                  <TableCell sx={{ px: 3 }}>{estudio.patologia || "No Definida"} </TableCell>
                  <TableCell sx={{ px: 3 }}>{estudio.estado}</TableCell>
                  <TableCell sx={{ px: 3 }}>{estudio.investigadorPrincipal}</TableCell>
                  <TableCell sx={{ px: 3 }}>{estudio.area || "No Definida"}</TableCell>
                  <TableCell sx={{ px: 3 }}>{estudio.sponsor}</TableCell>
                </HoverRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        component="div"
        count={estudios.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </>
  );
}
