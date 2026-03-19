import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { forgotPassword } from '../../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const data = await forgotPassword(email);
            if (data.error) {
                setError(data.error);
            } else {
                setMessage(data.message);
                setSubmitted(true);
            }
        } catch (err) {
            setError('Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800 text-center">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">¡Correo enviado!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                        Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>.
                        Por favor revisa tu bandeja de entrada y la carpeta de spam.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-full h-14 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-8">
                    <ArrowLeft size={16} /> Volver al Login
                </Link>

                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Recuperar acceso</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-10">Ingresa tu correo electrónico y te enviaremos un enlace para cambiar tu contraseña.</p>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-r-xl animate-in fade-in slide-in-from-left-2 transition-all">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                            Tu Correo Electrónico
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none transition-all"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>Enviando enlace...</span>
                            </>
                        ) : (
                            <span>Enviar enlace de recuperación</span>
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        ¿Recordaste tu contraseña? <Link to="/login" className="text-primary font-bold hover:underline">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
