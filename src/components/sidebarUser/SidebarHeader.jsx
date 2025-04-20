import React from 'react';
import { Button } from 'primereact/button';

const SidebarHeader = ({ collapsed, toggleSidebar }) => {
    return (
        <div className={`flex justify-content-between align-items-center py-4 px-3 surface-card`}>
            {!collapsed && (
                <img 
                    src="/src/assets/react.svg" 
                    alt="CAMILA FINANZAS" 
                    className="w-8rem"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=LOGO';
                        e.target.onerror = null;
                    }}
                />
            )}
            <Button 
                icon="pi pi-bars" 
                text 
                onClick={toggleSidebar}
                className="p-1"
                tooltip={collapsed ? "Expandir menú" : ""}
                tooltipOptions={{ position: 'right' }}
            />
        </div>
    );
};

export default SidebarHeader;
