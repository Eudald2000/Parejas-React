export const Card = ({ image, volteada, onClick }) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/'

  return (
    <div className="card" onClick={volteada ? null : onClick}>
      <img
        src={volteada ? `${baseUrl}${image}` : `${baseUrl}interrogante.jpg`}
        alt="Carta juego"
        style={{ cursor: volteada ? 'default' : 'pointer' }}
      />
    </div>
  )
}
