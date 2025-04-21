import { Dialog } from 'primereact/dialog'
import { Avatar } from 'primereact/avatar'
import React, { useEffect, useState } from 'react'
import { FancyInput } from '../../../components/inputs/FancyInput';
import { Button } from 'primereact/button';
import { inputsValidator } from '../../../utilities/validators/ArticulosValidator';
import { addArticulo } from '../../../services/admin/AddArticulo';
import { updateArticulo } from '../../../services/admin/UpdateArticulo';

const ResponsableArticuloModal = ({ initialData, visible, onhide, mode, loading, almacen }) => {

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    almacenes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

     const validateErrros = inputsValidator({
                ...formData,
                [name]: value
            })
            setErrors(validateErrros);
  }

  useEffect(() => {
    if (mode === 'editar' && initialData) {
      setFormData({
        nombre: initialData.nombre,
        descripcion: initialData.descripcion,
        categoria: initialData.categoria.id,
        almacenes: almacen.id,
      })
    } else if (almacen) {
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: almacen.categoria.id,
        almacenes: almacen.id,
      })
    }
  }, [initialData, mode, almacen]);

  const onHide = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      categoria: '',
      almacen: ''
    });
    onhide(false);
  }
  const enviarDatos = async () => {
    try {
      if (mode === 'editar') {

      await updateArticulo(formData,initialData.id);
    } else {
      await addArticulo(formData);

    }
    } catch (error) {
      
    }finally{
      onHide(false);
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: '',
        almacenes: ''
      });
      setErrors({});
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
      <div className='mt-5 w-full'>
        <FancyInput
          name={"nombre"}
          label={"Nombre"}
          type={"text"}
          value={formData.nombre}
          onChange={handleChange}
          icon={<i className="pi pi-tag" />}
          errorMessage={errors.nombre}
          maxLength={50}
        />
      </div>
      <div className='mt-5 w-full'>
        <FancyInput
          name={"descripcion"}
          label={"Descripción"}
          type={"text"}
          value={formData.descripcion}
          onChange={handleChange}
          icon={<i className="pi pi-tag" />}
          errorMessage={errors.descripcion}
          maxLength={50}
        />
      </div>
      <div className="field col-12 flex justify-content-end">
        <Button
          label="Cancelar"
          type="button"
          className="p-button p-component p-button-text"
          onClick={() => onHide()}
        />
        <Button
          label={mode === 'editar' ? 'Actualizar' : 'Crear'}
          type="button"
          className="p-button p-component p-button-primary ml-2"
          onClick={() => enviarDatos()}
          disabled={!formData.nombre || !formData.descripcion  || Object.keys(errors).length > 0}
        />
      </div>
    </Dialog>
  )
}

export default ResponsableArticuloModal