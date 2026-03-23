import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Calendar, List, Clock, CheckCircle, AlertCircle, XCircle, ChevronRight, FileText, Copy, Loader2 } from 'lucide-react';
import QuoteDetailModal from '../../components/customer/QuoteDetailModal';
import { getCustomerQuotes, cancelQuote, duplicateQuote } from '../../services/api';
import { VOLPER_WHATSAPP } from '../../config/whatsapp';

const QuotesHistory = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedQuoteId, setSelectedQuoteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(null); // stores quoteId being actioned

    const fetchQuotes = useCallback(async () => {
        try {
            const data = await getCustomerQuotes();
            setQuotes(data);
        } catch (err) {
            console.error('Error fetching quotes:', err);
            setError('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    const openQuoteDetail = (id) => {
        setSelectedQuoteId(id);
        setIsModalOpen(true);
    };

    const handleQuickCancel = async (quoteId, e) => {
        e.stopPropagation();
        if (!confirm('¿Deseas cancelar esta cotización?')) return;
        setActionLoading(quoteId);
        try {
            await cancelQuote(quoteId);
            await fetchQuotes();
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handleQuickDuplicate = async (quoteId, e) => {
        e.stopPropagation();
        setActionLoading(quoteId);
        try {
            const newQuote = await duplicateQuote(quoteId);
            await fetchQuotes();
            alert(`Nueva cotización ${newQuote.maskId} creada exitosamente.`);
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { label: 'Pendiente', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-100' };
            case 'in_review':
                return { label: 'En Revisión', icon: Clock, color: 'text-sky-500 bg-sky-50 border-sky-100' };
            case 'approved':
                return { label: 'Aprobada', icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-100' };
            case 'rejected':
                return { label: 'Rechazada', icon: AlertCircle, color: 'text-red-500 bg-red-50 border-red-100' };
            case 'cancelled':
                return { label: 'Cancelada', icon: XCircle, color: 'text-slate-400 bg-slate-50 border-slate-200' };
            case 'closed':
                return { label: 'Cerrada', icon: CheckCircle, color: 'text-blue-500 bg-blue-50 border-blue-100' };
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
                        const isPending = quote.status?.toLowerCase() === 'pending';
                        const isActioning = actionLoading === quote.id;

                        return (
                            <div
                                key={quote.id}
                                className="group bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                                onClick={() => openQuoteDetail(quote.id)}
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                    {/* Quote Identifier */}
                                    <div className="flex items-center gap-4 min-w-[160px]">
                                        <div className="size-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                                            <FileText size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-primary">{quote.maskId || `COT-${String(quote.id).padStart(5, '0')}`}</p>
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
                                                {quote._count?.items || 0} Producto{(quote._count?.items || 0) !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-1">
                                            Solicitud enviada para {quote.company || 'Uso personal'}
                                        </p>
                                    </div>

                                    {/* Status + Actions */}
                                    <div className="flex flex-row items-center gap-3 justify-between md:justify-end">
                                        <div className={`px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${statusInfo.color}`}>
                                            <statusInfo.icon size={12} />
                                            {statusInfo.label}
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="flex items-center gap-2">
                                            {isPending && (
                                                <button
                                                    onClick={(e) => handleQuickCancel(quote.id, e)}
                                                    disabled={isActioning}
                                                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 disabled:opacity-50"
                                                    title="Cancelar cotización"
                                                >
                                                    {isActioning ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                                                </button>
                                            )}
                                            {!isPending && (
                                                <button
                                                    onClick={(e) => handleQuickDuplicate(quote.id, e)}
                                                    disabled={isActioning}
                                                    className="p-2 text-slate-300 hover:text-primary transition-colors rounded-lg hover:bg-primary/10 disabled:opacity-50"
                                                    title="Re-cotizar (crear nueva)"
                                                >
                                                    {isActioning ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const maskId = quote.maskId || `COT-${String(quote.id).padStart(5, '0')}`;
                                                    const msg = `Hola Volper Seal \ud83d\udd29, quisiera saber el estado de mi cotizaci\u00f3n *${maskId}*.\n\u00a1Gracias!`;
                                                    window.open(`https://wa.me/${VOLPER_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
                                                }}
                                                className="p-2 text-slate-300 hover:text-green-500 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20"
                                                title="Consultar por WhatsApp"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); openQuoteDetail(quote.id); }}
                                                className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Ver <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal de Detalle */}
            <QuoteDetailModal
                quoteId={selectedQuoteId}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onQuoteUpdated={fetchQuotes}
            />
        </div>
    );
};

export default QuotesHistory;
