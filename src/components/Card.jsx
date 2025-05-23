// Card.jsx
export const Card = ({ image, volteada, onClick }) => {
  return (
    // Contenedor de la carta
    <div
      className="card"
      onClick={volteada ? null : onClick} // Solo permite clics si no está volteada
    >
      {/* Imagen que muestra la carta o el interrogante */}
      <img
        src={volteada ? image : '/interrogante.jpg'} // Cambia la imagen basado en el estado
        alt="Carta"
        // Cambia el cursor para indicar interactividad
        style={{ cursor: volteada ? 'default' : 'pointer' }}
      />
    </div>
  )
}
