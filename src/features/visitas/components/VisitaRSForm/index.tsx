import { TextField, Autocomplete } from '@mui/material';

interface Props {
  institucion: string;
  setInstitucion: (v: string) => void;
  representante: string;
  setRepresentante: (v: string) => void;
  referenciaId: string;
  setReferenciaId: (v: string) => void;
  estudios?: { id: string; codigo: string }[]; // 👈 nuevo prop
}

export const VisitaRSForm = ({
  institucion,
  setInstitucion,
  representante,
  setRepresentante,
  referenciaId,
  setReferenciaId,
  estudios = [],
}: Props) => (
  <>
    <TextField
      label="Institución / Sponsor"
      fullWidth
      margin="normal"
      value={institucion}
      onChange={(e) => setInstitucion(e.target.value)}
    />

    <TextField
      label="Nombre del representante"
      fullWidth
      margin="normal"
      value={representante}
      onChange={(e) => setRepresentante(e.target.value)}
    />

    <Autocomplete
      options={estudios}
      getOptionLabel={(option) => option.codigo}
      value={estudios.find((e) => e.codigo === referenciaId) || null}
      onChange={(_, selected) => {
        if (selected) {
          setReferenciaId(selected.codigo);
        } else {
          setReferenciaId('');
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Código del estudio" margin="normal" fullWidth />
      )}
    />
  </>
);
