import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, Send, Briefcase, Mail, Phone, User, FileText, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createQuote } from '../services/api';
import AuthModal from '../components/AuthModal';

const VOLPER_WHATSAPP = '519XXXXXXXX'; // Número de WhatsApp de Volper Seal

const Cart = () => {
    const { cart, cartCount, clearCart } = useCart();
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lastQuote, setLastQuote] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        phone: '',
        email: ''
    });

    // Auto-fill form when user data is available
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                company: user.company || prev.company,
                contact: user.name || prev.contact,
                phone: user.phone || prev.phone,
                email: user.email || prev.email
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await createQuote({
            ...formData,
            items: cart.map(item => ({
                name: item.name,
                variants: [{ sku: item.sku }],
                quantity: item.quantity,
                price: 0
            }))
        });

        if (result) {
            setLastQuote(result);
            setSubmitted(true);
            setTimeout(() => {
                clearCart();
            }, 2000);
        } else {
            alert("Error al enviar la cotización. Por favor intente nuevamente.");
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openWhatsApp = () => {
        const maskId = lastQuote?.maskId || `#${lastQuote?.id || ''}`;
        const name = formData.contact || user?.name || '';
        const company = formData.company || '';
        const msg = `Hola Volper Seal 🔩, soy ${name}${company ? ` de ${company}` : ''}.\nAcabo de enviar la cotización *${maskId}* desde la web.\n¿Podrían revisarla? ¡Gracias!`;
        window.open(`https://wa.me/${VOLPER_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    if (submitted) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50 dark:bg-slate-900">
                <div className="size-24 bg-primary rounded-full flex items-center justify-center text-white mb-8 animate-bounce">
                    <Send size={40} />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-display">¡Solicitud Enviada!</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md text-lg">
                    Hemos recibido tus productos para cotización. Un especialista técnico se pondrá en contacto contigo en breve.
                </p>
                {lastQuote?.maskId && (
                    <p className="text-sm font-bold text-primary mt-2">Código: {lastQuote.maskId}</p>
                )}
                <div className="flex items-center gap-4 mt-10">
                    <button
                        onClick={openWhatsApp}
                        className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-green-500/20 flex items-center gap-3"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Confirmar por WhatsApp
                    </button>
                    <Link to="/" className="px-8 py-4 bg-primary text-slate-950 rounded-full font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12">
                {/* Header & Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-400">
                    <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 dark:text-white font-bold">Carrito de Cotización</span>
                </nav>

                <div className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2 font-display">Tu Lista de Cotización</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Revisa tus productos y completa tus datos para recibir un presupuesto personalizado.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-20 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Parece que aún no has agregado productos para cotizar.</p>
                        <Link to="/catalogo" className="inline-flex items-center gap-2 bg-primary text-slate-950 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                            Ver Catálogo <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                        {/* Products List */}
                        <div className="xl:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                            <tr>
                                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Producto</th>
                                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Detalles</th>
                                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Cantidad</th>
                                                <th className="px-8 py-6 text-right"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800 bg-white dark:bg-slate-900">
                                            {cart.map((item) => (
                                                <CartItem key={item.sku} item={item} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-primary/20 p-8 flex flex-col md:flex-row justify-between items-center shadow-lg shadow-primary/5">
                                <div>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Resumen de solicitud</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                                        {cartCount} unidades <span className="text-primary font-normal text-xl opacity-60">seleccionadas</span>
                                    </p>
                                </div>
                                <div className="mt-6 md:mt-0">
                                    <Link to="/catalogo" className="text-primary font-black uppercase tracking-widest text-sm flex items-center gap-2 group">
                                        <span className="size-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-slate-950 transition-all">
                                            <Plus size={18} />
                                        </span>
                                        Agregar más productos
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quote Form */}
                        <div className="xl:col-span-1">
                            {!user ? (
                                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl sticky top-24 border border-slate-200 dark:border-slate-800 text-center">
                                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                        <User size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 font-display text-slate-900 dark:text-white">Inicia Sesión para Cotizar</h2>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                                        Para brindarte un mejor seguimiento y guardar tus cotizaciones, necesitas tener una cuenta en Volper Industrial.
                                    </p>
                                    <button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 text-sm tracking-widest uppercase"
                                    >
                                        INGRESAR O REGISTRARSE
                                        <ArrowRight size={18} />
                                    </button>

                                    <div className="mt-8 flex items-center gap-2 justify-center text-xs text-slate-500 font-medium">
                                        <div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        Tus productos se mantendrán guardados
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl sticky top-24 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Solicitar Cotización</h2>
                                            <p className="text-slate-500 text-sm">Respuesta en menos de 4h</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Empresa</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    placeholder="Nombre de la empresa"
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Contacto</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleInputChange}
                                                    placeholder="Tu nombre completo"
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Teléfono</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        required
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="N° Teléfono"
                                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-3">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <Loader2 className="animate-spin" size={20} />
                                                ) : (
                                                    <>
                                                        SOLICITAR PRESUPUESTO
                                                        <ArrowRight size={18} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                        <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                            <span className="font-bold text-xs">i</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                            Al solicitar presupuesto, autoriza a Volper Industrial a procesar sus datos con fines exclusivamente comerciales ligados a su solicitud.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Modal de Autenticación */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default Cart;
