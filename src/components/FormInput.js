
const FormInput = ({ type, value, setValue, placeholder, autoComplete, showError = false, setShowError }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => setIsTouched(true);

  return (
    <input 
      className = {(isTouched && value.trim() === '') || (showError) ? 'error-border' : ''}
      type={type} 
      value={value}
      onChange={(e) => {
        setShowError(false);
        setValue(e.target.value);
      }}
      onBlur={handleBlur}
      placeholder={placeholder}
      autoComplete={autoComplete}
    /> 
  )
}

export default FormInput