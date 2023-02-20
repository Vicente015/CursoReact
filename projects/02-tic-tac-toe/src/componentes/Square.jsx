export const Square = ({ children, index, isSelected, updateBoard }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  )
}
