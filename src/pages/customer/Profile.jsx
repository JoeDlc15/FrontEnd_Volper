import { updateCustomerProfile } from '../../services/api';

const InfoField = ({ icon: Icon, label, value, name, type = "text", required = false, isEditing, formData, handleInputChange }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Icon size={18} />
            </div>
            <input
                type={type}
                name={name}
                value={isEditing ? formData[name] : value || 'No especificado'}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={required}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-medium transition-all outline-none border ${isEditing
                    ? 'bg-white dark:bg-slate-800 border-primary shadow-lg shadow-primary/5 dark:border-primary/50 text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-600 dark:text-slate-300'
                    }`}
            />
        </div>
    </div>
);

const Profile = () => {
    const { user: initialUser } = useOutletContext();
    const { refreshProfile } = useAuth();
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: initialUser?.name || '',
        email: initialUser?.email || '',
        phone: initialUser?.phone || '',
        company: initialUser?.company || '',
        address: initialUser?.address || ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || '',
            address: user?.address || ''
        });
        setIsEditing(false);
        setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const data = await updateCustomerProfile(formData);
            setUser(data);
            setIsEditing(false);
            setStatus({ type: 'success', message: 'Perfil actualizado correctamente.' });

            if (refreshProfile) refreshProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
            setStatus({ type: 'error', message: error.message || 'Error al actualizar el perfil.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Perfil</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Aquí podrás actualizar tu información de contacto y detalles de empresa.
                    </p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-slate-950 rounded-xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                    >
                        <Edit2 size={16} /> Editar Perfil
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                            <X size={16} /> Cancelar
                        </button>
                    </div>
                )}
            </div>

            <hr className="border-slate-100 dark:border-slate-800 mb-10" />

            {status.message && (
                <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in-95 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-bold">{status.message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoField icon={User} label="Nombre Completo" value={user.name} name="name" required isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
                    <InfoField icon={Mail} label="Correo Electrónico" value={user.email} name="email" type="email" required isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
                    <InfoField icon={Phone} label="Teléfono" value={user.phone} name="phone" isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
                    <InfoField icon={Briefcase} label="Empresa" value={user.company} name="company" isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
                    <div className="md:col-span-2">
                        <InfoField icon={MapPin} label="Dirección / Sede Principal" value={user.address} name="address" isEditing={isEditing} formData={formData} handleInputChange={handleInputChange} />
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-10 py-4 bg-primary text-slate-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="size-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Save size={18} /> Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
