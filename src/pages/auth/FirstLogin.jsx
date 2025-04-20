import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { FancyInput } from '../../components/inputs/FancyInput'
import { FirstLoginCredenciales } from '../../models/auth/FirstLoginCredenciales'
import { FirstLoginService } from '../../services/auth/FirstLogin'
import AuthContext from '../../context/AuthContext'



const FirstLogin = () => {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPassword(value);
        const updateErrors = { ...errors };
        const singleFieldError = { [name]: value ? '' : 'Campo requerido' };
        updateErrors[name] = singleFieldError[name];
        setErrors(updateErrors);
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const credenciales = new FirstLoginCredenciales(newPassword.trim())
        const changePassword = await FirstLoginService(credenciales);
        console.log(changePassword);
        dispatch({ type: "LOGIN", payload: { ...changePassword, firstLogin: false } });
        localStorage.setItem("firstLogin", "false");
        setRedirect(true);
    }

    useEffect(()=>{
        if (redirect) {
            navigate('/', { replace: true });
        }
    },[redirect, navigate])
    return (
        <div className='flex justify-content-center align-items-center h-full w-full'>
            <Card
                title="¡Es tu primera vez por aquí, cambia tu contraseña!"
                className='w-25rem h-25rem text-primary'
                subTitle="Al cambiar tu contraseña, podrás iniciar sesión con tu usuario y tu nueva contraseña."
            >
                <form onSubmit={handleChangePassword}>
                    <div className=' mt-3'>
                        <FloatLabel>
                            <FancyInput
                                name="password"
                                label="Nueva contraseña"
                                type="password"
                                value={newPassword}
                                onChange={handleChange}
                                icon={<i className="pi pi-lock" />}
                                errorMessage={errors.newPassword}
                                maxLength={50}
                            />
                        </FloatLabel>
                    </div>
                    <div className='flex justify-content-center mt-5'>
                        <Button
                            label="Cambiar contraseña"
                            icon="pi pi-sign-in"
                            className='w-full'
                            type="submit"
                            disabled={!newPassword}
                        />
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default FirstLogin