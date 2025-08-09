import { Home, Users, FileText, Activity, UserCheck, FolderOpen, User, HelpingHand, ArrowLeft, ArrowRight, ArrowLeftToLine, CalendarCheck } from 'lucide-react'
import { Container, LogOutButton, Section, SectionTitle, CustomDialogContent, CustomDialogTitle, ToggleButton } from './styles'
import { useAuth } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogActions, Tooltip } from '@mui/material';
import CustomButton from '../Button';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = async () => {
    await logout();
    navigate('/');
    setOpenDialog(false);
  };

  const handleCancelLogout = () => {
    setOpenDialog(false);
  };
  
  return (
    <Container $collapsed={collapsed}>
      <Section>
        <ToggleButton
          onClick={(e) => {
            e.preventDefault();
            setCollapsed(!collapsed);
          }}
          $collapsed={collapsed}
        >
          {collapsed ? <ArrowRight size={18}/> : <ArrowLeft size={18} />}
        </ToggleButton>
        {!collapsed && <SectionTitle>General</SectionTitle>}
        <SidebarItem to="/home" icon={<Home size={18} />} label={"Inicio"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/me" icon={<User size={18} />} label={"Mi perfil"} collapsed={collapsed}></SidebarItem>
      </Section>

      <Section>
        {!collapsed && <SectionTitle>Páginas</SectionTitle>}
        <SidebarItem to="/investigaciones" icon={<FolderOpen size={18} />} label={"Investigaciones"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/pacientes" icon={<Users size={18} />} label={"Pacientes"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/colaboradores" icon={<UserCheck size={18} />} label={"Staff"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/reportes" icon={<FileText size={18} />} label={"Reportes"} collapsed={collapsed}></SidebarItem>  
        <SidebarItem to="/actividades" icon={<Activity size={18} />} label={"Ver Actividad"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/factibilidades" icon={<HelpingHand size={18} />} label={"Factibilidades"} collapsed={collapsed}></SidebarItem>
        <SidebarItem to="/visitas" icon={<CalendarCheck size={18} />} label={"Visitas"} collapsed={collapsed}></SidebarItem>
      </Section>
      <Section>
        <Tooltip title="Cerrar sesión" placement="right" arrow>
          <LogOutButton as="button" onClick={handleLogoutClick} $collapsed={collapsed}>
            <ArrowLeftToLine size={18} />
            <span>Cerrar sesión</span>
          </LogOutButton>
        </Tooltip>  
      </Section>
      <Dialog open={openDialog} onClose={handleCancelLogout} fullWidth>
          <CustomDialogTitle >Cerrar sesión</CustomDialogTitle>
          <CustomDialogContent>¿Estás seguro de que deseas cerrar sesión?</CustomDialogContent>
          <DialogActions>
            <CustomButton onClick={handleCancelLogout} $variant='outlined'>Cancelar</CustomButton>
            <CustomButton onClick={handleConfirmLogout}  $variant="contained">Confirmar</CustomButton>
          </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Sidebar

