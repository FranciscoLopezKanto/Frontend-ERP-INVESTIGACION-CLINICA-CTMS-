import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomButton from '../../../components/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Equipo } from '../types';

interface Props {
  equipo: Equipo[];
  onClickEditar: () => void;
}

export default function StaffInvestigacion({ equipo, onClickEditar }: Props) {
  const rolesFiltrados = [
    'Investigador Principal',
    'SubInvestigador',
    'Regulatorio',
    'Coordinador(a)',
    'Tens',
    'Data Entry',
  ];

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Staff de Investigación</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Documentos al día</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesFiltrados.flatMap((rol) =>
                equipo
                  ?.filter((miembro) => miembro.rol === rol)
                  .map((miembro, idx) => {
                    const documentos = (miembro as any).requiredDocuments || [];
                    return (
                      <TableRow key={`${rol}-${idx}`}>
                        <TableCell>{miembro.nombre}</TableCell>
                        <TableCell>{miembro.rol}</TableCell>
                        <TableCell>
                          <Box display="flex" flexDirection="row" gap={1}>
                            {['IATA', 'CV', 'GCP'].map((docName) => {
                              const doc = documentos.find((d: any) => d.name === docName);
                              const fecha = doc?.expirationDate ? new Date(doc.expirationDate) : null;
                              const hoy = new Date();

                              let icono = '📭'; // No subido
                              let texto = 'No subido O N/A';

                              if (fecha) {
                                const diff = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
                                if (diff >= 0) {
                                  icono = diff <= 30 ? '⏳' : '✅';
                                  texto = diff <= 30 ? `Vence en ${diff} días` : `Vence el ${fecha.toLocaleDateString()}`;
                                } else {
                                  icono = '❌';
                                  texto = `Vencido hace ${Math.abs(diff)} días`;
                                }
                              }

                              return (
                                <Box key={docName} display="flex" alignItems="center" gap={0.5}>
                                  <Typography title={texto}>
                                    {icono} {docName}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <CustomButton $variant="text" startIcon={<EditIcon />} onClick={onClickEditar}>
            {equipo?.length ? 'Actualizar equipo' : 'Asignar equipo'}
          </CustomButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}