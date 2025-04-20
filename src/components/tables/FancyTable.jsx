import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';

export const FancyTable = ({
  data = [],
  columns = [],
  globalFilterFields = [],
  paginator = true,
  rows = 10,
  rowsPerPageOptions = [5, 10, 20, 50],
  showHeader = true,
  stripedRows = true,
  selectionMode = null,
  onSelectionChange = () => {},
  emptyMessage = "No se encontraron registros",
  size = 'normal',
  className = '',
  style = {},
  onRowClick = null,
  actions = null,
  showGlobalFilter = true,
  showAddButton = false,
  onAddClick = () => {},
  addButtonLabel = "Agregar",
  addButtonIcon = "pi pi-plus",
  rowClassName = null,
  ...restProps
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState(null);

  const handleSelectionChange = (e) => {
    setSelectedRows(e.value);
    onSelectionChange(e.value);
  };

  // Reemplazo de Flex con PrimeFlex
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center w-full bg-white p-2">
        {showGlobalFilter && (
          <IconField iconPosition="left" className="w-6">
            <InputIcon className="pi pi-search text-color-secondary" />
            <InputText
              value={globalFilterValue}
              onChange={(e) => setGlobalFilterValue(e.target.value)}
              placeholder="Buscar..."
              className="bg-white"
            />
          </IconField>
        )}
        
        {showAddButton && (
          <Button 
            label={addButtonLabel} 
            icon={addButtonIcon} 
            onClick={onAddClick}
            className="ml-2 bg-primary text-white"
          />
        )}
      </div>
    );
  };

  const renderColumns = () => {
    return columns.map((col) => {
      if (col.hidden) return null;
      
      return (
        <Column
          key={col.field || col.header}
          field={col.field}
          header={col.header}
          body={col.body}
          sortable={col.sortable}
          filter={col.filter}
          filterField={col.filterField}
          style={col.style}
          className={col.className}
          headerStyle={col.headerStyle}
          headerClassName={col.headerClassName}
          frozen={col.frozen}
          align={col.align}
          alignHeader={col.alignHeader}
          expander={col.expander}
          exportable={col.exportable}
        />
      );
    });
  };

  // Reemplazo de Flex con PrimeFlex en el paginador
  const paginatorTemplate = {
    layout: 'RowsPerPageDropdown CurrentPageReport',
    'RowsPerPageDropdown': (options) => {
      return (
        <div className="flex align-items-center gap-2">
          <span className="mr-2">Filas:</span>
          <Dropdown
            value={options.value}
            options={rowsPerPageOptions.map(opt => ({ label: String(opt), value: opt }))}
            onChange={options.onChange}
            appendTo="self"
          />
        </div>
      );
    },
    'CurrentPageReport': (options) => {
      return (
        <span className="mx-3">
          {options.first} - {options.last} de {options.totalRecords}
        </span>
      );
    }
  };

    return (
      <div className={`fancy-table-container bg-white ${className}`} style={style}>
        <DataTable
          value={data}
          header={showHeader ? renderHeader() : null}
          paginator={paginator}
          rows={rows}
          rowsPerPageOptions={rowsPerPageOptions}
          paginatorTemplate={paginatorTemplate}
          globalFilter={globalFilterValue}
          globalFilterFields={globalFilterFields}
          emptyMessage={emptyMessage}
          selection={selectedRows}
          onSelectionChange={handleSelectionChange}
          selectionMode={selectionMode}
          stripedRows={stripedRows}
          className={`p-datatable-${size} bg-white surface-0 ${className}`}
          onRowClick={onRowClick}
          rowClassName={rowClassName}
          pt={{
            header: { className: 'bg-white' },
            body: { className: 'bg-white' },
            paginator: { className: 'bg-white' },
            column: { headerCell: { className: 'bg-white' } }
          }}
          {...restProps}
        >
          {renderColumns()}
          {actions && (
            <Column 
              body={actions} 
              header="Acciones" 
              style={{ width: '120px', textAlign: 'center' }}
              headerClassName="bg-white"
              bodyClassName="bg-white"
            />
          )}
        </DataTable>
      </div>
    );
  };

FancyTable.defaultProps = {
  data: [],
  columns: [],
  globalFilterFields: [],
  paginator: true,
  rows: 10,
  rowsPerPageOptions: [5, 10, 20, 50],
  showHeader: true,
  stripedRows: true,
  emptyMessage: "No se encontraron registros",
  size: 'normal',
  showGlobalFilter: true,
  showAddButton: false
};