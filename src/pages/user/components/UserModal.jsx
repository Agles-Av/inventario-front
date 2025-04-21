import { Dialog } from 'primereact/dialog'
import { FloatLabel } from 'primereact/floatlabel'
import React, { useEffect, useState } from 'react'
import { FancyInput } from '../../../components/inputs/FancyInput'
import { Button } from 'primereact/button'
import { userValidator } from '../../../utilities/validators/UserValidators'
import { UpdateUser } from '../../../services/admin/UpdateUser'
import { AlertHelper } from '../../../utilities/alerts/AlertHelper'
import { AddUser } from '../../../services/admin/AddUser'
import { Avatar } from 'primereact/avatar'

const UserModal = ({ visible, onhide, initialdata, mode, loading }) => {

    const [formData, setFormData] = useState({
        id: null,
        email: '',
        name: '',
        lastName: '',
        username: '',
        password: '',
        rol: '',
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (mode === 'edit') {
            setFormData({
                id: initialdata.id,
                email: initialdata.email,
                name: initialdata.name,
                lastName: initialdata.lastName,
                username: initialdata.username,
                password: '',
                rol: initialdata.role || '',
            });
        } else {
            setFormData({
                id: null,
                email: '',
                name: '',
                lastName: '',
                username: '',
                password: '',
                rol: 'RESPONSABLE',
            });
        }
    }, [initialdata, mode]);



    const handleChange = (e) => {
        const { name, value } = e.target || e;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const updateErrors = { ...errors };
        const singleFieldError = userValidator({ ...formData, [name]: value });
        updateErrors[name] = singleFieldError[name];
        setErrors(updateErrors);
    };

    const handleOnHide = () => {
        onhide(false)
        setErrors({});
    }
    const hangleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'edit') {
            try {
                await UpdateUser(formData);
            } catch (error) {
                AlertHelper.showAlert("Error al actualizar el usuario", "error");
            } finally {
                setFormData({
                    id: null,
                    email: '',
                    name: '',
                    lastName: '',
                    username: '',
                    password: ''

                });
                setErrors({});
                onhide(false);
                loading(true);
            }
        } else if (mode === 'create') {
            try {
                await AddUser(formData);
            } catch (error) {
                AlertHelper.showAlert(error.message, "error");
            } finally {
                setFormData({
                    id: null,
                    email: '',
                    name: '',
                    lastName: '',
                    username: '',
                    password: ''
                });
                setErrors({});
                onhide(false);
                loading(true);
            }
        }
    }
    return (
        <Dialog
            header="Detalles del usuario"
            visible={visible}
            onHide={handleOnHide}
            style={{ width: "50vw" }}
        >
            <div className="flex justify-content-between align-items-center bg-indigo-50 p-3 border-round">
                <div>
                    <h2 className="text-2xl font-bold mt-2 text-indigo-800">
                        
                        {mode === 'edit' ? 'Editar usuario' : 'Crear usuario'}
                        {mode === 'edit' ? <i className="pi pi-pencil ml-2"></i> : <i className="pi pi-plus ml-2"></i>}
                    </h2>
                </div>
                <Avatar
                    icon="pi pi-user"
                    size="xlarge"
                    shape="circle"
                    className="bg-indigo-100 text-indigo-600 shadow-3"
                />
            </div>

            {mode === 'edit' ? (
                <div>
                    <form onSubmit={hangleSubmit}>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="email"
                                    required
                                    label="Correo electrónico"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-envelope" />}
                                    errorMessage={errors.email}
                                    maxLength={76}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="name"
                                    required
                                    label="nombre"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-id-card" />}
                                    errorMessage={errors.name}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="lastName"
                                    required
                                    label="apellidos"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-id-card" />}
                                    errorMessage={errors.lastName}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="username"
                                    required
                                    label="Usuario"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-user" />}
                                    errorMessage={errors.username}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="password"
                                    required
                                    label="Contraseña"
                                    type="password"
                                    value={""}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-lock" />}
                                    errorMessage={errors.password}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='flex justify-content-between mt-5'>
                            <Button
                                label='Cancelar'
                                icon="pi pi-times"
                                className='w-full'
                                type='button'
                                onClick={handleOnHide}
                            />
                            <Button
                                label='Guardar'
                                icon="pi pi-save"
                                className='w-full ml-2'
                                type="submit"
                                disabled={Object.values(errors).some(error => error)}
                            />

                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <form onSubmit={hangleSubmit}>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="email"
                                    required
                                    label="Correo electrónico"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-envelope" />}
                                    errorMessage={errors.email}
                                    maxLength={76}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="name"
                                    required
                                    label="nombre"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-id-card" />}
                                    errorMessage={errors.name}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="lastName"
                                    required
                                    label="apellidos"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-id-card" />}
                                    errorMessage={errors.lastName}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>
                        <div className='mt-5'>
                            <FloatLabel>
                                <FancyInput
                                    name="username"
                                    required
                                    label="Usuario"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    icon={<i className="pi pi-user" />}
                                    errorMessage={errors.username}
                                    maxLength={50}
                                />
                            </FloatLabel>
                        </div>

                        <div className='flex justify-content-between mt-5'>
                            <Button
                                label='Cancelar'
                                icon="pi pi-times"
                                className='w-full'
                                type='button'
                                onClick={handleOnHide}
                            />
                            <Button
                                label='Guardar'
                                icon="pi pi-save"
                                className='w-full ml-2'
                                type="submit"
                                disabled={Object.values(errors).some(error => error) || !formData.name || !formData.lastName || !formData.username || !formData.email}
                            />

                        </div>
                    </form>
                </div>
            )}
        </Dialog>
    )
}

export default UserModal