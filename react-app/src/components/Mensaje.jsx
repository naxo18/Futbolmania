function Mensaje({ tipo = "info", children }) {
  if (!children) {
    return null;
  }
  return (
    <div className={`alert alert-${tipo}`} role="alert">
      {children}
    </div>
  );
}

export default Mensaje;
