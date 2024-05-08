function Button({ onClick, isDisabled, text }) {
  return (
    <button
      className="w-20 rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 enabled:bg-gray-200 enabled:hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:enabled:bg-gray-500/20 dark:enabled:hover:bg-gray-700"
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
