export interface Task {
    id: number;
    titulo: string;
    descricao?: string;
    dataCriacao: string;
    dataConclusao?: string;
    status: 'Pendente' | 'EmProgresso' | 'Conclu�da';
}

export type TaskStatus = Task['status'];