import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import api from '../services/api';
import { Alert, Button, Card, CardActions, CardContent, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Task, TaskStatusEnumTexts } from '@/types/task';

interface TaskListProps {
    tasks: Task[];
    onTaskDeleted: (id: number) => void;
}

const TaskList = ({ tasks, onTaskDeleted }: TaskListProps) => {
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        setSelectedTask(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        if (!selectedTask) return;

        try {
            setLoadingId(selectedTask);
            await api.delete(`/tarefas/${selectedTask}`);
            onTaskDeleted(selectedTask);
        } catch (err) {
            setError('Falha ao excluir tarefa');
        } finally {
            setLoadingId(null);
            setOpenDialog(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendente': return 'warning';
            case 'Em Progresso': return 'info';
            case 'Concluida': return 'success';
            default: return 'default';
        }
    };

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button
                component={Link}
                to="/tarefas/new"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
            >
                Nova Tarefa
            </Button>
        </div>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table size="small" stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Data Criação</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Data Conclusão</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.titulo}</TableCell>
                                <TableCell>{task.descricao}</TableCell>
                                <TableCell> {new Date(task.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>
                                    <Chip
                                    size="small" 
                                        label={TaskStatusEnumTexts[task.status]}
                                        color={getStatusColor(TaskStatusEnumTexts[task.status])}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    {task.dataConclusao ? new Date(task.dataConclusao).toLocaleDateString('pt-BR') : ''}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        component={Link}
                                        to={`/tarefas/${task.id}`}
                                        color="primary"
                                        size="small" 
                                        aria-label="delete"
                                    >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete" 
                                        onClick={() => handleDelete(task.id)}
                                        disabled={loadingId === task.id}
                                        color="error"
                                        size="small" 
                                    >
                                        {loadingId === task.id ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <DeleteIcon fontSize="small"/>
                                        )}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir esta tarefa permanentemente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button
                        onClick={confirmDelete}
                        color="error"
                        variant="contained"
                        disabled={!!loadingId}
                    >
                        {loadingId ? 'Excluindo...' : 'Confirmar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TaskList;