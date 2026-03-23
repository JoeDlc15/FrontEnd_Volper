import React, { useState, useEffect } from 'react';
import { X, Calendar, Package, Clock, CheckCircle, AlertCircle, XCircle, Briefcase, User, Phone, Mail, Hash, FileText, Pencil, Trash2, Copy, Minus, Plus, Save, Loader2 } from 'lucide-react';
import { updateQuoteItems, cancelQuote, duplicateQuote } from '../../services/api';
import { VOLPER_WHATSAPP } from '../../config/whatsapp';

const QuoteDetailModal = ({ quoteId, isOpen, onClose, onQuoteUpdated }) => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editItems, setEditItems] = useState([]);
    const [actionLoading, setActionLoading] = useState('');
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const API_BASE_URL = VITE_API_URL.endsWith('/api') ? VITE_API_URL : `${VITE_API_URL}/api`;

    useEffect(() => {
        if (!isOpen || !quoteId) return;

        const fetchQuoteDetail = async () => {
            setLoading(true);
            setError('');
            setIsEditing(false);
            setShowCancelConfirm(false);
            try {
                const token = localStorage.getItem('customerToken');
                const response = await fetch(`${API_BASE_URL}/customer/quotes/${quoteId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
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

    const isPending = quote?.status?.toLowerCase() === 'pending';

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { label: 'Pendiente', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-100', dark: 'dark:bg-amber-950/30 dark:border-amber-900/50' };
            case 'in_review':
                return { label: 'En Revisión', icon: Clock, color: 'text-sky-500 bg-sky-50 border-sky-100', dark: 'dark:bg-sky-950/30 dark:border-sky-900/50' };
            case 'approved':
                return { label: 'Aprobada', icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-100', dark: 'dark:bg-green-950/30 dark:border-green-900/50' };
            case 'rejected':
                return { label: 'Rechazada', icon: AlertCircle, color: 'text-red-500 bg-red-50 border-red-100', dark: 'dark:bg-red-950/30 dark:border-red-900/50' };
            case 'cancelled':
                return { label: 'Cancelada', icon: XCircle, color: 'text-slate-500 bg-slate-50 border-slate-200', dark: 'dark:bg-slate-800/50 dark:border-slate-700' };
            case 'closed':
                return { label: 'Cerrada', icon: CheckCircle, color: 'text-blue-500 bg-blue-50 border-blue-100', dark: 'dark:bg-blue-950/30 dark:border-blue-900/50' };
            default:
                return { label: status || 'Pendiente', icon: Clock, color: 'text-slate-500 bg-slate-50 border-slate-100', dark: 'dark:bg-slate-800/50 dark:border-slate-700' };
        }
    };

    const statusInfo = quote ? getStatusInfo(quote.status) : null;

    // --- Editing Logic ---
    const startEditing = () => {
        setEditItems(quote.items.map(item => ({ ...item })));
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditItems([]);
    };

    const updateItemQuantity = (index, delta) => {
        setEditItems(prev => prev.map((item, i) =>
            i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (index) => {
        if (editItems.length <= 1) return; // Must keep at least 1
        setEditItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveItems = async () => {
        setActionLoading('save');
        try {
            const updated = await updateQuoteItems(quote.id, editItems);
            setQuote(updated);
            setIsEditing(false);
            onQuoteUpdated?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading('');
        }
    };

    const handleCancel = async () => {
        setActionLoading('cancel');
        try {
            const updated = await cancelQuote(quote.id);
            setQuote(updated);
            setShowCancelConfirm(false);
            onQuoteUpdated?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading('');
        }
    };

    const handleDuplicate = async () => {
        setActionLoading('duplicate');
        try {
            const newQuote = await duplicateQuote(quote.id);
            onQuoteUpdated?.();
            onClose();
            // Small delay so state refreshes
            setTimeout(() => {
                alert(`Se ha creado la nueva cotización ${newQuote.maskId}. Revísala en tu historial.`);
            }, 300);
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading('');
        }
    };

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
                            <p className="text-xs font-black uppercase tracking-widest text-primary">{quote?.maskId || `COT-${String(quoteId).padStart(5, '0')}`}</p>
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
                            <div className={`p-6 rounded-3xl border flex items-center justify-between ${statusInfo.color} ${statusInfo.dark}`}>
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
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <Package size={14} /> Productos Solicitados
                                    </h3>
                                    {isPending && !isEditing && (
                                        <button
                                            onClick={startEditing}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                                        >
                                            <Pencil size={14} /> Editar
                                        </button>
                                    )}
                                    {isEditing && (
                                        <button
                                            onClick={cancelEditing}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <X size={14} /> Cancelar Edición
                                        </button>
                                    )}
                                </div>

                                <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800">
                                    {isEditing ? (
                                        /* EDIT MODE */
                                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {editItems.map((item, index) => (
                                                <div key={item.id || index} className="p-4 md:p-6 flex items-center gap-4 bg-white dark:bg-slate-900">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.productName}</p>
                                                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{item.sku}</span>
                                                    </div>
                                                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 h-10">
                                                        <button
                                                            onClick={() => updateItemQuantity(index, -1)}
                                                            className="px-3 h-full text-slate-400 hover:text-primary transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-3 text-sm font-black text-slate-900 dark:text-white min-w-[40px] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateItemQuantity(index, 1)}
                                                            className="px-3 h-full text-slate-400 hover:text-primary transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        disabled={editItems.length <= 1}
                                                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        title={editItems.length <= 1 ? 'Debe haber al menos 1 producto' : 'Eliminar producto'}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        /* VIEW MODE */
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
                                                            <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            {/* Cancel Confirmation */}
                            {showCancelConfirm && (
                                <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 rounded-3xl">
                                    <p className="text-sm font-bold text-rose-700 dark:text-rose-400 mb-4">
                                        ¿Estás seguro de que deseas cancelar esta cotización? Esta acción no se puede deshacer.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCancel}
                                            disabled={actionLoading === 'cancel'}
                                            className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {actionLoading === 'cancel' ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                                            Sí, Cancelar
                                        </button>
                                        <button
                                            onClick={() => setShowCancelConfirm(false)}
                                            className="flex-1 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            No, Volver
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {quote && !loading && (
                    <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        {isEditing ? (
                            /* Save Editing */
                            <button
                                onClick={handleSaveItems}
                                disabled={actionLoading === 'save'}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
                            >
                                {actionLoading === 'save' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Guardar Cambios
                            </button>
                        ) : isPending ? (
                            /* Pending Actions */
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCancelConfirm(true)}
                                    className="flex-1 py-4 bg-white dark:bg-slate-800 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-xs border-2 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <XCircle size={16} /> Cancelar Cotización
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            /* Non-pending Actions: WhatsApp + Re-quote + Close */
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        const maskId = quote.maskId || `COT-${String(quote.id).padStart(5, '0')}`;
                                        const msg = `Hola Volper Seal \ud83d\udd29, quisiera saber el estado de mi cotizaci\u00f3n *${maskId}*.\n\u00a1Gracias!`;
                                        window.open(`https://wa.me/${VOLPER_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
                                    }}
                                    className="py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </button>
                                <button
                                    onClick={handleDuplicate}
                                    disabled={actionLoading === 'duplicate'}
                                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
                                >
                                    {actionLoading === 'duplicate' ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
                                    Re-cotizar (Nueva)
                                </button>
                                <button
                                    onClick={onClose}
                                    className="py-4 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Cerrar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteDetailModal;
