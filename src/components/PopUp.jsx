export const PopUp = ({ mostrarse }) => {
  return (
    <>
    <div className={mostrarse ? '' : 'hidden'} id="popUp">
      <h2>Has ganado</h2>
      <h3>Pulsa reiniciar para jugar otra vez</h3>
    </div>
    </>
  )
}
