import { Link } from 'react-router-dom';
import { Task } from '../types/task';

interface Props {
    tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
    return (
        <div className="task-list">
            <Link to="/tarefas/adicionar" className="btn-new">
                Nova Tarefa
            </Link>

            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className={`task-item status-${task.status}`}>
                            <div className="task-header">
                                <h3>{task.titulo}</h3>
                                <span className="status-badge">{task.status}</span>
                            </div>
                            <p>{task.descricao}</p>
                            <div className="task-actions">
                                <Link to={`/tarafeas/${task.id}`} className="btn-edit">
                                    Editar
                                </Link>
                                <button className="btn-delete">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;