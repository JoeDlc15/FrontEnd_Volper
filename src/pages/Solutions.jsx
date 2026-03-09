import React, { useState } from 'react';
import { Info, FileText, Settings, Truck, ChevronDown, Headset, Mail, Phone } from 'lucide-react';

const Solutions = () => {
    const [activeTab, setActiveTab] = useState('general');

    const faqs = [
        {
            category: 'general',
            title: 'General',
            icon: <Info size={18} />,
            items: [
                {
                    q: '¿Cómo puedo solicitar una cotización formal?',
                    a: 'Puede solicitar una cotización formal a través de tres canales principales: completando nuestro formulario de contacto en línea, enviando un correo directo a ventas@volperseal.com o contactando a su asesor comercial asignado.'
                },
                {
                    q: '¿Cuál es el tiempo promedio de respuesta?',
                    a: 'Generalmente procesamos solicitudes estándar en un plazo de 24 a 48 horas hábiles. Para proyectos a medida, el tiempo puede extenderse hasta 72 horas.'
                }
            ]
        },
        {
            category: 'pedidos',
            title: 'Pedidos y Cotizaciones',
            icon: <FileText size={18} />,
            items: [
                {
                    q: '¿Cuentan con un monto mínimo de compra?',
                    a: 'Sí, para garantizar la eficiencia logística mantenemos un pedido mínimo dependiendo de la categoría del producto. Por favor, consulte con su asesor los umbrales específicos.'
                }
            ]
        },
        {
            category: 'productos',
            title: 'Productos y Materiales',
            icon: <Settings size={18} />,
            items: [
                {
                    q: '¿Qué tipos de aleaciones de latón ofrecen?',
                    a: 'Trabajamos principalmente con aleaciones C3600 y C3770, cumpliendo con las normas ASTM. Ofrecemos alternativas personalizadas para condiciones extremas.'
                }
            ]
        },
        {
            category: 'envios',
            title: 'Envíos y Entregas',
            icon: <Truck size={18} />,
            items: [
                {
                    q: '¿Realizan envíos a todo el país?',
                    a: 'Sí, contamos con una red logística que nos permite entregar en cualquier punto del territorio nacional, con tiempos de entrega de 3 a 5 días hábiles.'
                }
            ]
        }
    ];

    const currentFaqs = faqs.find(f => f.category === activeTab) || faqs[0];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <main className="max-w-5xl mx-auto w-full px-6 py-12">
                {/* Hero Section */}
                <section className="mb-12 text-center md:text-left">
                    <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 font-display">Preguntas Frecuentes</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-sans font-medium">
                        Encuentre respuestas rápidas sobre nuestros productos de latón, empaquetaduras y procesos logísticos industriales.
                    </p>
                </section>

                {/* Category Navigation */}
                <div className="mb-12 overflow-x-auto scrollbar-hide">
                    <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 min-w-max">
                        {faqs.map((cat) => (
                            <button
                                key={cat.category}
                                onClick={() => setActiveTab(cat.category)}
                                className={`flex items-center gap-2 pb-4 font-bold text-sm transition-all border-b-2 ${activeTab === cat.category
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                    }`}
                            >
                                {cat.icon} {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Content Area */}
                <div className="space-y-12">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-slate-900 dark:text-white text-2xl font-bold font-display">{currentFaqs.title}</h2>
                        </div>
                        <div className="space-y-4">
                            {currentFaqs.items.map((item, i) => (
                                <details
                                    key={i}
                                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <h3 className="text-slate-800 dark:text-slate-200 font-bold text-lg pr-8 font-sans leading-snug">{item.q}</h3>
                                        <div className="size-8 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform text-primary">
                                            <ChevronDown size={20} />
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-6 font-medium font-sans">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact CTA Section */}
                <section className="mt-24 p-12 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="size-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-primary/30">
                        <Headset size={40} />
                    </div>
                    <h2 className="text-white text-3xl font-bold mb-4 font-display relative z-10">¿No encontró lo que buscaba?</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl font-medium font-sans relative z-10">
                        Nuestro equipo de soporte técnico está disponible para resolver cualquier duda específica sobre sus requerimientos industriales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
                        <a className="bg-primary hover:bg-primary/90 text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                            href="mailto:soporte@volperseal.com">
                            <Mail size={18} /> Contactar Soporte
                        </a>
                        <a className="bg-slate-800 text-white border border-slate-700 hover:border-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3"
                            href="tel:+123456789">
                            <Phone size={18} /> Llamar Ahora
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Solutions;
