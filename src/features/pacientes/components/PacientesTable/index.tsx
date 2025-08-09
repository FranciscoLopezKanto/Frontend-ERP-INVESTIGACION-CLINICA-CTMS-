import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paciente } from '../../types';
import { startCase, toLower } from 'lodash';
import { HoverRow } from '../../../users/List/UsersTable/styles';

type Props = {
  data: Paciente[];
  search: string;
};

export default function PacientesTable({ data, search }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();


  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = (data || []).filter((p) => {
  if (!p || typeof p !== 'object') return false;

  const lowerSearch = (search ?? '').toString().toLowerCase();
  const nombre = typeof p.nombre === 'string' ? p.nombre.toLowerCase() : '';
  const codigo = typeof p.codigo === 'string' ? p.codigo.toLowerCase() : '';
  const estado = typeof p.estado === 'string' ? p.estado.toLowerCase() : '';

  return (
    nombre.includes(lowerSearch) ||
    codigo.includes(lowerSearch) ||
    estado.includes(lowerSearch)
  );
});


  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }}><strong>Screening</strong></TableCell>
              <TableCell sx={{ px: 3 }}><strong>Randomización</strong></TableCell>
              <TableCell sx={{ px: 3 }}><strong>Nombre Completo</strong></TableCell>
              <TableCell sx={{ px: 3 }}><strong>Estado Actual</strong></TableCell>
              <TableCell sx={{ px: 3 }}><strong>N° de Tomos </strong></TableCell>
              <TableCell sx={{ px: 3 }}><strong>Codigo de Estudio</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((p) => (
              <HoverRow
                key={p._id}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pacientes/${p._id}`)}
              >
                <TableCell sx={{ px: 3 }}>{p.codigo || '-'}</TableCell>
                <TableCell sx={{ px: 3 }}>{p.codigoRandomizado || 'No asignado'}</TableCell>
                <TableCell sx={{ px: 3 }}>{p.nombre || '-'}</TableCell> 
                <TableCell sx={{ px: 3 }}>
                  {p.estado ? startCase(toLower(p.estado)) : '-'}
                </TableCell>                
                <TableCell sx={{ px: 3 }}>{p.numerodeTomos || '-'}</TableCell>
                <TableCell sx={{ px: 3 }}>{p.estudioId || '-'}</TableCell>
              </HoverRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </>
  );
}
