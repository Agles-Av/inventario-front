import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { FancyTable } from '../../components/tables/FancyTable'
import { get } from 'react-hook-form';
import { getBitacoraList } from '../../services/admin/BitacoraList';
import { Tooltip } from 'primereact/tooltip';

const Bitacora = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await getBitacoraList();
        setData(response);
    }

    useEffect(()=>{
        getData();
    },[]);

    const columns = [
        { field: 'id', header: '#', sortable: true },
        { field: 'usuario', header: 'Usuario', sortable: true },
        { field: 'accion', header: 'metodo', sortable: true,
            body: (rowData) =>{
                switch (rowData.accion) {
                    case 'GET':
                        return <span className='text-green-500'>{rowData.accion}</span>
                    case 'POST':
                        return <span className='text-yellow-500'>{rowData.accion}</span>
                    case 'PUT':
                        return <span className='text-blue-500'>{rowData.accion}</span>
                    case 'DELETE':
                        return <span className='text-red-500'>{rowData.accion}</span>
                    default:
                        return <span>{rowData.accion}</span>
                }
            }
        },
        { field: 'tablaAfectada', header: 'Tabla afectada', sortable: true },
        { 
            field: 'datosAnteriores', 
            header: 'Datos anteriores', 
            sortable: true,
            body: (rowData) => (
                <div className="truncate-text" style={{ maxWidth: '200px' }} title={rowData.datosAnteriores}>
                   
                    {rowData.datosAnteriores 
                        ? `${rowData.datosAnteriores.substring(0, 10)}${rowData.datosAnteriores.length > 30 ? '...' : ''}`
                        : 'Sin datos'
                    }
                </div>
            )
        },
        { 
            field: 'datosNuevos', 
            header: 'Datos nuevos', 
            sortable: true,
            body: (rowData) => (
                <div className="truncate-text" style={{ maxWidth: '200px' }} title={rowData.datosNuevos}>
                    {rowData.datosNuevos 
                        ? `${rowData.datosNuevos.substring(0, 10)}${rowData.datosNuevos.length > 30 ? '...' : ''}`
                        : 'Sin datos'
                    }
                </div>
            )
        },
        { 
            field: 'fechaFormateada', 
            header: 'Fecha', 
            sortable: true,
            body: (rowData) => {
                const date = new Date(rowData.fecha);
                const fecha = date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                return <span>{fecha}</span>;
            }
        },
        { 
            field: 'horaFormateada', 
            header: 'Hora', 
            sortable: true,
            body: (rowData) => {
                const date = new Date(rowData.fecha);
                const hora = date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                return <span>{hora}</span>;
            }
        }
    ];


    return (

        <div className='w-full h-full ml-2'>
            <Card
                title="Bitacora de peticiones"
                subTitle="Aquí puedes ver la lista de peticiones que se hacen al backend"
                className='text-primary w-full h-full'
            />

            <div className='mt-5 h-full w-full '>
                <FancyTable
                data={data}
                columns={columns}
                globalFilterFields={['usuario', 'accion', 'email', 'tablaAfectada', 'datosAnteriores', 'datosNuevos', 'fecha']}
                rowClassName={"bg-white"}
                emptyMessage='No se encontraron registros.'
                paginator={true}
                />
            </div>
        </div>
    )
}

export default Bitacora