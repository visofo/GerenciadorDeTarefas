import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tarefas/new" element={<TaskForm />} />
                    <Route path="/tarefas/:id" element={<TaskPage />} />
                </Routes>
        </Router>
    );
}

export default App;