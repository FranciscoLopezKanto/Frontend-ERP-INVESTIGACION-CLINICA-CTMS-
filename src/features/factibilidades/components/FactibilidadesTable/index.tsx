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
import { Factibilidad } from '../../services/FactibilidadesService/types';
import { startCase, toLower } from 'lodash';
import { HoverRow } from '../../../users/List/UsersTable/styles';
const formatearFechaLarga = (fecha: string | undefined | null) => {
  if (!fecha) return '-';
  return new Date(fecha).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
type Props = {
  data: Factibilidad[];
  search: string;
  filtro: string;
};

export default function PropuestasTable({ data, search, filtro }: Props) {
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

  const filtered = data
  .filter((fact) =>
    fact.code.toLowerCase().includes(search.toLowerCase()) ||
    fact.sponsorName.toLowerCase().includes(search.toLowerCase()) ||
    fact.feasibilityStatus?.toLowerCase().includes(search.toLowerCase()) ||
    fact.area?.toLowerCase().includes(search.toLowerCase()) 
  )
  .filter((fact) =>
    filtro === 'Todos'
      ? true
      : (fact.feasibilityStatus || '').toLowerCase() === filtro.toLowerCase()
  );

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Código Estudio</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Nombre del Sponsor</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Factibilidad</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Interés</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Correo Inicial</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((fact) => (
              <HoverRow
                key={fact._id}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/factibilidades/${fact._id}`)}
              >
                <TableCell sx={{ px: 3 }}>{fact.code}</TableCell>
                <TableCell sx={{ px: 3 }}>{fact.sponsorName}</TableCell>
                <TableCell sx={{ px: 3 }}>{fact.feasibilityValue}</TableCell>
                <TableCell sx={{ px: 3 }}>{fact.interest}</TableCell>
                <TableCell sx={{ px: 3 }}>{formatearFechaLarga(fact.initialEmail)}</TableCell>
                <TableCell sx={{ px: 3 }}>
                  {startCase(toLower(fact.feasibilityStatus) || '-')}
                </TableCell>
                <TableCell sx={{ px: 3 }}>{fact.area || 'No Definido'}</TableCell>
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
