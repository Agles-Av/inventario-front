import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { FancyInput } from '../../../components/inputs/FancyInput';
import { Button } from 'primereact/button';
import { CategoriaValidator } from '../../../utilities/validators/CategoriaValidators';
import { AddCategoria } from '../../../services/admin/AddCategoria';
import { AlertHelper } from '../../../utilities/alerts/AlertHelper';

const CategoriaModal = ({ initialData, visible, onhide, loading, mode }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        articulo: [],
        almacen: [],
    });
    const [error, setError] = useState({});
    const handleOnHide = () => {
        onhide(false);
        setFormData({
            nombre: '',
            articulo: [],
            almacen: [],
        });
        setError({});
        loading(true);
    };
    
    const handleOnChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
      
        // Valida TODO el form, devuelve sólo las claves con error
        const validationErrors = CategoriaValidator({
          ...formData,
          [name]: value
        });
      
        setError(validationErrors);
      }
      

    const saveCategoria = async () => {
        try {
            await AddCategoria(formData);
        } catch (error) {
            AlertHelper.showAlert("No se pudo crear la categoria", "error");
        }finally{
            setFormData({
                nombre: '',
                articulo: [],
                almacen: [],
            });
            onhide(false);
            loading(true);
        }
        
    }

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || '',
                articulo: initialData.articulo || [],
                almacen: initialData.almacen || [],
            });
        } else {
            setFormData({
                nombre: '',
                articulo: [],
                almacen: [],
            });
        }
    }, [initialData]);
    return (
        <Dialog
            header={
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag" style={{ fontSize: '1.25rem' }}></i>
                    <span>Detalles de la categoría</span>
                </div>
            }
            visible={visible}
            onHide={handleOnHide}
            style={mode === "detalles" ? { width: '80vw' }: { width: '40vw' }}
            breakpoints={{ '960px': '75vw', '640px': '90vw' }}
            draggable={false}
            className="shadow-5"
        >
            {mode === 'detalles' ? (
                <div className="flex flex-column gap-5">
                    {/* Header */}
                    <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round">
                        <div>
                            <Tag
                                value={`ID: ${initialData?.id || 'N/A'}`}
                                severity="info"
                                className="font-bold"
                            />
                            <h2 className="text-2xl font-bold mt-2 text-indigo-800">
                                {initialData?.nombre || 'Categoría sin nombre'}
                            </h2>
                        </div>
                        <Avatar
                            icon="pi pi-tag"
                            size="xlarge"
                            shape="circle"
                            className="bg-indigo-100 text-indigo-600 shadow-3"
                        />
                    </div>

                    {/* Descripción */}
                    {initialData?.descripcion && (
                        <Card className="shadow-2 border-round">
                            <div className="flex align-items-center gap-3 mb-3">
                                <Avatar
                                    icon="pi pi-align-left"
                                    size="large"
                                    shape="circle"
                                    className="bg-blue-100 text-blue-600"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 m-0">Descripción</h3>
                                    <p className="text-sm text-gray-500 m-0">Información adicional</p>
                                </div>
                            </div>
                            <Divider />
                            <p className="text-gray-800">{initialData.descripcion}</p>
                        </Card>
                    )}

                    {/* Artículos */}
                    <Card className="shadow-2 border-round">
                        <div className="flex align-items-center gap-3 mb-3">
                            <Avatar
                                icon="pi pi-shopping-bag"
                                size="large"
                                shape="circle"
                                className="bg-purple-100 text-purple-600"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 m-0">Artículos</h3>
                                <p className="text-sm text-gray-500 m-0">
                                    {initialData?.articulo?.length || 0} artículos en esta categoría
                                </p>
                            </div>
                        </div>
                        <Divider />
                        {initialData?.articulo?.length > 0 ? (
                            <div className="grid">
                                {initialData.articulo.map((articulo) => (
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
                    </Card>

                    {/* Almacenes */}
                    <Card className="shadow-2 border-round">
                        <div className="flex align-items-center gap-3 mb-3">
                            <Avatar
                                icon="pi pi-warehouse"
                                size="large"
                                shape="circle"
                                className="bg-amber-100 text-amber-600"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 m-0">Almacenes</h3>
                                <p className="text-sm text-gray-500 m-0">
                                    {initialData?.almacen?.length || 0} almacenes con esta categoría
                                </p>
                            </div>
                        </div>
                        <Divider />
                        {initialData?.almacen?.length > 0 ? (
                            <div className="grid">
                                {initialData.almacen.map((almacen) => (
                                    <div key={almacen.id} className="col-12 sm:col-6 lg:col-4">
                                        <div className="p-3 border-1 surface-border border-round surface-card hover:shadow-3 transition-duration-150 transition-all">
                                            <div className="flex align-items-center gap-3">
                                                <Avatar
                                                    icon="pi pi-building"
                                                    size="normal"
                                                    shape="circle"
                                                    className="bg-green-100 text-green-600"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800 m-0">
                                                        Almacén {almacen.identificador}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ID: {almacen.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <Tag
                                                value="Activo"
                                                severity="info"
                                                className="mt-2 text-xs"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-column align-items-center py-4">
                                <i className="pi pi-map-marker text-5xl text-gray-400 mb-2"></i>
                                <p className="text-gray-500 font-medium">No asignada a ningún almacén</p>
                            </div>
                        )}
                    </Card>
                </div>
            ) : (
                <div>
                    <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round">
                        <div>

                            <h2 className="text-2xl font-bold mt-2 text-indigo-800">
                                Crea una nueva categoría
                            </h2>
                        </div>
                        <Avatar
                            icon="pi pi-tag"
                            size="xlarge"
                            shape="circle"
                            className="bg-indigo-100 text-indigo-600 shadow-3"
                        />
                    </div>
                    <div className="w-full mt-5">
                        <FancyInput
                        name="nombre"
                        label="Nombre de la categoría"
                        value={formData.nombre.trim()}
                        onChange={handleOnChange}
                        type='text'
                        icon={<i className="pi pi-tag" />}
                        errorMessage={error.nombre}
                        maxLength={50}

                        />
                    </div>
                    <Button
                    label='Guardar categoría'
                    icon='pi pi-save'
                    className='w-full mt-5'
                    onClick={()=>saveCategoria()}
                    disabled={!formData.nombre.trim() || Object.keys(error).length > 0}
                    />
                </div>

            )}
        </Dialog>
    );
};

export default CategoriaModal;