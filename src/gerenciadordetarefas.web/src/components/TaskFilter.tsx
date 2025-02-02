import { TaskStatus } from '../types/task';

interface Props {
    currentFilter: TaskStatus | 'All';
    onFilterChange: (filter: TaskStatus | 'All') => void;
}

const TaskFilter = ({ currentFilter, onFilterChange }: Props) => {
    const filters: (TaskStatus | 'All')[] = ['All', 'Pendente', 'EmProgresso', 'Concluída'];

    return (
        <div className="task-filter">
            <label>Filtrar por Status:</label>
            <select
                value={currentFilter}
                onChange={(e) => onFilterChange(e.target.value as TaskStatus | 'All')}
            >
                {filters.map(filter => (
                    <option key={filter} value={filter}>
                        {filter === 'All' ? 'Todos' : filter}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TaskFilter;