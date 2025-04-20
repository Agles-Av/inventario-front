import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';

const SidebarContainer = ({ collapsed, toggleSidebar, onLogout, setVisible }) => {
    return (
        <div className={`h-screen shadow-2 flex flex-column transition-all transition-duration-300 
            ${collapsed ? 'w-4rem' : 'w-18rem'} surface-ground`}>
            <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <SidebarMenu collapsed={collapsed} />
            <SidebarFooter collapsed={collapsed} setVisible={setVisible} onLogoutClick={onLogout} />
        </div>
    );
};

export default SidebarContainer;