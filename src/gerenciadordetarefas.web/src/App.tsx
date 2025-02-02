import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import TaskForm from './components/TaskForm';
import DeleteTaskPage from './components/DeleteTaskPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tarefas/new" element={<TaskForm />} />
                <Route path="/tarefas/:id" element={<TaskPage />} />
                <Route path="/tarefas/:id/delete" element={<DeleteTaskPage taskId={''} onDelete={function (taskId: string): void {
                    throw new Error('Function not implemented.');
                }} onCancel={function (): void {
                    throw new Error('Function not implemented.');
                }} />} />
            </Routes>
        </Router>
    );
}

export default App;