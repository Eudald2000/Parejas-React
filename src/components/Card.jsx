// Card.jsx
export const Card = ({ image, volteada, onClick }) => {
  return (
    <div
      className="card"
      onClick={volteada ? null : onClick}
    >
      <img
        src={
            volteada
              ? `${import.meta.env.BASE_URL}${image}`
              : `${import.meta.env.BASE_URL}/interrogante.jpg`
            }
        alt="Carta juego"
        style={{ cursor: volteada ? 'default' : 'pointer' }}
/>
    </div>
  )
}
