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
import { Agente } from '../types';

interface Props {
  agentes: Agente[];
  onClickEditar: () => void;
}

export default function Monitores({ agentes, onClickEditar }: Props) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Monitores</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentes?.map((agente, idx) => (
                <TableRow key={idx}>
                  <TableCell>{agente.name}</TableCell>
                  <TableCell>{agente.email}</TableCell>
                  <TableCell>{agente.phone_number || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <CustomButton $variant="text" startIcon={<EditIcon />} onClick={onClickEditar}>
            Editar monitores
          </CustomButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
