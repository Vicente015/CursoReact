import { useStore } from '../hooks/useStore'

const Input: React.FC = () => {
  const { setFromText } = useStore()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFromText(event.target.value)
  }

  return (
    <input placeholder='Escriba el texto a traducir' onChange={handleChange}></input>
  )
}

export default Input
