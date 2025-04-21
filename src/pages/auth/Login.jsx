import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import AuthContext from '../../context/AuthContext'
import { LoginService } from '../../services/auth/LoginService'
import { LoginCredenciales } from '../../models/auth/LoginCredenciales'
import { AlertHelper } from '../../utilities/alerts/AlertHelper'
import { Player } from '@lottiefiles/react-lottie-player';
import { Card } from 'primereact/card'
import { FloatLabel } from 'primereact/floatlabel'
import { FancyInput } from '../../components/inputs/FancyInput'
import {loginValidator} from '../../utilities/validators/loginValidators'

const Login = () => {
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const updateErrors = {...errors};
        const singleFieldError = loginValidator({...formData, [name]: value });
        updateErrors[name] = singleFieldError[name];
        setErrors(updateErrors); 
    };
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const credenciales = new LoginCredenciales(formData.username.trim(), formData.password.trim()) 
            const user = await LoginService(credenciales)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', user.token)
            localStorage.setItem('role', user.user.role)
            localStorage.setItem('status', user.user.status)
            dispatch({ type: 'LOGIN', payload: user, role: user.user.role, status: user.user.status })
            navigate('/', { replace: true })
        } catch (error) {
            localStorage.removeItem('user')
        }finally{
            setFormData({
                username: '',
                password: ''
            })
            setErrors({});
        }
    }
    return (
        <div className='flex h-screen w-screen'>

            <div className='flex-1 flex justify-content-end align-items-center w-full'> 
                <Card
                    title="¡Bienvenido, inicia sesión!"
                    className='w-25rem h-25rem text-primary'
                >
                    <form onSubmit={handleLogin}>
                        <div className=' mt-3'>
                            <FloatLabel>
                                <FancyInput
                                name="username"
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
                        <div className='w-full  mt-5'>
                            <FancyInput
                                name="password"
                                label="Contraseña"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                icon={<i className="pi pi-lock" />}
                                errorMessage={errors.password}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            
                        </div>
                        <div className='flex justify-content-center mt-5'>
                            <Button
                                label="Iniciar sesión"
                                icon="pi pi-sign-in"
                                className='w-full mt-5'
                                type="submit"
                                disabled={!formData.username || !formData.password}
                            />
                        </div>
                    </form>
                </Card>
            </div>
            <div className='flex-1 flex align-items-center'>
                <Player
                    autoplay
                    loop
                    src="/src/assets/Animation - 1744997078251.json"
                    style={{ width: '80%', height: '80%' }}
                />
            </div>
        </div>

    )
}

export default Login