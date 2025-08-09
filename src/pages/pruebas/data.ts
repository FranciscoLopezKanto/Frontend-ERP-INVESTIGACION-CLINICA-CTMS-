import { Estudio } from './types'

export const estudios: Estudio[] = [
  {
    'id': 'E001',
    'nombre': 'CAMBRIA 01',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-06',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio en la primera revisi\u00f3n.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-08',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-13',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E001',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E001',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  },
  {
    'id': 'E002',
    'nombre': 'BRISTOL F01',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'Observaciones generales emitidas por el comit\u00e9.'
          },
          {
            'descripcion': 'Reenv\u00edo del centro con correcciones',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El centro responde con correcciones al paquete observado.'
          },
          {
            'descripcion': 'Segunda respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-14',
            'estado': 'completo',
            'detalle': 'Nuevas observaciones espec\u00edficas requeridas.'
          },
          {
            'descripcion': 'Segundo reenv\u00edo con correcciones',
            'fecha': '2025-03-18',
            'estado': 'completo',
            'detalle': 'Respuestas entregadas con correcciones definitivas.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-20',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-21',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-22',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-26',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-30',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E002',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E002',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  },
  {
    'id': 'E003',
    'nombre': 'GENOVA 14',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-06',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio en la primera revisi\u00f3n.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-08',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-13',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E003',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E003',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  },
  {
    'id': 'E004',
    'nombre': 'TURIN X9',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'Observaciones generales emitidas por el comit\u00e9.'
          },
          {
            'descripcion': 'Reenv\u00edo del centro con correcciones',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El centro responde con correcciones al paquete observado.'
          },
          {
            'descripcion': 'Segunda respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-14',
            'estado': 'completo',
            'detalle': 'Nuevas observaciones espec\u00edficas requeridas.'
          },
          {
            'descripcion': 'Segundo reenv\u00edo con correcciones',
            'fecha': '2025-03-18',
            'estado': 'completo',
            'detalle': 'Respuestas entregadas con correcciones definitivas.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-20',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-21',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-22',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-26',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-30',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E004',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E004',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  },
  {
    'id': 'E005',
    'nombre': 'LUCERNA R03',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-06',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio en la primera revisi\u00f3n.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-08',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-13',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E005',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E005',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  },
  {
    'id': 'E006',
    'nombre': 'HELSINKI 88',
    'documentos': [
      {
        'tipo': 'Protocolo',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-15',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del protocolo',
            'fecha': '2025-01-01',
            'estado': 'completo',
            'detalle': 'Se redact\u00f3 el protocolo inicial del estudio conforme a ICH-GCP.'
          },
          {
            'descripcion': 'Revisi\u00f3n por comit\u00e9',
            'fecha': '2025-01-10',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico revis\u00f3 y aprob\u00f3 el protocolo sin objeciones.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-01-20',
        'timeline': [
          {
            'descripcion': 'Redacci\u00f3n del ICF',
            'fecha': '2025-01-05',
            'estado': 'completo',
            'detalle': 'ICF dise\u00f1ado en base al protocolo aprobado.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-01-15',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 \u00e9tico aprob\u00f3 el ICF para enrolamiento.'
          }
        ]
      },
      {
        'tipo': 'Enmienda',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-02-10',
        'timeline': [
          {
            'descripcion': 'Propuesta de cambios',
            'fecha': '2025-02-01',
            'estado': 'completo',
            'detalle': 'Se propusieron cambios a criterios de inclusi\u00f3n.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n comit\u00e9',
            'fecha': '2025-02-08',
            'estado': 'completo',
            'detalle': 'La enmienda fue aprobada formalmente.'
          }
        ]
      },
      {
        'tipo': 'Consentimiento Informado',
        'version': 'V2',
        'estado': 'pendiente',
        'fecha': '2025-02-20',
        'timeline': [
          {
            'descripcion': 'Actualizaci\u00f3n ICF por enmienda',
            'fecha': '2025-02-15',
            'estado': 'completo',
            'detalle': 'El ICF fue actualizado seg\u00fan los cambios aprobados en la enmienda V1.'
          },
          {
            'descripcion': 'Revisi\u00f3n pendiente comit\u00e9',
            'fecha': '',
            'estado': 'pendiente',
            'detalle': 'Pendiente de revisi\u00f3n por parte del comit\u00e9.'
          }
        ]
      },
      {
        'tipo': 'Aprobaci\u00f3n del estudio',
        'version': 'V1',
        'estado': 'aprobado',
        'fecha': '2025-03-30',
        'timeline': [
          {
            'descripcion': 'Recepci\u00f3n del paquete en el centro',
            'fecha': '2025-03-01',
            'estado': 'completo',
            'detalle': 'El centro recibe el paquete de documentos para evaluaci\u00f3n inicial.'
          },
          {
            'descripcion': 'Sometimiento inicial al Comit\u00e9 de \u00c9tica',
            'fecha': '2025-03-03',
            'estado': 'completo',
            'detalle': 'El paquete es enviado al comit\u00e9 para revisi\u00f3n inicial.'
          },
          {
            'descripcion': 'Respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-07',
            'estado': 'completo',
            'detalle': 'Observaciones generales emitidas por el comit\u00e9.'
          },
          {
            'descripcion': 'Reenv\u00edo del centro con correcciones',
            'fecha': '2025-03-10',
            'estado': 'completo',
            'detalle': 'El centro responde con correcciones al paquete observado.'
          },
          {
            'descripcion': 'Segunda respuesta del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-14',
            'estado': 'completo',
            'detalle': 'Nuevas observaciones espec\u00edficas requeridas.'
          },
          {
            'descripcion': 'Segundo reenv\u00edo con correcciones',
            'fecha': '2025-03-18',
            'estado': 'completo',
            'detalle': 'Respuestas entregadas con correcciones definitivas.'
          },
          {
            'descripcion': 'Aprobaci\u00f3n final del comit\u00e9 de \u00e9tica',
            'fecha': '2025-03-20',
            'estado': 'completo',
            'detalle': 'El comit\u00e9 aprueba completamente el estudio.'
          },
          {
            'descripcion': 'Comunicaci\u00f3n al sponsor',
            'fecha': '2025-03-21',
            'estado': 'completo',
            'detalle': 'El centro comunica la aprobaci\u00f3n final al patrocinador.'
          },
          {
            'descripcion': 'Sponsor informa al ISP',
            'fecha': '2025-03-22',
            'estado': 'completo',
            'detalle': 'El patrocinador informa al Instituto de Salud P\u00fablica (ISP).'
          },
          {
            'descripcion': 'Aprobaci\u00f3n del ISP',
            'fecha': '2025-03-26',
            'estado': 'completo',
            'detalle': 'El ISP aprueba el inicio formal del estudio cl\u00ednico.'
          },
          {
            'descripcion': 'Llegada de la medicaci\u00f3n al centro',
            'fecha': '2025-03-30',
            'estado': 'completo',
            'detalle': 'El centro recibe la medicaci\u00f3n para comenzar enrolamiento.'
          }
        ]
      }
    ],
    'alertas': [
      {
        'estudioId': 'E006',
        'mensaje': 'ICF V2 pendiente de revisi\u00f3n por el comit\u00e9 \u00e9tico'
      },
      {
        'estudioId': 'E006',
        'mensaje': 'Verificar implementaci\u00f3n de enmienda V1 en todos los centros'
      }
    ]
  }
]