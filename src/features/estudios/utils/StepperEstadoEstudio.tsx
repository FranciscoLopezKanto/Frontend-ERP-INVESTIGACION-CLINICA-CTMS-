import { Stepper, Step, StepLabel, Tooltip } from '@mui/material';
import { EstadoEstudio } from '../enums';

const colores = {
  completado: '#81C784', // verde claro
  enProceso: '#FFB74D',  // naranjo claro
  pendiente: '#E0E0E0',  // gris claro
};

interface Props {
  estadoActual: EstadoEstudio;
}

const pasos = Object.values(EstadoEstudio);

export default function StepperEstadoEstudio({ estadoActual }: Props) {
  const activeStep = pasos.findIndex((etapa) => etapa === estadoActual);

  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
      {pasos.map((label, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        const tooltipText = isActive
          ? 'En Proceso'
          : isCompleted
          ? 'Completado'
          : 'Pendiente';

        return (
          <Step key={label}>
            <Tooltip title={tooltipText} arrow>
              <StepLabel
                sx={{
                  '& .MuiStepIcon-root': {
                    color: colores.pendiente,
                  },
                  '& .MuiStepIcon-root.Mui-completed': {
                    color: colores.completado,
                  },
                  '& .MuiStepIcon-root.Mui-active': {
                    color: colores.enProceso,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Tooltip>
          </Step>
        );
      })}
    </Stepper>
  );
}