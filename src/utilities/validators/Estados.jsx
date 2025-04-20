export const Estados = (status) => {
    return status ? (
        <div className="inline-flex align-items-center bg-green-100 border-round px-3 py-1">
            <i className="pi pi-check-circle text-green-600 mr-2"></i>
            <span className="font-medium text-green-600">Activo</span>
        </div>
    ) : (
        <div className="inline-flex align-items-center bg-red-100 border-round px-3 py-1">
            <i className="pi pi-times-circle text-red-600 mr-2"></i>
            <span className="font-medium text-red-600">Inactivo</span>
        </div>
    );
};
