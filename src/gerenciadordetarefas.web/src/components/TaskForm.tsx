import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../types/task';
import api from '../services/api';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<Partial<Task>>({
        titulo: '',
        descricao: '',
        status: 'Pendente'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (id && id !== 'new') {
            const fetchTask = async () => {
                try {
                    const response = await api.get(`/tarefas/${id}`);
                    setTask(response.data);
                } catch {
                    navigate('/');
                }
            };
            fetchTask();
        }
    }, [id, navigate]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!task.titulo?.trim()) {
            newErrors.titulo = 'Título é obrigatório';
        } else if (task.titulo.length > 100) {
            newErrors.titulo = 'Máximo de 100 caracteres';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (id && id !== 'new') {
                await api.put(`/tarefas/${id}`, task);
            } else {
                await api.post('/tarefas', task);
            }
            navigate('/');
        } catch {
            setErrors({
                ...errors,
                general: 'Erro ao salvar tarefa. Tente novamente.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>

            <div className="form-group">
                <label>Título *</label>
                <input
                    type="text"
                    value={task.titulo}
                    onChange={(e) => setTask({ ...task, titulo: e.target.value })}
                    className={errors.titulo ? 'error' : ''}
                />
                {errors.titulo && <span className="error-msg">{errors.titulo}</span>}
            </div>

            <div className="form-group">
                <label>Descrição</label>
                <textarea
                    value={task.descricao}
                    onChange={(e) => setTask({ ...task, descricao: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Status</label>
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value as Task['status'] })}
                >
                    <option value="Pendente">Pendente</option>
                    <option value="EmProgresso">Em Progresso</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>

            {errors.general && <div className="error-msg">{errors.general}</div>}

            <div className="form-actions">
                <button type="submit" className="btn-save">
                    Salvar
                </button>
                <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate('/')}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
