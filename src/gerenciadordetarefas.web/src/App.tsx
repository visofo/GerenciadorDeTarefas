import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tarefas/:id" element={<TaskPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;