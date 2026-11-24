import React from 'react';
import './Button.css';

const Button = ({
  children ,
  onClick,
  href,
  type = 'button',
  className ,
  disabled = false,
  lang = 'en',
  withSvg = true,
}) => {
  const fontFamily =
    lang === 'ar'
      ? "'IBM Plex Sans Arabic', sans-serif"
      : "'Plus Jakarta Sans', sans-serif";

  const combinedClasses = `btn-101 rounded-none ${className}`.trim();

  const content = (
    <>
      <span className="btn-101-label">{children}</span>
   {withSvg && (
        <svg
          className="btn-101-border"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="100%" height="100%" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClasses}
        style={{ fontFamily }}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      style={{ fontFamily }}
    >
      {content}
    </button>
  );
};





export default Button;