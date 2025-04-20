import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState, useEffect } from 'react';

export const FancyInput = ({
  // Props básicas
  name,
  label = '',
  type = 'text',
  value = '',
  onChange,
  required = false,
  icon = null,
  
  // Validación
  pattern,
  errorMessage = '',
  validateOnBlur = true,
  
  // Props nativas de PrimeReact
  maxLength,
  disabled,
  readOnly,
  placeholder,
  autoFocus,
  
  // Eventos
  onBlur,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  
  // Cualquier otra prop
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState('');

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const validate = (value) => {
    if (required && !value?.trim()) {
      return `${label} es requerido`;
    }
    if (pattern && value && !new RegExp(pattern).test(value)) {
      return `Formato inválido para ${label.toLowerCase()}`;
    }
    return '';
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.({ target: { name, value: newValue } });
  };

  const handleBlur = (e) => {
    setError(validate(internalValue));
    onBlur?.(e);
  };

  const renderInput = () => {
    const sharedProps = {
      id: name,
      name,
      className: `w-full ${error ? 'p-invalid' : ''}`,
      value: internalValue || '',
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      maxLength,
      disabled,
      readOnly,
      placeholder,
      autoFocus,
      ...restProps // Todas las demás props que no hemos desestructurado
    };

    switch (type) {
      case 'password':
        return <Password {...sharedProps}  toggleMask feedback={false} />;
      case 'textarea':
        return <InputTextarea {...sharedProps} autoResize rows={3} />;
      default:
        return <InputText {...sharedProps} />;
    }
  };

  return (
    <div className="w-full mb-3">
      <FloatLabel>
        {renderInput()}
        <label htmlFor={name}>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </FloatLabel>

      {(error || errorMessage) && (
        <small className="p-error block mt-1">{error || errorMessage}</small>
      )}
    </div>
  );
};