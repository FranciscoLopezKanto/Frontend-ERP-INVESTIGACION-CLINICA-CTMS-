import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Estudio } from '../../types';

interface Props {
  estudio: Estudio;
}

export default function AcordeonEstudio({ estudio }: Props) {
  return (
    <Box mt={4}>
      {/* STAFF */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Ver Staff</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {estudio.equipo?.map((persona, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemText
                  primary={persona.nombre}
                  secondary={`Rol: ${persona.rol}`}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* MONITORES */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Ver Monitores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {estudio.agentes?.map((monitor, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemText
                  primary={monitor.name}
                  secondary={
                    <>
                      <div>Email: {monitor.email}</div>
                      {monitor.phone_number && <div>Teléfono: {monitor.phone_number}</div>}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* DOCUMENTOS */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Ver Documentos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {estudio.documentos?.length ? (
            <List>
              {estudio.documentos.map((doc, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemText
                    primary={doc.nombre}
                    secondary={`Versión: ${doc.version || '-'} | Fecha: ${doc.fecha || '-'}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No hay documentos registrados.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
