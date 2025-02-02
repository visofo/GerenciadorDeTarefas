import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskStatusEnum } from '../types/task';
import api from '../services/api';
import { Alert, AlertTitle, Button, Stack, TextField } from '@mui/material';
import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'America/Sao_Paulo';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<Partial<Task>>({
        titulo: '',
        descricao: '',
        status: 0
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

        // Validação do título
        if (!task.titulo?.trim()) {
            newErrors.titulo = 'Título é obrigatório';
        } else if (task.titulo.length > 100) {
            newErrors.titulo = 'Título deve ter no máximo 100 caracteres';
        }

        // Validação do status
        if (task.status === undefined || task.status === null || task.status === '') {
            newErrors.status = 'O status é obrigatório.';
        }

        // Validação da descrição (opcional)
        if (task.descricao && task.descricao.length > 500) {
            newErrors.descricao = 'Descrição deve ter no máximo 500 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (id && id !== 'new') {
                await api.put(`/Tarefas/${id}`, { ...task, status: Number(task.status) });
            } else {
                await api.post('/Tarefas', { ...task, status: Number(task.status) });
            }
            navigate('/');
        } catch (ex: any) {
            setErrors({
                ...errors,
                general: ex.response?.data?.message || 'Erro ao salvar tarefa. Tente novamente.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField
                    label="Título *"
                    value={task.titulo}
                    variant="outlined"
                    size="small"
                    onChange={(e) => setTask({ ...task, titulo: e.target.value })}
                    error={!!errors.titulo}
                    helperText={errors.titulo}
                    fullWidth
                />

                <TextField
                    label="Descrição"
                    multiline
                    rows={4}
                    value={task.descricao}
                    onChange={(e) => setTask({ ...task, descricao: e.target.value })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.descricao}
                    helperText={errors.descricao}
                />

                <TextField
                    select
                    label="Status"
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: Number(e.target.value) })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value={0}>Pendente</option>
                    <option value={1}>Em Progresso</option>
                    <option value={2}>Concluída</option>
                </TextField>

                {/* Exibir o campo de data apenas se o status for "Concluída" */}
                {task.status === TaskStatusEnum.Concluida && (
                    <TextField
                    label="Data de Conclusão"
                    type="date"
                    value={task.dataConclusao?.split("T")[0] || new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        const currentTime = new Date().toISOString().split('T')[1]; // Obtém a hora atual no formato HH:mm:ss.sssZ
                        const dateTime = `${selectedDate}T${currentTime}`; // Combina a data selecionada com a hora atual
                        setTask({ ...task, dataConclusao: dateTime });
                    }}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                )}

                {/* Exibir erros gerais */}
                {Object.keys(errors).length > 0 && (
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        {Object.keys(errors).map((key) => (
                            <span key={key} style={{ display: 'block' }}>{errors[key]}</span>
                        ))}
                    </Alert>
                )}
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button variant="outlined" type="submit" size="small">Salvar</Button>
                <Button variant="outlined" color="error" size="small" onClick={() => navigate('/')}>Cancelar</Button>
            </Stack>
        </form>
    );
};

export default TaskForm;
