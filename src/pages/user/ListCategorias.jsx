import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { FancyTable } from '../../components/tables/FancyTable';
import { ListCategoriasAll } from '../../services/admin/ListCategorias';
import { AlertHelper } from '../../utilities/alerts/AlertHelper';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import CategoriaModal from './components/CategoriaModal';

const ListCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState({});
  const getCategorias = async () => {
    try {
      const response = await ListCategoriasAll();
      setCategorias(response);
    } catch (error) {
      AlertHelper.showAlert("No se pudieron cargar las categorias", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setInitialData(data);
    setMode('detalles');
    setVisible(true);
  };
  const handleAdd = () => {
    setInitialData({});
    setMode('create');
    setVisible(true);
  }

  useEffect(() => {
    getCategorias();
  }, []);

  const columns = [
    { field: 'id', header: '#', sortable: true },
    { field: 'nombre', header: 'Nombre', sortable: true },
    { 
      field: 'articulos', 
      header: '#Artículos', 
      sortable: true,
      body: (rowData) => (
        <Tag 
          value={rowData.articulo?.length || 0} 
          severity={rowData.articulo?.length ? 'success' : 'warning'}
          className="font-bold"
        />
      )
    },
    { 
      field: 'almacenes', 
      header: '#Almacenes', 
      sortable: true,
      body: (rowData) => (
        <Tag 
          value={rowData.almacen?.length || 0} 
          severity={rowData.almacen?.length ? 'info' : 'warning'}
          className="font-bold"
        />
      )
    },
   
  ];

  const actionsTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-eye"
          label='Ver detalles'
          className="text-blue-500 bg-blue-100 p-button-sm p-button-text"
          tooltip="Ver detalles"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleEdit(rowData)}
        />
      </div>
    );
  };

  return (
    <div className='w-full h-full ml-2'>
      <Card
        title="Lista de categorías"
        subTitle="Aquí puedes ver la lista de categorías, así como agregar, editar o eliminar categorías."
        className='text-primary w-full h-full'
      />

      <div className='w-full h-full mt-5'>
        <FancyTable
          columns={columns}
          data={categorias}
          globalFilterFields={['nombre', 'articulos', 'almacenes']}
          actions={actionsTemplate}
          showAddButton={true}
          onAddClick={handleAdd}
          loading={loading}
          emptyMessage="No hay categorías disponibles"
          rowClassName={"bg-white"}
        />
      </div>
      <CategoriaModal visible={visible} onhide={setVisible} initialData={initialData} loading={getCategorias} mode={mode} />
    </div>
  );
};

export default ListCategorias;