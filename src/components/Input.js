import React from "react";

function Input({ name, label, value, onChange, type, autoFocus, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        className="form-control"
        autoFocus={autoFocus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
