export interface Task {
    id: number;
    titulo: string;
    descricao?: string;
    dataCriacao: string;
    dataConclusao?: string;
    status: string  |  number;
}

export enum TaskStatusEnum {
    Pendente = 0,
    EmProgresso = 1,
    Concluida = 2
}

export const TaskStatusEnumTexts = {
    [TaskStatusEnum.Pendente]: 'Pendente',
    [TaskStatusEnum.EmProgresso]: 'Em Progresso',
    [TaskStatusEnum.Concluida]: 'Concluida',
  };

export const TaskStatusEnumMap: { [key: string]: number } = {
    'Pendente': TaskStatusEnum.Pendente,
    'Em Progresso': TaskStatusEnum.EmProgresso,
    'EmProgresso': TaskStatusEnum.EmProgresso,
    'Concluida': TaskStatusEnum.Concluida
};

export type TaskStatus = Task['status'];

// Função para pegar o status pelo id
// export function getStatusById(id: number): TaskStatusEnum | undefined {
//     const statuses = Object.values(TaskStatusEnum);
//     return statuses[id];
// }

// // Função para pegar status pelo nome
export function getStatusByName(name: string): number {
    const status = TaskStatusEnumMap[name];
    const s = Object.keys(TaskStatusEnum).indexOf(name);

    return Object.keys(TaskStatusEnum).indexOf(name);
}