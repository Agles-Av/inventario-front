import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import { ListUsersService } from '../../../services/admin/ListUsers';
import { Button } from 'primereact/button';
import { CambiarEncargado } from '../../../services/admin/CambiarResponsable';
import { FancyInput } from '../../../components/inputs/FancyInput';
import { ListCategoriasAll } from '../../../services/admin/ListCategorias';
import { almacenValidator } from '../../../utilities/validators/AlmacenValidators';
import { AddAlmacen } from '../../../services/admin/AddAlmacen';
import { AlertHelper } from '../../../utilities/alerts/AlertHelper';


const AlmacenModal = ({ initialData, visible, onhide, loading, mode }) => {
    const [users, setUsers] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [newEncargado, setNewEncargado] = useState("");
    const [formData, setFormData] = useState({
        identificador: '',
        categoria: '',
        encargado: ''
    })
    const [articulosCategoria, setArticulosCategoria] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [errors, setErrors] = useState({});
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

         // Si es el campo de categoría, buscar los artículos asociados
         if (name === 'categoria') {
            const categoria = categorias.find(cat => cat.id === parseInt(value));
            setCategoriaSeleccionada(categoria);
            setArticulosCategoria(categoria?.articulo || []);
        }

        const updateErrors = { ...errors };
        const singleFieldError = almacenValidator({ ...formData, [name]: value });
        updateErrors[name] = singleFieldError[name];
        setErrors(updateErrors);
        
    }
    
    

    const handleOnHide = () => {
        onhide(false);
        setFormData({
            identificador: '',
            categoria: '',
            encargado: ''
        });
        setErrors({});
        setArticulosCategoria([]);
        setCategoriaSeleccionada(null);
        setNewEncargado("");
    };
    const getUsers = async () => {
        const users = await ListUsersService();
        const filteredUsers = users.filter(user => user.role !== 'ADMIN' && user.almacen === null);

        setUsers(filteredUsers);
    }
    const handleAsignar = async () => {
        try {
            await CambiarEncargado(initialData.id, newEncargado, initialData.categoria.id, initialData.identificador);
        } catch (error) {
            AlertHelper.showAlert("No se pudo asignar el nuevo encargado", "error");
        } finally {
            setNewEncargado("");
            onhide(false);
            loading(true);
        }
    }
    const getCategorias = async () => {
        const categorias = await ListCategoriasAll();
        setCategorias(categorias);
    }

    const CrearAlmacen = async () => {
        try {
            const response = await AddAlmacen(formData);
            
        } catch (error) {
            
            AlertHelper.showAlert("No se pudo crear el almacén", "error");
        }finally{
            setFormData({
                identificador: '',
                categoria: '',
                encargado: ''
            });
            setErrors({});
            onhide(false);
            loading(true);
        }
        
    }

    useEffect(() => {
        getUsers();
        getCategorias();
    }, [initialData, mode]);
    return (
        <Dialog
            header={
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-box" style={{ fontSize: '1.25rem' }}></i>
                    <span>Detalles del Almacén</span>
                </div>
            }
            visible={visible}
            onHide={handleOnHide}
            style={{ width: '80vw' }}
            breakpoints={{ '960px': '75vw', '640px': '90vw' }}
            draggable={false}
            className="shadow-5"
            footer={mode === 'detalles' ? (<Button label='Salir de detalles' onClick={handleOnHide} />) : (<></>)}

        >
            {mode === 'detalles' ? (
                <div className="flex flex-column gap-5">
                    {/* Header con identificación */}
                    <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round">
                        <div>
                            <Tag
                                value={`ID: ${initialData?.identificador || 'N/A'}`}
                                severity="info"
                                className="font-bold"
                            />
                            <h2 className="text-2xl font-bold mt-2 text-indigo-800">
                                Identificador: {initialData?.identificador || 'Almacén sin nombre'}
                            </h2>
                        </div>
                        <Avatar
                            icon="pi pi-warehouse"
                            size="xlarge"
                            shape="circle"
                            className="bg-indigo-100 text-indigo-600 shadow-3"
                        />
                    </div>

                    {/* Información principal en cards */}
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="p-4 border-1 surface-border border-round surface-card shadow-2">
                                <div className="flex align-items-center gap-3 mb-3">
                                    <Avatar
                                        icon="pi pi-user"
                                        size="large"
                                        shape="circle"
                                        className="bg-amber-100 text-amber-600"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 m-0">Encargado</h3>
                                        <p className="text-sm text-gray-500 m-0">Responsable del almacén</p>
                                    </div>
                                </div>
                                <Divider />
                                <div className="flex flex-column gap-2">
                                    <div>
                                        <span className="block text-sm font-medium text-gray-500">Nombre</span>
                                        <p className="text-gray-800 font-medium">
                                            {initialData?.encargado?.nombre} {initialData?.encargado?.apellidos}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-gray-500">Contacto</span>
                                        <p className="text-gray-800">{initialData?.encargado?.email}</p>
                                        <p className="text-gray-800">@{initialData?.encargado?.username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-4 border-1 surface-border border-round surface-card shadow-2 h-full">
                                <div className="flex align-items-center gap-3 mb-3">
                                    <Avatar
                                        icon="pi pi-tag"
                                        size="large"
                                        shape="circle"
                                        className="bg-teal-100 text-teal-600"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 m-0">Categoría</h3>
                                        <p className="text-sm text-gray-500 m-0">Clasificación del almacén</p>
                                    </div>
                                </div>
                                <Divider />
                                <div className="flex flex-column gap-2">
                                    <div>
                                        <span className="block text-sm font-medium text-gray-500">Nombre</span>
                                        <Tag
                                            value={initialData?.categoria?.nombre || 'Sin categoría'}
                                            severity="success"
                                            className="text-sm font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de artículos */}
                    <div className="p-4 border-1 surface-border border-round surface-card shadow-2">
                        <div className="flex align-items-center gap-3 mb-4">
                            <Avatar
                                icon="pi pi-shopping-bag"
                                size="large"
                                shape="circle"
                                className="bg-purple-100 text-purple-600"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 m-0">Artículos</h3>
                                <p className="text-sm text-gray-500 m-0">
                                    Inventario actual ({initialData?.articulos?.length || 0} items)
                                </p>
                            </div>
                        </div>
                        <Divider />
                        {initialData?.articulos?.length > 0 ? (
                            <div className="grid">
                                {initialData.articulos.map((articulo) => (
                                    <div key={articulo.id} className="col-12 sm:col-6 lg:col-4">
                                        <div className="p-3 border-1 surface-border border-round surface-card hover:shadow-3 transition-duration-150 transition-all">
                                            <div className="flex align-items-center gap-3">
                                                <Avatar
                                                    icon="pi pi-box"
                                                    size="normal"
                                                    shape="circle"
                                                    className="bg-blue-100 text-blue-600"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800 m-0">{articulo.nombre}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                        {articulo.descripcion || 'Sin descripción'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Tag
                                                value="Disponible"
                                                severity="success"
                                                className="mt-2 text-xs"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-column align-items-center py-4">
                                <i className="pi pi-inbox text-5xl text-gray-400 mb-2"></i>
                                <p className="text-gray-500 font-medium">No hay artículos registrados</p>
                            </div>
                        )}
                    </div>
                    {/* Sección de asignar un reponsable */}
                    <div className="p-4 border-1 surface-border border-round surface-card shadow-2">
                        <div className="flex align-items-center gap-3 mb-4">
                            <Avatar
                                icon="pi pi-user-plus"
                                size="large"
                                shape="circle"
                                className="bg-orange-100 text-orange-600"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 m-0">Asignar Responsable</h3>
                                <p className="text-sm text-gray-500 m-0">Asignar un nuevo encargado al almacén</p>
                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-column gap-2">
                            <span className="block text-sm font-medium text-gray-500">Seleccionar Usuario</span>

                            <select className="p-inputtext p-component w-full" onChange={(e) => setNewEncargado(e.target.value)} value={newEncargado}  >
                                <option>Selecciona un responsable</option>
                                
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} {user.lastName} (@{user.username})
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hay usuarios disponibles</option>
                                )}
                            </select>
                            <div className="text-center">
                                <Button
                                    label='Asignar responsable'
                                    icon="pi pi-user-plus"
                                    className="w-full mt-3"
                                    onClick={() => handleAsignar()}
                                    disabled={!newEncargado}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-column gap-5">
                    {/* Header */}
                    <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round">
                        <div>
                            <h2 className="text-2xl font-bold mt-2 text-indigo-800">
                                <i className="pi pi-plus-circle mr-2"></i>
                                Crear Nuevo Almacén
                            </h2>
                        </div>
                        <Avatar
                            icon="pi pi-warehouse"
                            size="xlarge"
                            shape="circle"
                            className="bg-indigo-100 text-indigo-600 shadow-3"
                        />
                    </div>

                    {/* Formulario */}
                    <div className="p-4 border-1 surface-border border-round surface-card shadow-2 mt-3">
                        <div className="grid">
                            {/* Identificador */}
                            <div className="col-12 md:col-6">
                                <FancyInput
                                    name="identificador"
                                    label="Identificador del Almacén"
                                    value={formData.identificador}
                                    onChange={handleChange}
                                    type="text"
                                    icon={<i className="pi pi-id-card"></i>}
                                    placeholder="Ej: A1, B2, etc."
                                    errorMessage={errors.identificador}
                                    maxLength={50}
                                />
                            </div>

                            {/* Categoría */}
                            <div className="col-12 md:col-6">
                                <div className="mb-3">
                                    
                                    <select
                                        id="categoria"
                                        className={`w-full p-inputtext p-component ${errors.categoria ? 'p-invalid' : ''}`}
                                        name='categoria'
                                        onChange={handleChange}
                                        
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoria && (
                                        <small className="p-error block">{errors.categoria}</small>
                                    )}
                                </div>
                            </div>

                            {/* Encargado */}
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="encargado" className="block text-sm font-medium text-gray-500 mb-2">
                                        Encargado <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="encargado"
                                        className={`w-full p-inputtext p-component ${errors.encargado ? 'p-invalid' : ''}`}
                                        name='encargado'
                                        onChange={handleChange}
                                       
                                    >
                                        <option value="">Seleccione un encargado</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} {user.lastName} (@{user.username})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.encargado && (
                                        <small className="p-error block">{errors.encargado}</small>
                                    )}
                                </div>
                            </div>

                            {/* Sección de Artículos de la categoría seleccionada */}
                            <div className="col-12">
                                <div className="p-4 border-1 surface-border border-round surface-card shadow-2">
                                    <div className="flex align-items-center gap-3 mb-4">
                                        <Avatar
                                            icon="pi pi-shopping-bag"
                                            size="large"
                                            shape="circle"
                                            className="bg-purple-100 text-purple-600"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 m-0">
                                                Artículos de {categoriaSeleccionada?.nombre || 'la categoría'}
                                            </h3>
                                            <p className="text-sm text-gray-500 m-0">
                                                {articulosCategoria.length} artículos disponibles
                                            </p>
                                        </div>
                                    </div>
                                    <Divider />
                                    {articulosCategoria.length > 0 ? (
                                        <div className="grid">
                                            {articulosCategoria.map((articulo, index) => (
                                                <div key={index} className="col-12 sm:col-6 lg:col-4">
                                                    <div className="p-3 border-1 surface-border border-round surface-card hover:shadow-3 transition-duration-150 transition-all">
                                                        <div className="flex align-items-center gap-3">
                                                            <Avatar
                                                                icon="pi pi-box"
                                                                size="normal"
                                                                shape="circle"
                                                                className="bg-blue-100 text-blue-600"
                                                            />
                                                            <div>
                                                                <p className="font-medium text-gray-800 m-0">{articulo.nombre}</p>
                                                                <p className="text-xs text-gray-500 line-clamp-1">
                                                                    {articulo.descripcion || 'Sin descripción'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Tag
                                                            value="Disponible"
                                                            severity="success"
                                                            className="mt-2 text-xs"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-column align-items-center py-4">
                                            <i className="pi pi-inbox text-5xl text-gray-400 mb-2"></i>
                                            <p className="text-gray-500 font-medium">
                                                {formData.categoria ? 
                                                    'No hay artículos en esta categoría' : 
                                                    'Seleccione una categoría para ver sus artículos'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-content-end gap-3">
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            className="p-button-outlined"
                            onClick={handleOnHide}
                        />
                        <Button
                            label="Crear almacén"
                            className=""
                            onClick={() => CrearAlmacen()}
                            disabled={
                                !formData.identificador || 
                                !formData.categoria || 
                                !formData.encargado || 
                                Object.values(errors).some(error => error !== undefined)
                            }
                        />
                    </div>
                </div>
            )}
        </Dialog>
    );
};

export default AlmacenModal;