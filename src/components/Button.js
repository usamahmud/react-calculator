const Button = ({ keyFunction, text, keyType, onClick }) => {
  return (
    <button
      className={`${keyType}key`}
      onClick={() => onClick(keyFunction)}
    >
      <h1>{text}</h1>
    </button>
  )
}

export default Button