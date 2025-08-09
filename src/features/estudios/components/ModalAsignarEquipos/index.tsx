import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Grid,
  Tooltip,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { userService } from '../../../../api/users';
import { Usuario, RolEquipo } from '../../types';
import CustomButton from '../../../../components/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import colors from '../../../../types/colores';
import { traducirPositionToRolEquipo } from './const';

interface Props {
  open: boolean;
  onClose: () => void;
  onGuardar: (equipo: {
    id: string;
    nombre: string;
    rol: string;
    email?: string;
    requiredDocuments?: { name: string; expirationDate?: string }[];
  }[]) => void;
  equipoActual: {
    id: string;
    nombre: string;
    rol: string;
    email?: string;
    requiredDocuments?: { name: string; expirationDate?: string }[];
  }[];
}

export default function AsignarEquipoModal({
  open,
  onClose,
  onGuardar,
  equipoActual,
}: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [seleccionados, setSeleccionados] = useState<Props['equipoActual']>([]);

  const unicosPorRol = [
    RolEquipo.DataEntry,
    RolEquipo.Coordinador,
    RolEquipo.Regulatorio,
    RolEquipo.investigadorPrincipal,
    RolEquipo.Enfermero,
  ];
useEffect(() => {
  if (open) {
    userService.getUsers()
      .then((usuariosCargados) => {
        setUsuarios(usuariosCargados);

        if (equipoActual.length === 0) {
          const preseleccionados: Props['equipoActual'] = [];

          const seleccionarUnicoPorRol = (rol: RolEquipo, filtro: (u: Usuario) => boolean) => {
            const usuario = usuariosCargados.find(filtro);
            if (usuario) {
              preseleccionados.push({
                id: usuario._id,
                nombre: usuario.name,
                rol,
                email: usuario.email,
                requiredDocuments: usuario.requiredDocuments || [],
              });
            }
          };

          seleccionarUnicoPorRol(RolEquipo.Coordinador, (u) => traducirPositionToRolEquipo(u.position) === RolEquipo.Coordinador);
          seleccionarUnicoPorRol(RolEquipo.DataEntry, (u) => traducirPositionToRolEquipo(u.position) === RolEquipo.DataEntry);
          seleccionarUnicoPorRol(RolEquipo.Regulatorio, (u) => traducirPositionToRolEquipo(u.position) === RolEquipo.Regulatorio);
          seleccionarUnicoPorRol(RolEquipo.Enfermero, (u) => traducirPositionToRolEquipo(u.position) === RolEquipo.Enfermero);

          usuariosCargados.forEach((u) => {
            if (traducirPositionToRolEquipo(u.position) === RolEquipo.Tens) {
              preseleccionados.push({
                id: u._id,
                nombre: u.name,
                rol: RolEquipo.Tens,
                email: u.email,
                requiredDocuments: u.requiredDocuments || [],
              });
            }
          });

          setSeleccionados(preseleccionados);
        } else {
          setSeleccionados(equipoActual);
        }
      })
      .catch((err) => {
        console.error('Error al cargar usuarios', err);
        setUsuarios([]);
      });
  }
}, [open, equipoActual]);


  const investigadores = usuarios.filter((u) => u.position === 'Investigador(a)');

  const toggleUsuario = (usuario: Usuario, rol: RolEquipo) => {
    const nuevo = {
      id: usuario._id,
      nombre: usuario.name,
      rol,
      email: usuario.email,
      requiredDocuments: usuario.requiredDocuments || [],
    };

    const yaMarcado = seleccionados.some(
      (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === rol
    );

    const yaEsPrincipal = seleccionados.some(
      (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === RolEquipo.investigadorPrincipal
    );

    const yaEsSub = seleccionados.some(
      (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === RolEquipo.SubInvestigador
    );

    if (rol === RolEquipo.SubInvestigador && yaEsPrincipal) return;
    if (rol === RolEquipo.investigadorPrincipal && yaEsSub) return;

    if (unicosPorRol.includes(rol)) {
      const sinRol = seleccionados.filter((s) => s.rol !== rol);
      setSeleccionados([...sinRol, nuevo]);
    } else {
      if (yaMarcado) {
        setSeleccionados(seleccionados.filter(
          (u) => !(u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === rol)
        ));
      } else {
        setSeleccionados([...seleccionados, nuevo]);
      }
    }
  };

  const handleLimpiar = () => {
    setSeleccionados([]);
    onGuardar([]);
  };

  const renderGrupoPorRol = (titulo: string, rol: RolEquipo) =>
    renderGrupo(titulo, (u) => traducirPositionToRolEquipo(u.position) === rol, rol);

  const renderGrupo = (titulo: string, filtro: (u: Usuario) => boolean, rol: RolEquipo) => {
    const usuariosFiltrados = usuarios.filter(filtro);
    if (usuariosFiltrados.length === 0) return null;

    return (
      <div key={rol}>
        <Typography fontWeight={600} mt={2} mb={1}>
          {titulo}
        </Typography>
        <Divider />
        <Grid container spacing={1} mt={1} mb={2}>
          {usuariosFiltrados.map((usuario) => {
            const yaMarcado = seleccionados.some(
              (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === rol
            );

            const yaEsPrincipal = seleccionados.some(
              (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === RolEquipo.investigadorPrincipal
            );

            const yaEsSub = seleccionados.some(
              (u) => u.nombre?.trim().toLowerCase() === usuario.name?.trim().toLowerCase() && u.rol === RolEquipo.SubInvestigador
            );

            const deshabilitado =
              (rol === RolEquipo.SubInvestigador && yaEsPrincipal) ||
              (rol === RolEquipo.investigadorPrincipal && yaEsSub);

            const tooltipText = deshabilitado ? (
              'No puede tener ambos roles: Investigador Principal y SubInvestigador'
            ) : (
              <Box>
                {unicosPorRol.includes(rol) && (
                  <Typography fontWeight={600} fontSize="0.9rem" color="#fff">
                    Encargado Principal del Rol: {rol}
                  </Typography>
                )}
                {usuario.requiredDocuments?.length ? (
                  usuario.requiredDocuments.map((doc, i) => (
                      <div key={i} style={{ fontSize: '0.85rem' }}>
                        📄 {doc.name} –{' '}
                        {doc.name.toLowerCase().includes('certificado de título') ? (
                          doc.expirationDate
                            ? new Date(doc.expirationDate).toLocaleDateString()
                            : 'sin fecha'
                        ) : doc.expirationDate ? (() => {
                          const hoy = new Date();
                          const fechaVencimiento = new Date(doc.expirationDate);
                          const diffTime = fechaVencimiento.getTime() - hoy.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                          if (diffDays > 0) {
                            return (
                              <span>
                                Vence en {diffDays} días <span style={{ color: '#666' }}>(AL DÍA)</span>
                              </span>
                            );
                          }
                          if (diffDays < 0) {
                            return (
                              <span style={{ color: 'red' }}>
                                Vencido hace {Math.abs(diffDays)} días
                              </span>
                            );
                          }
                          return <span style={{ color: '#666' }}>(AL DÍA)</span>;
                        })() : 'sin fecha'}
                      </div>


                  ))
                ) : (
                  <div>Sin documentos</div>
                )}
              </Box>
            );

            return (
              <Grid size={{ xs: 12, sm: 6 }} key={usuario._id}>
                <Tooltip title={tooltipText} arrow sx={{ maxWidth: 400 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={yaMarcado}
                        disabled={deshabilitado}
                        onChange={() => toggleUsuario(usuario, rol)}
                      />
                    }
                    label={usuario.name}
                  />
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Asignar Equipo de Investigación</DialogTitle>
      <DialogContent dividers>
        {renderGrupo('Investigador Principal', (u) => investigadores.includes(u), RolEquipo.investigadorPrincipal)}
        {renderGrupo('SubInvestigadores', (u) => investigadores.includes(u), RolEquipo.SubInvestigador)}
        {renderGrupoPorRol('Coordinador', RolEquipo.Coordinador)}
        {renderGrupoPorRol('Data Entry', RolEquipo.DataEntry)}
        {renderGrupoPorRol('Regulatorio', RolEquipo.Regulatorio)}
        {renderGrupoPorRol('Enfermero/a', RolEquipo.Enfermero)}
        {renderGrupoPorRol('Tens', RolEquipo.Tens)}
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Button
            variant="outlined"
            onClick={handleLimpiar}
            startIcon={<CleaningServicesIcon sx={{ color: colors.standardDarkBlue }} />}
            sx={{
              color: colors.standardDarkBlue,
              borderColor: colors.standardDarkBlue,
              '&:hover': {
                backgroundColor: `${colors.standardDarkBlue}10`,
                borderColor: colors.standardDarkBlue,
              },
            }}
          >
            Limpiar
          </Button>
          <Box display="flex" gap={2}>
            <CustomButton $variant="outlined" onClick={onClose}>
              Cancelar
            </CustomButton>
            <CustomButton $variant="contained" onClick={() => onGuardar(seleccionados)} size="large">
              Guardar cambios
            </CustomButton>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
