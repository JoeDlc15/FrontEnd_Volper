import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, Send, Briefcase, Mail, Phone, User, FileText, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createQuote } from '../services/api';

const Cart = () => {
    const { cart, cartCount, clearCart } = useCart();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        phone: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const success = await createQuote({
            ...formData,
            items: cart.map(item => ({
                name: item.name,
                variants: [{ sku: item.sku }],
                quantity: item.quantity,
                price: 0
            }))
        });

        if (success) {
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
                <Link to="/" className="mt-10 px-8 py-4 bg-primary text-slate-950 rounded-full font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all">
                    Volver al Inicio
                </Link>
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
                            <div className="bg-slate-900 dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl sticky top-24 border border-slate-800 text-white">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold font-display">Solicitar Cotización</h2>
                                        <p className="text-slate-500 text-sm">Respuesta en menos de 4h</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Empresa</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                required
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Nombre de la empresa"
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Contacto</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                required
                                                type="text"
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleInputChange}
                                                placeholder="Tu nombre completo"
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Teléfono</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="N° Teléfono"
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Correo</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email corporativo"
                                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
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

                                <div className="mt-8 flex items-start gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50">
                                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <span className="font-bold text-xs">i</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                        Al solicitar presupuesto, autoriza a Volper Seal a procesar sus datos con fines exclusivamente comerciales ligados a su solicitud.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
