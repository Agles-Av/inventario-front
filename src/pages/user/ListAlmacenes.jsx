import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { getAlmacenes } from '../../services/admin/AlmacenesList';
import { FancyTable } from '../../components/tables/FancyTable'; // <-- tu tabla
import { Button } from 'primereact/button'

const ListAlmacenes = () => {
  const [almacenes, setAlmacenes] = useState([]);

  const getAlmacen = async () => {
    const response = await getAlmacenes();
    setAlmacenes(response);
  }

  useEffect(() => {
    getAlmacen();
  }, []);

  const columns = [
    { field: 'id', header: '#', sortable: true },
    { field: 'identificador', header: 'Identificador', sortable: true },
    {
      field: 'categoria',
      header: 'Categoría',
      sortable: true,
      body: (rowData) => rowData.categoria
    },
    {
      field: 'encargado',
      header: 'Encargado',
      sortable: true,
      body: (rowData) =>
        rowData.encargado ? (
          <div className='flex flex-column'>
            <span className='font-bold'>{rowData.encargado.name} {rowData.encargado.lastName}</span>
            <small className='text-600'>{rowData.encargado.email}</small>
          </div>
        ) : (
          <span className="text-500">Sin encargado</span>
        )
    },
    {
      field: 'articulos',
      header: 'Artículos',
      sortable: false,
      body: (rowData) => (
        <span>{rowData.articulos.length} artículo(s)</span>
      )
    }
  ];

  const actionsTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-pencil"
          className="text-blue-500 bg-blue-100 p-button-sm p-button-text"
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="text-red-500 bg-red-100 p-button-sm p-button-text"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const handleEdit = (almacen) => {
    console.log('Editar:', almacen);
  };

  const handleDelete = async (almacen) => {
    console.log('Eliminar:', almacen);
  };

  return (
    <div className='h-full w-full ml-2'>
      <Card
        title="Lista de almacenes"
        subTitle="Aquí puedes ver la lista de almacenes, así como agregar, editar o eliminar almacenes además de asignar un almacén a un responsable."
        className='text-primary w-full h-full'
      />
      <div className='mt-5 h-full w-full'>
        <FancyTable
          data={almacenes}
          columns={columns}
          actions={actionsTemplate}
        />
      </div>
    </div>
  );
}

export default ListAlmacenes;
