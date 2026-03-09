import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    // Mock data for featured categories/products
    const featuredCategories = [
        {
            title: 'Conexiones de Bronce',
            description: 'Uniones de cañería armada en pulgadas y milimétricas. Calidad premium para alta presión.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbwaerOhHPAjDhpGazASv6BUITIjCMGACju9gOv89qWgS0vskjnnhIPVLxUKO4ftDHAr9RcQRf5ZPFgMq8Fj5ztfSZdxUP6FqH-FmjyWZy117WOTx-QuXyXwYbAlCAv3u7353p2uw5__TfTum_B5Wgl-jw761FK7rFdTcuok-sEN26es2QPH-mJhqg-qpzO8dT-NYBM_tUAzfrRaqtdjnVvN8_PCAqBrogEOjeQKTWcOEIGH71aZZOGUn7eKPphubXKhjzGEkkNxQ',
            brand: 'Industrias Volper'
        },
        {
            title: 'Empaquetaduras',
            description: 'Kits de juntas para compresoras y sistemas neumáticos de transporte pesado.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASn0wNvM1xCPxMagm9UklKYlNnusvz9XhwSZGdyPBQYVglayuYa-v7NYBAfIYEBpm5oRMm_59c8___shCKIgxZjQ0Yd5TFml8X9xnENFIaCVBhUK_6nNnLR7i0NXDw07zq7-vbsngmpMNH3OUDgcPFIYjI5gtWJ-TobRfrfuy3rEKlDlv9dOLNcAf1mnLzPBmUbPAeq-m2oSzs914zjgrKrqclQnUA2PxynZ97vdkRfaDZRdI_mZ6-PTBaQt08rZgRDQWGzX3f9eo',
            brand: 'Volper Seal'
        },
        {
            title: 'Bombas de Inyección',
            description: 'Sellos y componentes especializados para sistemas de inyección diesel de alta demanda.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_m-Xm-9X4Z-_4_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8_8', // Fallback icon in design
            brand: 'Precisión Volper',
            isIcon: true
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[600px] flex items-center text-white overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0 scale-105">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        className="w-full h-full object-cover opacity-40"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full text-left">
                    <div className="max-w-2xl">
                        <span className="bg-primary/90 text-sm font-bold px-4 py-1 rounded uppercase tracking-wider mb-6 inline-block">
                            Calidad Industrial Certificada
                        </span>
                        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Expertos en Uniones y Sellado Industrial
                        </h1>
                        <p className="text-lg text-slate-200 mb-8 max-w-lg">
                            Proveedores líderes de terminales de bronce, empaquetaduras y sellos para bombas de inyección. Soluciones de alta precisión para maquinaria pesada.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/catalogo" className="bg-primary hover:bg-opacity-90 transition-all px-8 py-4 rounded-full font-bold flex items-center gap-2">
                                Ver Catálogo
                            </Link>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all px-8 py-4 rounded-full font-bold">
                                Solicitar Cotización
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white dark:bg-slate-800 py-12 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Productos', value: '+1500' },
                        { label: 'Años de Experiencia', value: '25+' },
                        { label: 'Calidad Bronce', value: '100%' },
                        { label: 'Entrega Inmediata', value: 'Stock' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 font-display text-slate-900 dark:text-white">Categorías Destacadas</h2>
                        <p className="text-slate-600 dark:text-slate-400">Encuentre la solución exacta para su sistema hidráulico o de aire.</p>
                    </div>
                    <Link to="/catalogo" className="text-primary font-semibold flex items-center gap-1 group">
                        Ver todas las categorías <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredCategories.map((cat, i) => (
                        <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                            <div className="h-64 bg-slate-100 dark:bg-slate-700 p-8 flex items-center justify-center relative overflow-hidden">
                                {!cat.isIcon ? (
                                    <img
                                        alt={cat.title}
                                        className="h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                                        src={cat.image}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-slate-400">
                                        <span className="text-7xl">⚙️</span>
                                        <span className="font-medium">Sistemas Diesel</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{cat.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{cat.brand}</span>
                                    <button className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 text-white py-16 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6 font-display">¿Busca una medida específica?</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Nuestros terminales de bronce están disponibles en pulgadas, milímetros y uniones mixtas. Si no encuentra el código, nuestro equipo técnico le asesorará.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-primary hover:bg-opacity-90 px-8 py-3 rounded-lg font-bold transition-all">
                                Contactar Ventas
                            </button>
                            <button className="border border-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                Catálogo PDF
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 hidden md:block">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 rotate-3 transform shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">✓</span>
                                </div>
                                <span className="text-lg font-bold">CERTIFICACIÓN ISO 9001</span>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full"></div>
                                </div>
                                <div className="h-2 w-4/5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full"></div>
                                </div>
                                <div className="h-2 w-1/2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            </section>
        </div>
    );
};

export default Home;
