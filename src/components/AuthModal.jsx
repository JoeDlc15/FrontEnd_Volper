import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
    const { login, register, loading } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        let result;
        if (isLogin) {
            result = await login(formData.email, formData.password);
        } else {
            result = await register(formData.name, formData.email, formData.password);
        }

        setIsSubmitting(false);

        if (result.success) {
            onClose();
            setFormData({ name: '', email: '', password: '' });
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                {/* Header Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                    <button
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                        onClick={() => { setIsLogin(true); setError(''); }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                        onClick={() => { setIsLogin(false); setError(''); }}
                    >
                        Crear Cuenta
                    </button>
                    <button onClick={onClose} className="p-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Content */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                            {isLogin ? 'Bienvenido de nuevo' : 'Únete a Volper Seal'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {isLogin ? 'Ingresa tus credenciales para acceder a tu cuenta.' : 'Guarda tus datos para cotizar más rápido.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {isLogin && (
                                <div className="flex justify-end mt-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            navigate('/forgot-password');
                                        }}
                                        className="text-xs font-bold text-primary hover:underline transition-all"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary/30 flex justify-center items-center"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                isLogin ? 'Ingresar' : 'Registrarse'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
