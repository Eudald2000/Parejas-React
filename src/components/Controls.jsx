export const Controls = ({ contador, reset }) => {
  return (
    <>
    <div className="controls">
      <button id="restart" className="restart-button" onClick={reset}>Reiniciar juego</button>
      <p id="marcador">Turnos: {contador}</p>
    </div>
    </>
  )
}
