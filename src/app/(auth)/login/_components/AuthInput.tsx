const AuthInput = ({ id, type, placeholder }: { id: string; type: string; placeholder: string }) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      required
      placeholder={placeholder}
      className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
    />
  );
};

export default AuthInput;
