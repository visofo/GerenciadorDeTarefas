// src/pages/TaskPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/task';
import api from '../services/api';

const TaskPage = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            if (id && id !== 'new') {
                try {
                    const response = await api.get(`/tarefas/${id}`);
                    setTask(response.data);
                } catch (err) {
                    setError('Tarefa não encontrada');
                    setTimeout(() => navigate('/'), 2000);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, navigate]);

    const handleSubmitSuccess = () => {
        navigate('/', { state: { refresh: true } });
    };

    if (loading) {
        return (
            <div className="page-loading">
                <p>Carregando tarefa...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="task-page">
            <h1>{id === 'new' ? 'Criar Nova Tarefa' : 'Editar Tarefa'}</h1>
            <TaskForm
                task={id === 'new' ? undefined : task}
                onSuccess={handleSubmitSuccess}
            />
        </div>
    );
};

export default TaskPage;