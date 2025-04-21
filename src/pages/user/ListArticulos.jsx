import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { FancyTable } from '../../components/tables/FancyTable'
import { getArticulos } from '../../services/admin/CategoriaList'
import { AlertHelper } from '../../utilities/alerts/AlertHelper'
import { Button } from 'primereact/button'
import ArticuloModal from './components/ArticuloModal'
const ListArticulos = () => {
  const [articulos, setArticulos] = useState([])
  const [loading, setLoading] = useState(true)
  const [initialData, setInitialData] = useState(null)
  const [disable, setDisable] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState("")


  const getArticulo = async () => {
    try {
      const articulos = await getArticulos();
      //recordatorio de crear validacion para solo mostrar almacenes de cierto responsable
      setArticulos(articulos);
    } catch (error) {
      AlertHelper.showAlert("No se pudieron cargar los articulos", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticulo();
  }, []);

  const columns = [
    { field: 'id', header: '#', sortable: true },
    { field: 'nombre', header: 'Nombre', sortable: true },
    { 
        field: 'descripcion', 
        header: 'Descripción', 
        sortable: true,
        body: (rowData) => (
            <div className="truncate-text" style={{ maxWidth: '200px' }}>
                {rowData.descripcion 
                    ? `${rowData.descripcion.substring(0, 30)}${rowData.descripcion.length > 30 ? '...' : ''}`
                    : 'Sin descripción'
                }
            </div>
        )
    },
    {
        field: 'categoria', 
        header: 'Categoría', 
        sortable: true,
        body: (rowData) => rowData.categoria?.nombre || 'Sin categoría'
    },
    {
        field: 'almacenes', 
        header: 'Almacenes', 
        sortable: true,
        body: (rowData) => (
            <div className='flex justify-content-center bg-yellow-300 border-round-sm p-2'>
                <span className='font-medium text-yellow-700'>
                    {rowData.almacenes?.map(almacen => almacen.identificador).join(', ') || 'Sin almacenes'}
                </span>
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
          icon={"pi pi-trash"}
          className={`text-red-500 bg-red-100 p-button-sm p-button-text`}
          tooltip={"Eliminar"}
          tooltipOptions={{ position: 'top' }}
          onClick={() => setDisable(true) & setUserData(rowData)}

        />
      </div>
    );
  };
  const handleEdit = (almacen) => {
    setInitialData(almacen);
    setMode("editar");
    setVisible(true);
  };

  const handleAdd = () => {
    setMode("crear");
    setVisible(true);
  };

  return (
    <div className='ml-2 h-full w-full'>
      <Card
        title="Lista de artículos"
        subTitle="Aquí puedes ver la lista de articulos, así como agregar, editar o eliminar articulos."
        className='text-primary w-full h-full'
      />
      <div className='mt-5 h-full w-full '>
        <FancyTable
          columns={columns}
          data={articulos}
          actions={actionsTemplate}
          showAddButton={true}
          onAddClick={handleAdd}
          loading={loading}
          globalFilterFields={['nombre', 'descripcion']}
          rowClassName={"bg-white"}
          emptyMessage='No se encontraron articulos.'
        />
      </div>
      <ArticuloModal visible={visible} onhide={setVisible} mode={mode} initialData={initialData} loading={getArticulo} />
    </div>
  )
}

export default ListArticulos