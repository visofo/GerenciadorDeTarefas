import React from 'react';

interface DeleteTaskPageProps {
    taskId: string;
    onDelete: (taskId: string) => void;
    onCancel: () => void;
}

const DeleteTaskPage: React.FC<DeleteTaskPageProps> = ({ taskId, onDelete, onCancel }) => {
    const handleDelete = () => {
        onDelete(taskId);
    };

    return (
        <div>
            <h1>Excluir Tarefa</h1>
            <p>Você tem certeza de que deseja excluir esta tarefa?</p>
            <button onClick={handleDelete}>Sim, excluir</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default DeleteTaskPage;