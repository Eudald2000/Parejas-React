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
        src={`${import.meta.env.BASE_URL}${image}`} // Cambia la imagen basado en el estado
        alt="Carta juego"
        // Cambia el cursor para indicar interactividad
        style={{ cursor: volteada ? 'default' : 'pointer' }}
      />
    </div>
  )
}
