import classNames from "classnames";

interface IInputGroupProps {
  value: string;
  field: string;
  type?: "text" | "number" | "email" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string | undefined;
  touched: boolean | undefined;
}

export const InputGroup: React.FC<IInputGroupProps> = ({
  value,
  label,
  field,
  onChange,
  error,
  touched,
  type = "text",
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={classNames(
          "form-control",
          { "is-invalid": touched && error },
          { "is-valid": touched && !error }
        )}
        value={value}
        autoComplete="off"
        name={field}
        id={field}
        onChange={onChange}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  );
};