import React from 'react';
import { ShieldCheck, Handshake, Settings, Flag, Eye } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <ShieldCheck size={40} />,
            title: 'Calidad Garantizada',
            description: 'Sometemos cada producto a pruebas de fatiga y presión para asegurar un rendimiento superior en entornos exigentes.'
        },
        {
            icon: <Handshake size={40} />,
            title: 'Compromiso B2B',
            description: 'Valoramos la continuidad operativa de nuestros clientes, garantizando tiempos de entrega precisos y soporte continuo.'
        },
        {
            icon: <Settings size={40} />,
            title: 'Innovación Técnica',
            description: 'Inversión constante en materiales poliméricos y aleaciones de latón de nueva generación para soluciones personalizadas.'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        Nuestra Trayectoria
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight font-display">Sobre Volper Seal</h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        Líderes en la fabricación y distribución de conexiones de latón y empaquetaduras industriales, brindando soluciones técnicas de alta precisión para el sector B2B.
                    </p>
                </div>
            </section>

            {/* History Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight font-display">Historia y Legado</h2>
                            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                            <div className="space-y-5 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-sans">
                                <p>
                                    Desde nuestra fundación en 1995, <span className="text-slate-900 dark:text-white font-semibold">Volper Seal</span> ha mantenido un compromiso inquebrantable con la excelencia operativa. Lo que comenzó como un taller especializado en sellado técnico se ha transformado en un referente regional para la industria pesada.
                                </p>
                                <p>
                                    Nuestra especialidad radica en la fabricación de conexiones de latón y juntas industriales diseñadas para soportar condiciones extremas. Atendemos sectores estratégicos como el petroquímico, minero e hidráulico, donde la falla de un componente no es una opción.
                                </p>
                                <p>
                                    Hoy, combinamos décadas de experiencia con tecnología de vanguardia para asegurar que cada pieza que sale de nuestro almacén cumple con los estándares internacionales más rigurosos.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                                <img
                                    alt="Planta industrial moderna"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1565608411386-6184826f0391?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 hidden md:block w-32 h-32 bg-primary/10 -z-10 rounded-2xl"></div>
                            <div className="absolute -top-6 -left-6 hidden md:block w-32 h-32 bg-slate-100 dark:bg-slate-800 -z-10 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-slate-50 dark:bg-slate-900/30 py-24 px-6 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display">Nuestros Valores</h2>
                        <p className="text-slate-500 mt-3 font-sans">Los pilares que guían nuestra excelencia corporativa</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((value, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="size-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6 transition-all group-hover:bg-primary group-hover:text-slate-900">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{value.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs font-sans">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    <Flag size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Nuestra Misión</h3>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                                Proveer a la industria de conexiones y empaques de la más alta confiabilidad técnica, facilitando procesos seguros y eficientes mediante la innovación constante en materiales, asegurando siempre el éxito de nuestros aliados comerciales en cada proyecto.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    <Eye size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Nuestra Visión</h3>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                                Consolidarnos para el 2030 como el referente absoluto en el mercado de sellado industrial y conexiones, siendo reconocidos por nuestra capacidad de respuesta global, sostenibilidad y excelencia técnica que impulsa el desarrollo industrial sostenible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
