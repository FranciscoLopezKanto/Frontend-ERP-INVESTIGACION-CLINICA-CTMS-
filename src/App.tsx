import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/index'
import FichaGeneralEstudio from './pages/pruebas/index'
import FactibilidadesListPage from './features/factibilidades/FactibilidadesList'
import FactibilidadDetailPage from './features/factibilidades/FactibilidadDetail'
import EditarFactibilidadPage from './features/factibilidades/EditFactibilidad'
import CrearFactibilidadPage from './features/factibilidades/CreateFactibilidad'
import VisitasList from './features/visitas/VisitasList'
import DetalleVisitaPage from './features/visitas/VisitasDetail'
import IngresarVisitaPage from './features/visitas/CreateVisita'
import { RequireAuth } from './routes/RequireAuth'
import { UserProfile } from './features/users/Profile'
import MainLayoutWrapper from './components/MainWrapper'
import GlobalLoading from './components/GlobalLoading'
import ChangePassword from './features/users/Password'
import SessionExpiredSnackbar from './components/SessionExpired'
import { RegisterUser } from './features/users/Register'
import UnauthorizedPage from './pages/Unauthorized'
import { ListUsers } from './features/users/List'
import { UserDetail } from './features/users/Detail'
import EditarVisitaPage from './features/visitas/EditVisita'
import PacientesListPage from './features/pacientes/PacientesList'
import DetallePacientePage from './features/pacientes/PacientesDetail'
import NotFound from './pages/NotFound'
import { ListActivities } from './features/activities/List'
import { ActivityDetail } from './features/activities/Detail'
import PacientesEditPage from './features/pacientes/PacientesEdit'
import CrearPacientePage from './features/pacientes/PacienteCreate'
import EstudiosListPage from './features/estudios/EstudiosList'
import DetalleEstudioPage from './features/estudios/EstudioDetail'
import EditarEstudioPage from './features/estudios/EditEstudio'
import PantallaInicio from './features/home/initial'
import { VerifyEmailPage } from './pages/verifyEmail'
import RecoverPassword from './pages/recoveryPassword'
import RecoveryPasswordChange from './pages/changePassword'
import CrearEstudioPage from './features/estudios/CreateEstudio'

function App() {
  return (
    <>
      <GlobalLoading />
      <SessionExpiredSnackbar />
      <Routes>
        {/* Login sin layout */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/recovery-password" element={<RecoverPassword />} />
        <Route path="/recovery-password-change/:token" element={<RecoveryPasswordChange />} />

        {/*Vista internas sin layout */}
        <Route element= {<MainLayoutWrapper centerContent/>}>
          <Route path="/me" element= {<RequireAuth> <UserProfile /> </RequireAuth>}/>
          <Route path='/change-password/:token' element={<RequireAuth> <ChangePassword /> </RequireAuth>}/>
          <Route path= '/colaboradores' element={<RequireAuth> <ListUsers /> </RequireAuth>}/>
          <Route path='/colaboradores/register' element={<RequireAuth requiredRole={['admin']}> <RegisterUser /> </RequireAuth>}/>
          <Route path='/colaboradores/:id' element={<RequireAuth requiredRole={['admin' , 'regulatorio']}> <UserDetail /> </RequireAuth>}/>
          <Route path='/actividades' element= {<RequireAuth> <ListActivities /> </RequireAuth>}/>
          <Route path="/actividades/:id" element={<RequireAuth><ActivityDetail /></RequireAuth>} />
          <Route path="/unauthorized" element={<UnauthorizedPage/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Vistas internas con layout */}
        <Route element={<MainLayoutWrapper />}>
          <Route path='/home' element= {<RequireAuth> <PantallaInicio /> </RequireAuth>}/>
          <Route path="/pruebas" element={<RequireAuth requiredRole={['admin']}> <FichaGeneralEstudio /> </RequireAuth>} />
          <Route path="/factibilidades" element={<RequireAuth> <FactibilidadesListPage /> </RequireAuth>} />
          <Route path="/factibilidades/:id" element={<RequireAuth> <FactibilidadDetailPage /> </RequireAuth>} />
          <Route path="/factibilidades/:id/editar" element={<RequireAuth requiredRole={['admin']} >  <EditarFactibilidadPage /></RequireAuth>} />
          <Route path="/factibilidades/crear" element={<RequireAuth requiredRole={['admin']}> <CrearFactibilidadPage /> </RequireAuth>} />
          <Route path="/visitas" element={<RequireAuth> <VisitasList/> </RequireAuth>} />
          <Route path="/visitas/:id" element={<RequireAuth> <DetalleVisitaPage/> </RequireAuth>} />
          <Route path="/visitas/crear" element={<RequireAuth> <IngresarVisitaPage/> </RequireAuth>} />
          <Route path='/visitas/:id/editar' element={<RequireAuth> <EditarVisitaPage /> </RequireAuth>} />
          <Route path ='/pacientes' element={<RequireAuth> <PacientesListPage/> </RequireAuth> }/>
          <Route path ='/pacientes/:id' element={<RequireAuth > <DetallePacientePage/> </RequireAuth> } />
          <Route path ='/pacientes/:id/editar' element={<RequireAuth > <PacientesEditPage/>c</RequireAuth>} />
          <Route path ='/pacientes/crear' element={<RequireAuth > <CrearPacientePage /> </RequireAuth>} />
          <Route path='/investigaciones' element={<RequireAuth> <EstudiosListPage /> </RequireAuth>} />
          <Route path='/investigaciones/crear' element={<RequireAuth> <CrearEstudioPage /> </RequireAuth>} />
          <Route path='/investigaciones/:id' element={<RequireAuth> <DetalleEstudioPage /> </RequireAuth>} />
          <Route path='/investigaciones/:id/editar' element={<RequireAuth> <EditarEstudioPage /> </RequireAuth>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
