import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const FancyButton = ({
  label = '',
  type = 'button',
  icon = null,
  iconPos = 'left',
  loading = false,
  disabled = false,
  severity = 'primary', // 'primary', 'secondary', 'success', 'info', 'warning', 'danger'
  size = 'normal', // 'small', 'normal', 'large'
  rounded = false,
  outlined = false,
  text = false,
  raised = false,
  className = '',
  tooltip = '',
  tooltipOptions = { position: 'top' },
  onClick,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [internalLoading, setInternalLoading] = useState(loading);
  const [isFocused, setIsFocused] = useState(false);

  // Efecto para manejar estados de loading asíncronos
  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const handleClick = async (e) => {
    if (onClick) {
      try {
        setInternalLoading(true);
        await onClick(e);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const buttonClass = classNames(
    className,
    {
      'p-button-sm': size === 'small',
      'p-button-lg': size === 'large',
      'p-button-rounded': rounded,
      'p-button-outlined': outlined,
      'p-button-text': text,
      'p-button-raised': raised,
      'focus:shadow-lg': isFocused,
    }
  );

  return (
    <Button
      type={type}
      label={label}
      icon={icon}
      iconPos={iconPos}
      loading={internalLoading}
      disabled={disabled || internalLoading}
      severity={severity}
      className={buttonClass}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
      onClick={handleClick}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      {...restProps}
    />
  );
};

// Tipado de props (opcional pero recomendado)
FancyButton.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconPos: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  severity: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  text: PropTypes.bool,
  raised: PropTypes.bool,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipOptions: PropTypes.object,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};