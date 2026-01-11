import React from "react";
import styles from "./InputField.module.css";

type IconComponent = React.ComponentType<{ className?: string }>;

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  Icon: IconComponent;
};

export function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  Icon,
}: InputFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.inputIcon} />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
