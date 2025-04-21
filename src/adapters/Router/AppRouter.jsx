import React, { useContext, Suspense, lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import SidebarLayout from '../../components/layouts/SideBarLayout'
import SpinnerLazy from '../../utilities/Spinners/SpinnerLazy'
import NotFound404 from '../../pages/error/notFound404'
import SideBarResponsable from '../../components/layouts/SideBarResponsable'


const AppRouter = () => {
    // Lazy load the components
    const Login = lazy(() => import('../../pages/auth/Login'))
    const FirstLogin = lazy(() => import('../../pages/auth/firstLogin'))
    const ListUsers = lazy(() => import('../../pages/user/ListUsers'))
    const ListAlmacenes = lazy(() => import('../../pages/user/ListAlmacenes'))
    const ListArticulos = lazy(() => import('../../pages/user/ListArticulos'))
    const ListCategorias = lazy(() => import('../../pages/user/ListCategorias'))
    const Bitacora = lazy(() => import('../../pages/user/Bitacora'))
    const ResponsableListArticulos = lazy(() => import('../../pages/user/ResponsableListArticulos'))
    //usar el contexto de autenticación
    const { firstLogin, user } = useContext(AuthContext)
    const role = user?.user?.role || localStorage.getItem('role') || "";
    const firstLogin1 = firstLogin || localStorage.getItem('firstLogin') || "";
    if (user?.isAuthenticated && !role) {
        return <SpinnerLazy />
    }



    const paths = (role) => {
        switch (role) {
            case 'ADMIN':
                return (
                    <Route path='/' element={<SidebarLayout />}>
                        <Route index element={
                            <Suspense fallback={<SpinnerLazy />}>
                                <ListUsers/>
                            </Suspense>
                            } />
                        <Route path='/almacenes' element={
                            <Suspense fallback={<SpinnerLazy />}>
                                <ListAlmacenes/>
                            </Suspense>
                        }/>
                        <Route path='/articulos' element={
                            <Suspense fallback={<SpinnerLazy />}>
                                <ListArticulos/>
                            </Suspense>
                        }/>
                        <Route path='/categorias' element={
                            <Suspense fallback={<SpinnerLazy />}>
                                <ListCategorias/>
                            </Suspense>
                        }/>
                        <Route path='/bitacora' element={
                            <Suspense fallback={<SpinnerLazy />}>
                                <Bitacora/>
                            </Suspense>
                        }/>
                    </Route>
                )
            case 'RESPONSABLE':
                return (
                    <Route path='/' element={<SideBarResponsable/>}>
                        <Route index element={
                            <Suspense fallback={<SpinnerLazy />}>
                               <ResponsableListArticulos/>
                            </Suspense>
                        }/>
                    </Route>
                )
            default:
                return null
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* Ruta raíz que redirige según autenticación */}
                <Route path="/" element={
                    user?.isAuthenticated ? (
                        firstLogin1 === 'true'
                            ? <Navigate to="/first-login" replace />
                            : <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                } />


                {/* Ruta de primer login */}
                <Route
                    path="/first-login"
                    element={
                        user?.isAuthenticated && firstLogin1 === 'true'
                            ? <Suspense fallback={<SpinnerLazy />}>
                                <FirstLogin />
                            </Suspense>
                            : <Navigate to="/" replace />
                    }
                />



                {/* Rutas protegidas */}
                {user?.isAuthenticated && firstLogin1 === "false" && paths(role)}

                {/* Ruta de login */}
                <Route path="/login"
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                            {!user?.isAuthenticated ? <Login /> : <Navigate to="/" replace />}
                        </Suspense>
                    }
                />

                {/* Manejo de 404 */}
                <Route path="*" element={
                    <Suspense fallback={<SpinnerLazy />}>
                        {user?.isAuthenticated ? <NotFound404/> : <Navigate to="/login" replace />}
                    </Suspense>
                } />
            </>
        )
    )

    return <RouterProvider router={router} />
}

export default AppRouter