import { useEffect, useRef } from 'react';

export function TextInput({ onChange, placeholder, value }) {
  const inputElement = useRef();

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <input
      className="rounded-md indent-4 min-h-[50px] w-full shadow-md"
      onChange={onChange}
      placeholder={placeholder}
      ref={inputElement}
      type="text"
      value={value}
    />
  );
}
