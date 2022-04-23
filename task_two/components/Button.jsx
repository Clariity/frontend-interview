import { useEffect } from 'react';

export function Button({ children, disabled, onClick }) {
  // listen for enter key
  useEffect(() => {
    function upHandler({ key }) {
      if (key === 'Enter' && !disabled) {
        onClick();
      }
    }

    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [disabled, onClick]);

  return (
    <button
      className="flex justify-center items-center bg-white rounded-md py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105 active:scale-95 transition-all duration-100 shadow-md"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
