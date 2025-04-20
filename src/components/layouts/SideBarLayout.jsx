import React,{useState,useContext} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarContainer from '../sidebar/SidebarContainer';
import ConfirmDialog from '../../components/confirm/ConfirmDialog';
import AuthContext from '../../context/AuthContext';
import { AlertHelper } from '../../utilities/alerts/AlertHelper';

const SidebarLayout = () => {
    const [visible, setVisible] = useState(false);
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const toggleSidebar = () => setCollapsed(prev => !prev);

    const logout =  () => {
        AlertHelper.showAlert("Sesión cerrada", "success");
         dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setVisible(false);
            setVisibleSidebar(false);
        navigate('/login');
    };

    return (
        <div className="flex h-screen">
            <SidebarContainer 
                collapsed={collapsed} 
                toggleSidebar={toggleSidebar} 
                onLogout={() => setVisible(true)} 
                setVisible={setVisibleSidebar} 
            />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                onConfirm={logout}
                title="Cerrar sesión"
                message="¿Está seguro de que desea cerrar sesión?"
            />
            <div className={`flex-1 overflow-auto transition-all transition-duration-300 ${collapsed ? 'ml-4rem' : 'ml-18rem'}`}>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default SidebarLayout