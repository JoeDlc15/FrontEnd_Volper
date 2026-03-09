import React from 'react';
import { Mail, Phone, Clock, MapPin, Send, MessageSquare, Briefcase, User, Factory, Navigation } from 'lucide-react';

const Contact = () => {
    const contactInfo = [
        {
            icon: <Phone className="text-primary" size={24} />,
            label: 'Teléfono Central',
            value: '+52 55 1234 5678'
        },
        {
            icon: <MessageSquare className="text-primary" size={24} />,
            label: 'WhatsApp Ventas',
            value: '+52 55 8765 4321'
        },
        {
            icon: <Clock className="text-primary" size={24} />,
            label: 'Horario',
            value: 'Lun-Vie: 8am - 6pm'
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12">
                {/* Hero Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 font-display">Contacto y Ubicación</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                        Estamos aquí para asesorarte en soluciones industriales de latón y empaques. Nuestro equipo técnico está listo para responder tus dudas.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Section: Form & Contact Info */}
                    <section className="space-y-10">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 font-display">
                                <Mail className="text-primary" />
                                Contáctanos
                            </h2>
                            <form action="#" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500"
                                                placeholder="Ej. Juan Pérez"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Empresa</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500"
                                                placeholder="Nombre de tu compañía"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Correo Electrónico</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500"
                                                placeholder="correo@ejemplo.com"
                                                type="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Teléfono</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500"
                                                placeholder="+52 (55) 0000 0000"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mensaje</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500 resize-none"
                                        placeholder="¿En qué podemos ayudarte?"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20 text-sm tracking-widest uppercase"
                                    type="submit">
                                    Enviar Mensaje
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Contact Channels */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                                    {info.icon}
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">{info.label}</p>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Right Section: Map & Address */}
                    <section className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 font-display">
                                    <MapPin className="text-primary" />
                                    Nuestra Ubicación
                                </h2>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-slate-700 dark:text-slate-300 font-medium text-sm leading-relaxed">
                                        Av. Industrial No. 450, Col. Parque Industrial Xochimilco, Ciudad de México, C.P. 16030
                                    </p>
                                </div>
                            </div>

                            {/* Interactive Map Mockup */}
                            <div className="relative w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800">
                                <div className="absolute inset-0 bg-cover bg-center opacity-80"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative flex flex-col items-center">
                                        <div className="bg-primary text-slate-900 p-4 rounded-full shadow-2xl animate-bounce">
                                            <Factory size={32} />
                                        </div>
                                        <div className="mt-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-lg text-xs font-black uppercase tracking-widest border border-primary/30">
                                            Almacén Volper Seal
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <button className="bg-white dark:bg-slate-900 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                                        <Navigation className="text-primary" size={16} />
                                        Cómo llegar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full"></span>
                                Puntos de Referencia
                            </h3>
                            <ul className="text-sm space-y-4 text-slate-600 dark:text-slate-400 font-medium">
                                <li className="flex items-start gap-3">
                                    <div className="size-5 rounded bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="size-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    Frente a la Aduana Principal del Parque Industrial
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="size-5 rounded bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="size-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    A 5 minutos de la salida Autopista Sur
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="size-5 rounded bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="size-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    Estacionamiento gratuito para clientes y transporte de carga
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Contact;
