import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';


const menuItems = [
    { label: 'Usuarios', icon: 'pi pi-user', path: '/' },
    { label: 'Almacenes', icon: 'pi pi-building-columns', path: '/almacenes' },
    { label: 'Categorías', icon: 'pi pi-objects-column', path: '/categorias' },
    { label: 'Artículos', icon: 'pi pi-tag', path: '/articulos' },
    { label: 'Bitacora', icon: 'pi pi-database', path: '/bitacora' },
];

const SidebarMenu = ({ collapsed }) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex-1 overflow-y-auto surface-section">
            <ul className="list-none p-0 m-0">
                {menuItems.map((item) => {
                    const btnId = `menu-btn-${item.path.replace('/', '')}`;
                    return (
                        <li key={item.path}>
                            <Tooltip target={`#${btnId}`} content={item.label} position="right" disabled={!collapsed} />
                            <Button 
                                id={btnId}
                                text
                                className={`w-full p-3 justify-content-start ${collapsed ? 'justify-content-center' : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <i className={`${item.icon} ${collapsed ? '' : 'mr-3'}`} />
                                {!collapsed && <span className="font-big">{item.label}</span>}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default SidebarMenu;