//import React, { useState } from 'react';
//import api from '../services/api';

//interface TarefaFormProps {
//    onSuccess: () => void;
//}

//const TarefaForm: React.FC<TarefaFormProps> = ({ onSuccess }) => {
//    const [formData, setFormData] = useState({
//        titulo: '',
//        descricao: '',
//        status: 'Pendente'
//    });
//    const [errors, setErrors] = useState<Record<string, string>>({});

//    const validate = () => {
//        const newErrors: Record<string, string> = {};
        
//        if (!formData.titulo.trim()) {
//            newErrors.titulo = 'O título é obrigatório';
//        } else if (formData.titulo.length > 100) {
//            newErrors.titulo = 'Máximo de 100 caracteres';
//        }

//        setErrors(newErrors);
//        return Object.keys(newErrors).length === 0;
//    };

//    const handleSubmit = async (e: React.FormEvent) => {
//        e.preventDefault();
//        if (!validate()) return;

//        try {
//            await api.post('/tarefas', formData);
//            onSuccess();
//            setFormData({ titulo: '', descricao: '', status: 'Pendente' });
//        } catch (error) {
//            console.error('Erro ao criar tarefa:', error);
//            if (error.response?.data?.message) {
//                setErrors({ ...errors, general: error.response.data.message });
//            }
//        }
//    };

//    return (
//        <form onSubmit={handleSubmit}>
//            <div>
//                <label>Título:</label>
//                <input
//                    type="text"
//                    value={formData.titulo}
//                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
//                    maxLength={100}
//                />
//                {errors.titulo && <span className="error">{errors.titulo}</span>}
//            </div>
            
//            {/* Outros campos e validações... */}
            
//            {errors.general && <div className="error">{errors.general}</div>}
//            <button type="submit">Criar Tarefa</button>
//        </form>
//    );
//};