import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { FancyTable } from '../../components/tables/FancyTable';
import { getAlmacenes } from '../../services/admin/AlmacenesList';
import { AlertHelper } from '../../utilities/alerts/AlertHelper';
import AlmacenModal from './components/AlmacenModal';

const ListAlmacenes = () => {
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState({});

    const fetchAlmacenes = async () => {
        try {
            const response = await getAlmacenes();
            setAlmacenes(response);
        } catch (error) {
            AlertHelper.showAlert("No se pudieron cargar los almacenes", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlmacenes();
    }, [loading]);

    const columns = [
        { field: 'id', header: '#', sortable: true },
        { field: 'identificador', header: 'Identificador', sortable: true },
        { field: 'categoria', header: 'Categoria', sortable: true, body: (rowData) => rowData.categoria?.nombre || 'Sin categoría'},
        {field: 'nombre', header: 'Encargado', sortable: true, body: (rowData) => `${rowData.encargado?.nombre}` || 'Sin encargado' },
    ];

    const actionsTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center">
                <Button
                    icon="pi pi-eye"
                    label='ver detalles'
                    className="text-blue-500 bg-blue-100 p-button-sm p-button-text"
                    tooltip="Ver detalles"
                    tooltipOptions={{ position: 'top' }}
                    onClick={() => handleEdit(rowData)}
                />
            </div>
        );
    };

    const handleEdit = (almacen) => {
        setInitialData(almacen);
        setMode('detalles');
        setVisible(true);
    };

    const handleDelete = async () => {
        try {
            // await DisableAlmacen(almacenData.id);
            AlertHelper.showAlert("Funcionalidad de activar/desactivar no implementada aún", "info");
        } catch (error) {
            AlertHelper.showAlert("No se pudo desactivar el almacén", "error");
        } finally {
            fetchAlmacenes();
        }
    };

    const handleAdd = () => {
        setMode('add');
        setVisible(true);
    };

    return (
        <div className='h-full w-full ml-2'>
            <Card
                title="Lista de Almacenes"
                subTitle="Aquí puedes ver la lista de almacenes, así como agregar, editar o eliminar almacenes."
                className='text-primary w-full h-full'
            />
            <div className='mt-5 h-full w-full '>
                <FancyTable
                    className=''
                    data={almacenes}
                    columns={columns}
                    globalFilterFields={['nombre', 'identificador']}
                    actions={actionsTemplate}
                    showAddButton={true}
                    onAddClick={handleAdd}
                    loading={loading}
                    emptyMessage="No se encontraron almacenes, Agles."
                    rowClassName={"bg-white"}
                />
            </div>
            <AlmacenModal visible={visible} onhide={setVisible} mode={mode} initialData={initialData} loading={setLoading}  />
        </div>
    );
};

export default ListAlmacenes;
