export interface FactibilidadDummy {
  proposal_id: string;
  code: string;
  sponsor_name: string;
  email?: string;
  feasibility_status: 'no seleccionado' | 'seleccionado' | 'rechazado' | 'En revisión';
  // 'pendiente' | 'aprobado' | 'rechazado';
  feasibility_value: 'SI' | 'NO' | 'N/A';
  interest: 'SI' | 'NO';
  initial_email?: string;
  document_arrival_date?: string;
  visit_date?: string;
  feasibility_sent_date?: string;
  area?: string;
  cda_sent_date?: string;
  speciality?: string;
  comment?: string;
  instructions_summary?: string;
  patients_commitment?: number;
  recruitment_period?: string;
  principal_investigator?: string;
  agents: {
    name: string;
    email: string;
    phone_number: string;
  }[];
}