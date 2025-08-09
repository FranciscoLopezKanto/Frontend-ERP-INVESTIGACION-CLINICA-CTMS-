import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Estudio, Usuario } from '../../types';
import { estudiosService } from '../../services';
import { userService } from '../../../../api/users';
import { TipoDroga } from '../../enums';

export default function useEditarEstudio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Estudio | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (id) {
      estudiosService
        .getById(id)
        .then((data) => {
          const fechaSeleccion = data.fechaSeleccion || data.createdAt || null;
          setForm({ ...data, fechaSeleccion });
        })
        .catch(console.error)
        .finally(() => setLoading(false));

      userService
        .getUsers()
        .then((data) =>
          setUsuarios(data.filter((u) => u.position === 'Investigador(a)'))
        )
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (field: keyof Estudio, value: any) => {
    if (!form) return;

    const parsedValue = ['compromisoPacientes', 'patientsCommitmentICLSR', 'pacientesTotales'].includes(field)
      ? Number(value)
      : value;

    setForm({ ...form, [field]: parsedValue });
  };

  const handleSubmit = async (formData: Estudio) => {
  try {
    const {
      _id,
      __v,
      updatedAt,
      createdAt,
      agentes,
      equipo,
      documentos,
      ...rest
    } = formData;

    const cleanData = {
      ...rest,
      tipoEnrolamiento: formData.tipoEnrolamiento?.trim() || 'StartUp',
      tipoDroga: formData.tipoDroga || TipoDroga.Otro,
      compromisoPacientes: Number(formData.compromisoPacientes) || 0,
      patientsCommitmentICLSR: Number(formData.patientsCommitmentICLSR) || 0,
      recruitmentStart: formData.recruitmentStart
        ? new Date(formData.recruitmentStart).toISOString()
        : undefined,
      recruitmentEnd: formData.recruitmentEnd
        ? new Date(formData.recruitmentEnd).toISOString()
        : undefined,
    };

    await estudiosService.update(_id, cleanData);
    console.log('✅ Estudio actualizado correctamente:', cleanData);
    setSuccessMessage('✅ Estudio actualizado correctamente');
    setSuccessOpen(true);
    setTimeout(() => navigate(`/investigaciones/${_id}`), 2000);
  } catch (err: any) {
    console.error('❌ Error al actualizar estudio:', err?.response?.data?.message || err.message);
    setErrorMessage('❌ Error al actualizar el estudio');
    setErrorOpen(true);
  }
};


  return {
    form,
    usuarios,
    loading,
    successOpen,
    errorOpen,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
    setSuccessOpen,
    setErrorOpen,
    navigate,
  };
}
