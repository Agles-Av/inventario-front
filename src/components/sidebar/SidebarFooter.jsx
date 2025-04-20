import React from 'react';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

const SidebarFooter = ({ collapsed, onLogoutClick }) => {
    return (
        <div className="p-3 surface-card">
            <Tooltip 
                target=".logout-btn" 
                content="Cerrar sesión" 
                position="right" 
                disabled={!collapsed} 
            />
            <Button 
                text
                className={`w-full p-3 border-none justify-content-start logout-btn ${collapsed ? 'justify-content-center' : ''}`}
                onClick={onLogoutClick}
            >
                <i className={`pi pi-sign-out ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span className="font-medium">Cerrar sesión</span>}
            </Button>
        </div>
    );
};

export default SidebarFooter;
