// Card.jsx
export const Card = ({ image, volteada, onClick }) => {
  return (
    <div className="card" onClick={volteada ? null : onClick}>
      <img
        src={volteada ? image : 'interrogante.jpg'}
        alt="Carta juego"
        style={{ cursor: volteada ? 'default' : 'pointer' }}
      />
    </div>
  )
}
