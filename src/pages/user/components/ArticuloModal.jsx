import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { FancyInput } from '../../../components/inputs/FancyInput';
import { ListCategoriasAll } from '../../../services/admin/ListCategorias';
import { getAlmacenes } from '../../../services/admin/AlmacenesList';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { DropdownValidator, inputsValidator } from '../../../utilities/validators/ArticulosValidator';
import { addArticulo } from '../../../services/admin/AddArticulo';
import { AlertHelper } from '../../../utilities/alerts/AlertHelper';
import { updateArticulo } from '../../../services/admin/UpdateArticulo';

const ArticuloModal = ({ initialData, visible, onhide, mode, loading }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria: null,
        almacenes: []
    });



    const [errors, setErrors] = useState({});
    const [errorsAlamacenes, setErrorsAlmacenes] = useState({});



    const [categorias, setCategorias] = useState([]);
    const [almacenesOptions, setAlmacenesOptions] = useState([]);

    useEffect(() => {
        // Cargar categorías y almacenes
        const loadData = async () => {
            const cats = await ListCategoriasAll();
            const alms = await getAlmacenes();

            setCategorias(cats.map(c => ({
                label: c.nombre,
                value: c.id
            })));

            setAlmacenesOptions(alms.map(a => ({
                label: a.identificador,
                value: a.id
            })));
        };

        loadData();

        // Inicializar formData según el modo
        if (mode === 'editar' && initialData) {
            setFormData({
                nombre: initialData.nombre,
                descripcion: initialData.descripcion,
                categoria: initialData.categoria?.id || null,
                almacenes: initialData.almacenes?.id || []
            });
        } else {
            setFormData({
                nombre: "",
                descripcion: "",
                categoria: null,
                almacenes: []
            });
        }
    }, [initialData, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validar el campo
        const validateErrros = inputsValidator({
            ...formData,
            [name]: value
        })
        setErrors(validateErrros);

    };

    const handleDropdownChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.value }));
        // Validar el campo
        const validateErrros = DropdownValidator({
            ...formData,
            [e.target.name]: e.value
        })
        setErrorsAlmacenes(validateErrros);
    };

    const onHide = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            categoria: null,
            almacenes: []
        });
        onhide(false);
        setErrors({});

    }

    const enviarDatos = async () => {
        try {
            if (mode === 'editar') {
                await updateArticulo(formData, initialData.id);
            } else {
                await addArticulo(formData);
            }
        } catch (error) {
            AlertHelper.showAlert({
                message: mode === 'editar' ? "No se pudo editar el artículo" : "No se pudo crear el artículo",
                type: "error"
            });
         
        } finally {
            onHide();
            setErrors({});
            setFormData({
                nombre: "",
                descripcion: "",
                categoria: null,
                almacenes: []
            });
            loading(true);

        }

    }

    return (
        <Dialog
            header={
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag" style={{ fontSize: '1.25rem' }}></i>
                    <span>{mode === 'editar' ? 'Editar Artículo' : 'Crear Artículo'}</span>
                </div>
            }
            visible={visible}
            onHide={() => onhide(false)}
            style={{ width: '40vw' }}
            breakpoints={{ '960px': '75vw', '640px': '90vw' }}
        >
            <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round mb-4">
                <h2 className="text-2xl font-bold text-indigo-800 m-0">
                    {mode === 'editar' ? 'Editar artículo' : 'Nuevo artículo'}
                </h2>
                <Avatar
                    icon="pi pi-tag"
                    size="xlarge"
                    shape="circle"
                    className="bg-indigo-100 text-indigo-600"
                />
            </div>
            {
                mode === 'editar' ? (
                    <div className="formgrid grid">
                        <div className="field col-12">
                            <FancyInput
                                name="nombre"
                                label="Nombre del artículo"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                icon={<i className="pi pi-tag" />}
                                required
                                errorMessage={errors.nombre}
                            />
                        </div>

                        <div className="field col-12">
                            <FancyInput
                                name="descripcion"
                                label="Descripción"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                icon={<i className="pi pi-align-left" />}
                                errorMessage={errors.descripcion}
                            />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="categoria" className="block text-600 text-sm font-medium mb-2">
                                Categoría*
                            </label>
                            <Dropdown
                                id="categoria"
                                name="categoria"
                                value={formData.categoria}
                                options={categorias}
                                onChange={handleDropdownChange}
                                optionLabel="label"
                                placeholder="Seleccione categoría"
                                className="w-full"
                            />
                            {errorsAlamacenes.categoria && (
                                <small className="p-error">{errors.categoria}</small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="almacenes" className="block text-600 text-sm font-medium mb-2">
                                Almacenes*
                            </label>
                            <Dropdown
                                id="almacenes"
                                name="almacenes"
                                value={formData.almacenes}
                                options={almacenesOptions}
                                onChange={handleDropdownChange}
                                optionLabel="label"
                                placeholder="Seleccione almacenes"
                                className="w-full"
                                multiple
                            />
                            {errorsAlamacenes.almacenes && (
                                <small className="p-error">{errors.almacenes}</small>
                            )}
                        </div>

                        <div className="field col-12 flex justify-content-end">
                            <button
                                type="button"
                                className="p-button p-component p-button-text"
                                onClick={() => onHide()}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="p-button p-component p-button-primary ml-2"
                                onClick={() => enviarDatos()}
                                disabled={
                                    Object.keys(errors).length > 0 ||
                                    !formData.nombre ||
                                    !formData.descripcion ||
                                    !formData.categoria ||
                                    formData.almacenes.length === 0
                                }
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                ) : (

                    <div className="formgrid grid">
                        <div className="field col-12">
                            <FancyInput
                                name="nombre"
                                label="Nombre del artículo"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                icon={<i className="pi pi-tag" />}
                                required
                                errorMessage={errors.nombre}
                            />
                        </div>

                        <div className="field col-12">
                            <FancyInput
                                name="descripcion"
                                label="Descripción"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                icon={<i className="pi pi-align-left" />}
                                errorMessage={errors.descripcion}
                            />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="categoria" className="block text-600 text-sm font-medium mb-2">
                                Categoría*
                            </label>
                            <Dropdown
                                id="categoria"
                                name="categoria"
                                value={formData.categoria}
                                options={categorias}
                                onChange={handleDropdownChange}
                                optionLabel="label"
                                placeholder="Seleccione categoría"
                                className="w-full"
                            />
                            {errors.categoria && (
                                <small className="p-error">{errors.categoria}</small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="almacenes" className="block text-600 text-sm font-medium mb-2">
                                Almacenes*
                            </label>
                            <Dropdown
                                id="almacenes"
                                name="almacenes"
                                value={formData.almacenes}
                                options={almacenesOptions}

                                onChange={handleDropdownChange}
                                optionLabel="label"
                                placeholder="Seleccione almacenes"
                                className="w-full"
                                multiple
                            />
                            {errors.almacenes && (
                                <small className="p-error">{errors.almacenes}</small>
                            )}
                        </div>

                        <div className="field col-12 flex justify-content-end">
                            <button
                                type="button"
                                className="p-button p-component p-button-text"
                                onClick={() => onHide()}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="p-button p-component p-button-primary ml-2"
                                onClick={() => enviarDatos()}
                                disabled={
                                    Object.keys(errors).length > 0 ||
                                    !formData.nombre ||
                                    !formData.descripcion ||
                                    !formData.categoria ||
                                    formData.almacenes.length === 0
                                }
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                )
            }

        </Dialog>
    );
};

export default ArticuloModal;