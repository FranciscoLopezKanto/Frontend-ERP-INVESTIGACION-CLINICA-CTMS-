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
  Box,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomButton from '../../../components/Button';
import EditIcon from '@mui/icons-material/Edit';

interface Documento {
  nombre: string;
  version?: string;
  fecha?: string;
  url?: string;
}

interface Props {
  documentos: Documento[];
  onClickEditar: () => void;
}

export default function DocumentosEstudio({ documentos, onClickEditar }: Props) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Documentos Vigentes del Estudio</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Versión</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentos?.map((doc, idx) => (
                <Tooltip
                  key={idx}
                  title={
                    doc.url
                      ? 'Ir al documento'
                      : 'Documento sin URL subida'
                  }
                  arrow
                >
                  <TableRow
                    hover
                    onClick={() => {
                      if (doc.url) window.open(doc.url, '_blank');
                    }}
                    sx={{
                      cursor: doc.url ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: doc.url ? '#f0f0f0' : 'inherit',
                      },
                    }}
                  >
                    <TableCell>{doc.nombre}</TableCell>
                    <TableCell>{doc.version || 'No Especificada'}</TableCell>
                    <TableCell>{doc.fecha || 'No Especificada'}</TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
          <CustomButton onClick={onClickEditar} $variant="text" startIcon={<EditIcon />}>
            Editar Documentos
          </CustomButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
