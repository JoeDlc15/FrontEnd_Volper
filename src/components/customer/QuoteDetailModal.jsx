import React, { useState, useEffect } from 'react';
import { X, Calendar, Package, Clock, CheckCircle, AlertCircle, Briefcase, User, Phone, Mail, Hash, FileText } from 'lucide-react';

const QuoteDetailModal = ({ quoteId, isOpen, onClose }) => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const API_BASE_URL = VITE_API_URL.endsWith('/api') ? VITE_API_URL : `${VITE_API_URL}/api`;

    useEffect(() => {
        if (!isOpen || !quoteId) return;

        const fetchQuoteDetail = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('customerToken');
                const response = await fetch(`${API_BASE_URL}/customer/quotes/${quoteId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setQuote(data);
                } else {
                    setError('No se pudo cargar la información de la cotización.');
                }
            } catch (err) {
                console.error('Error fetching quote detail:', err);
                setError('Error de conexión con el servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuoteDetail();
    }, [quoteId, isOpen, API_BASE_URL]);

    if (!isOpen) return null;

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

    const statusInfo = quote ? getStatusInfo(quote.status) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">

                {/* Header */}
                <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 p-6 md:p-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">Detalle de Cotización</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID #{quoteId}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-10">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center">
                            <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500 font-medium">Cargando detalles...</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                            <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <p className="text-red-600 font-bold">{error}</p>
                        </div>
                    ) : quote && (
                        <div className="space-y-10">
                            {/* Status Section */}
                            <div className={`p-6 rounded-3xl border flex items-center justify-between ${statusInfo.color}`}>
                                <div className="flex items-center gap-3">
                                    <statusInfo.icon size={24} />
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest opacity-60">Estado Actual</p>
                                        <p className="text-lg font-black">{statusInfo.label}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Fecha de Solicitud</p>
                                    <p className="text-sm font-bold flex items-center gap-2 justify-end">
                                        <Calendar size={14} />
                                        {new Date(quote.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Info Grid */}
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <Hash size={14} /> Información de Contacto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Briefcase className="text-primary mt-0.5" size={18} />
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Empresa</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{quote.company || 'Uso Personal'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <User className="text-primary mt-0.5" size={18} />
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contacto</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{quote.contact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Phone className="text-primary mt-0.5" size={18} />
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Teléfono</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{quote.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="text-primary mt-0.5" size={18} />
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correo</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{quote.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <Package size={14} /> Productos Solicitados
                                </h3>
                                <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Producto</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">SKU</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Cant.</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                            {quote.items?.map((item) => (
                                                <tr key={item.id} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{item.productName}</p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">
                                                            {item.sku}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                                                            {item.quantity}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-800/30">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all"
                    >
                        Cerrar Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuoteDetailModal;
