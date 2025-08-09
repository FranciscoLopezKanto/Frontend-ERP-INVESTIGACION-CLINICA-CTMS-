import { TextField, Autocomplete } from '@mui/material';
import { Paciente } from '../../../pacientes/types';

interface Props {
  pacientes: Paciente[];
  codigoRandomizado: string;
  setCodigoRandomizado?: (v: string) => void;
  nombrePaciente: string;
  setNombrePaciente: (v: string) => void;
  referenciaId: string;
  setReferenciaId: (v: string) => void;
  codigoEstudio: string;
  setCodigoEstudio: (v: string) => void;
  esManual: boolean;
  setEsManual: (v: boolean) => void;
  estudios?: { id: string; codigo: string }[];
}

export const VisitaPacienteForm = ({
  pacientes,
  codigoRandomizado,
  setCodigoRandomizado,
  nombrePaciente,
  setNombrePaciente,
  referenciaId,
  setReferenciaId,
  codigoEstudio,
  setCodigoEstudio,
  esManual,
  setEsManual,
  estudios = [],
}: Props) => {
  const opcionesPacientes = [
    { nombre: 'N/A', codigo: 'N/A', estudioId: '', _id: 'na' } as Paciente,
    ...pacientes,
  ];

  return (
    <>
      <Autocomplete
        options={opcionesPacientes}
        getOptionLabel={(option) =>
          option.codigo === 'N/A'
            ? 'N/A (No screeneado)'
            : `${option.nombre} (${option.codigo}) (${option.codigoRandomizado ?? '-'})`
        }
        value={opcionesPacientes.find((p) => p.codigo === referenciaId) || null}  // ✅ Preselección correcta
        onChange={(_, selectedPaciente) => {
          if (selectedPaciente?.codigo === 'N/A') {
            setNombrePaciente('');
            setCodigoEstudio('');
            setEsManual(true);
            setReferenciaId('');
            setCodigoRandomizado?.('');
          } else if (selectedPaciente) {
            setReferenciaId(selectedPaciente.codigo ?? '');
            setCodigoRandomizado?.(selectedPaciente.codigoRandomizado ?? '');
            setCodigoEstudio(selectedPaciente.estudioId || '');
            setNombrePaciente(selectedPaciente.nombre ?? '');
            setEsManual(false);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Seleccionar paciente" margin="normal" fullWidth />
        )}
      />


      {esManual ? (
        <>
          <TextField
            label="Nombre del paciente"
            fullWidth
            margin="normal"
            value={nombrePaciente}
            onChange={(e) => {
              const nuevoNombre = e.target.value;
              setNombrePaciente(nuevoNombre);
              setReferenciaId(nuevoNombre);
            }}
          />

          <Autocomplete
            options={estudios}
            getOptionLabel={(option) => option.codigo}
            value={estudios.find((e) => e.codigo === codigoEstudio) || null}
            onChange={(_, selected) => {
              if (selected) {
                setCodigoEstudio(selected.codigo);
              } else {
                setCodigoEstudio('');
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Código del estudio" margin="normal" fullWidth />
            )}
          />
        </>
      ) : (
        <>
          <TextField label="Código Screening" fullWidth margin="normal" value={referenciaId} disabled />
          <TextField label="Código Randomizado" fullWidth margin="normal" value={codigoRandomizado} disabled />
          <TextField label="Código del estudio" fullWidth margin="normal" value={codigoEstudio} disabled />
        </>
      )}
    </>
  );
};
