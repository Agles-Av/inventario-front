import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { FancyTable } from '../../components/tables/FancyTable';
import { Button } from 'primereact/button';
import { ListUsersService } from '../../services/admin/ListUsers';
import { Estados } from '../../utilities/validators/Estados';
import UserModal from './components/UserModal';
import { DisableUser } from '../../services/admin/DisableUser';
import ConfirmDialog from './../../components/confirm/ConfirmDialog';
import { AlertHelper } from '../../utilities/alerts/AlertHelper';

const ListUsers = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        fetchResponsables();
    }, []);

    const fetchResponsables = async () => {
        try {
            const response = await ListUsersService();
            // Filtrar los usuarios para excluir los de rol ADMIN
            const filteredResponse = response.filter(user => user.role !== 'ADMIN');
            setData(filteredResponse);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'id', header: '#', sortable: true },
        { field: 'name', header: 'Nombre', sortable: true },
        { field: 'username', header: 'Usuario', sortable: true },
        { field: 'email', header: 'correo', sortable: true },
        {
            field: 'status',
            header: 'Estado',
            sortable: true,
            body: (rowData) => {
               return Estados(rowData.status);
            }
          },
        {
            field: 'almacen',
            header: 'Almacén',
            sortable: true,
            body: (rowData) => (
                <div className='flex justify-content-center bg-yellow-300 border-round-sm p-2'>
                    <span className='font-medium text-yellow-700'>{rowData.almacen?.identificador || 'No asignado' }</span>
                </div>

            )
        }
    ];


    const actionsTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center ">
                <Button
                    icon="pi pi-pencil text-bleu-500"
                    className="text-blue-500 bg-blue-100 p-button-sm p-button-text"
                    tooltip="Editar"
                    tooltipOptions={{ position: 'top' }}
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon={rowData.status ? "pi pi-trash" : "pi pi-check-circle text-green-600"}
                    className={`text-${rowData.status ? 'red' : 'green'}-500 bg-${rowData.status ? 'red' : 'green'}-100 p-button-sm p-button-text`}
                    tooltip={rowData.status ? "Desactivar" : "Activar"}
                    tooltipOptions={{ position: 'top' }}
                    onClick={() => setDisable(true) & setUserData(rowData)}
                    
                />
            </div>
        );
    };

    const handleEdit = (user) => {
        setInitialData(user);
        setMode('edit');
        setVisible(true);
    };

    const handleDelete = async () => {
        
        try {
            await DisableUser(userData.id);
        } catch (error) {
            AlertHelper.showAlert("No se pudo desactivar el responsable", "error");
        }finally{
            setDisable(false);
            setUserData(null);
            fetchResponsables();
        }
    };

    const handleAdd = () => {
        setMode('create');
        setVisible(true);
    };

    return (
        <div className='ml-2 w-full h-full'>
            <Card
                title="Lista de Responsables"
                subTitle="Aquí puedes ver la lista de responsables, así como agregar, editar o eliminar responsables además de asignar un almacén a un responsable."
                className='text-primary w-full h-full'
            />

            <div className='mt-5 h-full w-full '>
                <FancyTable
                    className=''
                    data={data}
                    columns={columns}
                    globalFilterFields={['name', 'username', 'role']}
                    actions={actionsTemplate}
                    showAddButton={true}
                    onAddClick={handleAdd}
                    loading={loading}
                    emptyMessage="No se encontraron responsables, capo."
                    rowClassName={"bg-white"}
                />
            </div>
            <UserModal visible={visible} mode={mode} onhide={setVisible} initialdata={initialData}  loading={fetchResponsables} />
            <ConfirmDialog visible={disable} onHide={()=>setDisable(false)} onConfirm={handleDelete} 
            title={userData?.status ? 'Desactivar responsable' : 'Activar responsable'}
            message={
                userData?.status ? 
                '¿Estás seguro de que deseas desactivar al responsable?'
                : '¿Estás seguro de que deseas activar al responsable?'
            }
            />
        </div>
    );
};

export default ListUsers;
