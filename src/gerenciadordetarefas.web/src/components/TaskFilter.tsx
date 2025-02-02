import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TaskStatus, TaskStatusEnum, TaskStatusEnumMap, TaskStatusEnumTexts } from '../types/task';

interface Props {
    currentFilter: TaskStatus | 'All';
    onFilterChange: (filter: TaskStatus | 'All') => void;
}

const TaskFilter = ({ currentFilter, onFilterChange }: Props) => {
    const filters: (TaskStatus | 'All')[] = ['All', 
        TaskStatusEnumTexts[TaskStatusEnum.Pendente], 
        TaskStatusEnumTexts[TaskStatusEnum.EmProgresso], 
        TaskStatusEnumTexts[TaskStatusEnum.Concluida]];

    return (
        <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
            <InputLabel id="demo-select-small-label">Filtrar por Status:</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentFilter}
                label="Filtrar por Status:"
                onChange={(e) => onFilterChange(e.target.value as TaskStatus | 'All')}
            >
                {filters.map(filter => {
                    return (
                        <MenuItem key={filter} value={filter}>
                            {filter === 'All' ? 'Todos' : filter}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default TaskFilter;