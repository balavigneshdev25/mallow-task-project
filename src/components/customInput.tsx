import React from "react";
import { Input } from "antd";
import { FieldError } from "react-hook-form";

type CustomInputProps = {
  label: string;
  type?: "text" | "password" | "email";
  placeholder: string;
  error?: FieldError;
  register: any; 
  icon?: React.ReactNode;
  onChange: (value: string) => void;
  value: string;
  required?:boolean
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder,
  error,
  register,
  icon,
  onChange,
  value,
  required
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
  {required && <span style={{ color: "red" }}>*</span>} {label}
</label>
      <Input
        {...register}
        type={type}
        placeholder={placeholder}
        prefix={icon}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      {error && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{error.message}</p>}
    </div>
  );
};

export default CustomInput;
