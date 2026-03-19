import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { resetPassword } from '../../services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await resetPassword(token, password);
            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            setError('Error al restablecer contraseña. El enlace puede haber expirado.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6 text-center">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">¡Contraseña Cambiada!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        Tu contraseña ha sido actualizada correctamente. Serás redirigido al inicio de sesión en unos segundos...
                    </p>
                    <Link to="/login" className="text-primary font-bold hover:underline">Ir al login ahora</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Nueva contraseña</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-10">Elige una contraseña segura para tu cuenta.</p>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-r-xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña Nueva</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-12 text-sm font-bold outline-none transition-all"
                                placeholder="Min. 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirmar Contraseña</label>
                        <div className="relative group">
                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none transition-all"
                                placeholder="Repite la contraseña"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>Actualizando...</span>
                            </>
                        ) : (
                            <span>Guardar nueva contraseña</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
