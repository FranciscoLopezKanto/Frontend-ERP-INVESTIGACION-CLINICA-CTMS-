export interface Factibilidad {
  _id: string;
  proposalId: string;
  code: string; // ← equivale a protocolo
  sponsorName: string;
  email?: string;

  feasibilityStatus: 'Pendiente' | 'En Revisión' | 'No Seleccionado' | 'Seleccionado';
  feasibilityValue: 'SI' | 'NO' | 'N/A';
  interest: 'SI' | 'NO';

  initialEmail?: string;
  documentArrivalDate?: string;
  visitDate?: string;
  feasibilitySentDate?: string;

  area?: string;
  patologia?: string; // ✅ nuevo campo
  productoInvestigacion?: string; // ✅ nuevo campo

  cdaSentDate?: string;

  comment?: string;
  instructionsSummary?: string; // ← equivale a título del estudio

  recruitmentPeriod?: string;

  principalInvestigator?: string;

  agents: {
    name: string;
    email: string;
    phone_number: string;
  }[];

  informacionCompleta: boolean;
   recruitmentStart?: string;
  recruitmentEnd?: string;

  patientsCommitmentICLSR?: number;
  patientsCommitment?: number;
}
export type CreateFactibilidad = {
  code: string;
  informacionCompleta: boolean;
  proposalId: string;
  sponsorName: string;
  email: string;
  feasibilityStatus: 'Pendiente' | 'En Revisión' | 'No Seleccionado' | 'Seleccionado';
  feasibilityValue: 'SI' | 'NO' | 'N/A';
  interest: 'SI' | 'NO';
  initialEmail: string ;
  documentArrivalDate?: string;
  visitDate?: string;
  feasibilitySentDate?: string;
  area: string;
  patologia?: string;
  productoInvestigacion?: string;
  cdaSentDate?: string;
  comment?: string;
  instructionsSummary?: string;
  recruitmentPeriod?: string;
  recruitmentStart?: string;
  recruitmentEnd?: string;
  principalInvestigator?: string;
  patientsCommitment: number;
  patientsCommitmentICLSR?: number;
  agents: {
    name: string;
    email: string;
    phone_number: string;
  }[];
};
