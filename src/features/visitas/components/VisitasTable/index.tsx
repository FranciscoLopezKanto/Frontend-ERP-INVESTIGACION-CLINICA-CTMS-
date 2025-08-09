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
import { Visita } from '../../types';
import { HoverRow } from '../../../users/List/UsersTable/styles';
import { capitaliceFirstLetter, formatFechaChile } from '../../utils';

type Props = {
  data: Visita[];
  filtro: string[];
  filtroTipo: string;
  search: string;
};

export default function VisitasTable({ data, search, filtro, filtroTipo }: Props) {
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
  .filter((v) => {
    const searchLower = search.toLowerCase();
    const tipoOriginal = v.entidad?.tipo?.toLowerCase();
    const tipoTraducido = tipoOriginal === 'sponsor' ? 'patrocinador' : tipoOriginal;

    return (
      (v.entidad?.nombre?.toLowerCase() || '').includes(searchLower) ||
      (v.entidad?.codigoEstudio?.toLowerCase() || 'no definido').includes(searchLower) ||
      (tipoOriginal || '').includes(searchLower) || // Permite buscar 'sponsor'
      (tipoTraducido || '').includes(searchLower)   // Permite buscar 'patrocinador'
    );
  })
  .filter((v) =>
    filtro.includes('Todos')
      ? true
      : filtro.map(f => f.toLowerCase()).includes(v.estado?.toLowerCase() || '')
  )
  .filter((v) =>
    filtroTipo === 'Todos' ? true : v.entidad?.tipo?.toLowerCase() === filtroTipo.toLowerCase()
  );


  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Código Estudio</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Tipo de Visita</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Motivo</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ px: 3, fontWeight: 'bold' }}>Fecha de la Visita</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((visita) => (
              <HoverRow
                key={visita._id}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/visitas/${visita._id}`)}
              >
                <TableCell sx={{ px: 3 }}> {visita.entidad?.codigoEstudio ?? "-"}</TableCell>
                <TableCell sx={{ px: 3 }}>
                    {visita.entidad?.tipo === 'paciente'
                      ? visita.entidad?.nombre  || '-'
                      : `${visita.entidad?.representante || '-'} - ${visita.entidad?.nombre  || '-'}`}
                </TableCell>

                <TableCell sx={{ px: 3 }}>{ capitaliceFirstLetter(visita.tipo) || 'No definido'}</TableCell>
                <TableCell sx={{ px: 3 }}>{visita.motivo || '-'}</TableCell>
                <TableCell sx={{ px: 3 }}>{capitaliceFirstLetter(visita.estado) || 'No definido'}</TableCell>
                <TableCell sx={{ px: 3 }}>
                    {formatFechaChile(visita.fechaProgramada)}
                </TableCell>
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
