import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, List, Clock, CheckCircle, AlertCircle, ChevronRight, FileText } from 'lucide-react';

const QuotesHistory = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const token = localStorage.getItem('customerToken');
                const response = await fetch(`${backendUrl}/api/customer/quotes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setQuotes(data);
                } else {
                    setError('No se pudieron cargar tus cotizaciones.');
                }
            } catch (err) {
                console.error('Error fetching quotes:', err);
                setError('Error de conexión con el servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, [backendUrl]);

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { label: 'En Revisión', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-100' };
            case 'approved':
                return { label: 'Aprobada', icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-100' };
            case 'rejected':
                return { label: 'Rechazada', icon: AlertCircle, color: 'text-red-500 bg-red-50 border-red-100' };
            default:
                return { label: status || 'Pendiente', icon: Clock, color: 'text-slate-500 bg-slate-50 border-slate-100' };
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Cargando tu historial...</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Mis Cotizaciones</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Consulta el estado de tus solicitudes y descarga tus presupuestos previos.
                </p>
            </div>

            <hr className="border-slate-100 dark:border-slate-800 mb-10" />

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3 mb-8">
                    <AlertCircle size={20} />
                    <span className="text-sm font-bold">{error}</span>
                </div>
            )}

            {quotes.length === 0 && !error ? (
                <div className="bg-slate-50 dark:bg-slate-800/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center">
                    <div className="size-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                        <ShoppingBag size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aún no tienes cotizaciones</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mb-8">
                        Tus solicitudes aparecerán aquí una vez que agregues productos al carrito y envíes el formulario.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {quotes.map((quote) => {
                        const statusInfo = getStatusInfo(quote.status);
                        return (
                            <div key={quote.id} className="group bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row md:items-center gap-6">
                                {/* Quote Identifier */}
                                <div className="flex items-center gap-4 min-w-[140px]">
                                    <div className="size-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        <FileText size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID #{quote.id}</p>
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                                            <Calendar size={12} />
                                            {new Date(quote.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Items Count */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <List size={14} className="text-slate-400" />
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {quote._count?.items || 0} Productos
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-1">
                                        Solicitud enviada para {quote.company || 'Uso personal'}
                                    </p>
                                </div>

                                {/* Status Tag */}
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 justify-between md:justify-center">
                                    <div className={`px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${statusInfo.color}`}>
                                        <statusInfo.icon size={12} />
                                        {statusInfo.label}
                                    </div>
                                    <button className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Ver Detalles <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default QuotesHistory;
