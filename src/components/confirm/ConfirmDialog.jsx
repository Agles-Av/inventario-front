import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ConfirmDialog = ({
  visible,
  onHide,
  onConfirm,
  title = "¿Estás seguro?",
  message = "¿Quieres continuar con esta acción?",
  confirmText = "Continuar",
  cancelText = "Cancelar",
  type = "info",
  showCancel = true
}) => {
  const getIcon = () => {
    switch (type) {
      case "success": return "pi pi-check-circle";
      case "error": return "pi pi-times-circle";
      case "warning": return "pi pi-exclamation-triangle";
      case "info":
      default: return "pi pi-info-circle";
    }
  };

  const getSeverity = () => {
    switch (type) {
      case "success": return "success";
      case "error": return "danger";
      case "warning": return "warning";
      case "info":
      default: return "info";
    }
  };

  const footer = (
    <div className="flex justify-content-end gap-3 pt-3">
      <Button
        label={confirmText}
        onClick={onConfirm}
        severity={getSeverity()}
        className="border-round-xl px-4 py-2"
        autoFocus
      />
      {showCancel && (
        <Button
          label={cancelText}
          onClick={onHide}
          severity="secondary"
          outlined
          className="border-round-xl px-4 py-2"
        />
      )}
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={title}
      footer={footer}
      className="w-full sm:w-30rem border-round-xl shadow-4"
      dismissableMask
      modal
    >
      <div className="flex flex-column align-items-center text-center gap-3 p-3">
        <i className={`${getIcon()} text-5xl text-${getSeverity()}`} />
        <span className="text-lg font-medium text-color">{message}</span>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
