import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { Task, TaskStatus, TaskStatusEnumMap } from '../types/task';
import api from '../services/api';

const HomePage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tarefas');
                setTasks(response.data);
            } catch (err) {
                setError('Erro ao carregar tarefas' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(task => task.status === TaskStatusEnumMap[filter]);

    return (
        <div>
            <h1>Gerenciador de Tarefas</h1>
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <TaskList tasks={filteredTasks} onTaskDeleted={function (id: number): void {
                            setTasks(tasks.filter(task => task.id !== id));
                        } } />
            )}
        </div>
    );
};

export default HomePage;