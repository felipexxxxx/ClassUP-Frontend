export default function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    className = "",
    required = false,
  }) {
    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-2 text-sm font-semibold text-gray-300" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        />
      </div>
    );
  }