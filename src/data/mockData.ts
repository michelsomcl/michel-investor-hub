
import { Client, Tag } from '../types';

export const mockTags: Tag[] = [
  {
    id: "1",
    name: "VIP",
    color: "#FF5733",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "Aposentado",
    color: "#33A1FF",
    createdAt: new Date("2023-01-20")
  },
  {
    id: "3",
    name: "Investidor Agressivo",
    color: "#33FF57",
    createdAt: new Date("2023-02-05")
  },
  {
    id: "4",
    name: "Conservador",
    color: "#B533FF",
    createdAt: new Date("2023-02-10")
  },
  {
    id: "5",
    name: "Alto Patrimônio",
    color: "#FFD700",
    createdAt: new Date("2023-03-01")
  }
];

export const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    source: "Indicação",
    level: "Cliente",
    serviceHistory: [
      {
        id: "1",
        clientId: "1",
        date: new Date("2023-04-10"),
        observations: "Reunião inicial para apresentação de carteira de investimentos",
        createdAt: new Date("2023-04-10")
      },
      {
        id: "2",
        clientId: "1",
        date: new Date("2023-04-25"),
        observations: "Acompanhamento de carteira, cliente satisfeito com resultados iniciais",
        createdAt: new Date("2023-04-25")
      }
    ],
    tasks: [
      {
        id: "1",
        clientId: "1",
        description: "Enviar relatório mensal",
        completed: true,
        createdAt: new Date("2023-04-05"),
        dueDate: new Date("2023-04-10")
      },
      {
        id: "2",
        clientId: "1",
        description: "Agendar reunião trimestral",
        completed: false,
        createdAt: new Date("2023-04-25"),
        dueDate: new Date("2023-05-15")
      }
    ],
    tags: [mockTags[0], mockTags[4]],
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-04-25")
  },
  {
    id: "2",
    name: "Maria Oliveira",
    phone: "(21) 97654-3210",
    source: "Site",
    level: "Lead",
    serviceHistory: [
      {
        id: "3",
        clientId: "2",
        date: new Date("2023-05-05"),
        observations: "Contato inicial, interessada em conhecer opções de investimento",
        createdAt: new Date("2023-05-05")
      }
    ],
    tasks: [
      {
        id: "3",
        clientId: "2",
        description: "Enviar material informativo sobre fundos de investimento",
        completed: true,
        createdAt: new Date("2023-05-05"),
        dueDate: new Date("2023-05-07")
      },
      {
        id: "4",
        clientId: "2",
        description: "Agendar primeira reunião presencial",
        completed: false,
        createdAt: new Date("2023-05-05"),
        dueDate: new Date("2023-05-12")
      }
    ],
    tags: [mockTags[3]],
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-05-05")
  },
  {
    id: "3",
    name: "Carlos Mendes",
    phone: "(31) 99876-5432",
    source: "LinkedIn",
    level: "Cliente",
    serviceHistory: [
      {
        id: "4",
        clientId: "3",
        date: new Date("2023-03-15"),
        observations: "Primeira reunião, definição de perfil de investidor",
        createdAt: new Date("2023-03-15")
      },
      {
        id: "5",
        clientId: "3",
        date: new Date("2023-04-10"),
        observations: "Apresentação de carteira personalizada",
        createdAt: new Date("2023-04-10")
      },
      {
        id: "6",
        clientId: "3",
        date: new Date("2023-05-01"),
        observations: "Ajuste na carteira, inclusão de fundos imobiliários",
        createdAt: new Date("2023-05-01")
      }
    ],
    tasks: [
      {
        id: "5",
        clientId: "3",
        description: "Enviar contrato atualizado",
        completed: true,
        createdAt: new Date("2023-04-10"),
        dueDate: new Date("2023-04-15")
      },
      {
        id: "6",
        clientId: "3",
        description: "Acompanhamento mensal de resultados",
        completed: false,
        createdAt: new Date("2023-05-01"),
        dueDate: new Date("2023-06-01")
      }
    ],
    tags: [mockTags[2], mockTags[4]],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-05-01")
  },
  {
    id: "4",
    name: "Ana Sousa",
    phone: "(41) 98765-1234",
    source: "Evento",
    level: "Cliente",
    serviceHistory: [
      {
        id: "7",
        clientId: "4",
        date: new Date("2023-02-20"),
        observations: "Encontro em evento financeiro, demonstrou interesse em diversificar carteira",
        createdAt: new Date("2023-02-20")
      },
      {
        id: "8",
        clientId: "4",
        date: new Date("2023-03-05"),
        observations: "Reunião formal, adequação de perfil e objetivos",
        createdAt: new Date("2023-03-05")
      }
    ],
    tasks: [
      {
        id: "7",
        clientId: "4",
        description: "Preparar análise de diversificação de carteira",
        completed: true,
        createdAt: new Date("2023-03-05"),
        dueDate: new Date("2023-03-15")
      }
    ],
    tags: [mockTags[1], mockTags[3]],
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-03-05")
  },
  {
    id: "5",
    name: "Pedro Almeida",
    phone: "(51) 99988-7766",
    source: "Indicação",
    level: "Lead",
    serviceHistory: [
      {
        id: "9",
        clientId: "5",
        date: new Date("2023-05-10"),
        observations: "Contato telefônico inicial, interesse em previdência privada",
        createdAt: new Date("2023-05-10")
      }
    ],
    tasks: [
      {
        id: "8",
        clientId: "5",
        description: "Enviar simulação de previdência privada",
        completed: false,
        createdAt: new Date("2023-05-10"),
        dueDate: new Date("2023-05-15")
      },
      {
        id: "9",
        clientId: "5",
        description: "Agendar videoconferência para apresentação detalhada",
        completed: false,
        createdAt: new Date("2023-05-10"),
        dueDate: new Date("2023-05-20")
      }
    ],
    tags: [],
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-10")
  }
];
