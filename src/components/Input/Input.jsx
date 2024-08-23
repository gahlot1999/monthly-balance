import styles from './Input.module.css';

export function TextInput(props) {
  const {
    type = 'text',
    label = 'Enter Label',
    mandatory = false,
    placeholder,
    name,
    error,
    value,
    onChange,
    inputMode,
    disabled = false,
    ...rest
  } = props;
  return (
    <div className={styles.textInputContainer}>
      <label htmlFor={name}>
        {label}
        {mandatory && <span>*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        {...rest}
      />
      {error && error.message && <p>Error</p>}
    </div>
  );
}
