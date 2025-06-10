// App.jsx
import { useState, useEffect } from 'react'
import './parejas.css'
import { Container } from './components/Container.jsx'
import { Board } from './components/Board.jsx'
import { Controls } from './components/Controls.jsx'
import { PopUp } from './components/Popup.jsx'
import { Fila } from './components/Fila.jsx'
import { Card } from './components/Card.jsx'

function App () {
  // Lista base de imágenes únicas (deben estar en la carpeta public)
  const imagenesBase = [
    '/ainz.jpg', '/gojo.jpg', '/ichigo.jpg', '/itadori.jpg', '/luffy.jpg',
    '/naruto.jpg', '/senku.jpg', '/sjw.jpg', '/tanjiro.jpg', '/killua.jpg'
  ]

  // Estado principal que guarda todas las cartas del juego
  // Cada carta tiene: { imagen: string, id: number, emparejada: boolean }
  const [cartas, setCartas] = useState([])

  // Estados para controlar las cartas volteadas
  const [cartaVolteada1, setCartaVolteada1] = useState(null) // Primera carta seleccionada
  const [cartaVolteada2, setCartaVolteada2] = useState(null) // Segunda carta seleccionada
  const [bloquearClics, setBloquearClics] = useState(false) // Bloquea interacciones durante las animaciones
  const [mostrarPopUp, setMostrarPopUp] = useState(false) // Controla la visibilidad del popup
  const [contador, setContador] = useState(0) // Contador de turnos

  // Efecto que se ejecuta al cargar el componente
  // Inicializa el juego mezclando las cartas
  useEffect(() => {
    reiniciarJuego()
  }, []) // El array vacío [] significa que solo se ejecuta una vez al montar el componente

  // Función para reiniciar el juego
  const reiniciarJuego = () => {
    // 1. Duplicar las imágenes para crear pares
    const pares = [...imagenesBase, ...imagenesBase]

    // 2. Crear objetos carta con ID único y estado emparejada
    const nuevasCartas = pares.map((imagen, index) => ({
      imagen, // URL de la imagen
      id: index, // ID único basado en posición
      emparejada: false // Estado de emparejamiento
    }))

    // 3. Mezclar las cartas aleatoriamente
      .sort(() => Math.random() - 0.5) // Orden aleatorio

    // 4. Actualizar el estado con las nuevas cartas
    setCartas(nuevasCartas)

    // 5. Resetear estados de control
    setCartaVolteada1(null)
    setCartaVolteada2(null)
    setBloquearClics(false)
    setContador(0)
    setMostrarPopUp(false)
  }
  const comprobarFinJuego = () => {
  // Añadir verificación de que hay cartas
    if (cartas.length > 0 && cartas.every(carta => carta.emparejada)) {
      setMostrarPopUp(true)
      tirarConfetti()
    }
  }

  // Maneja el clic en una carta
  const manejarClic = (carta) => {
    // No hacer nada si:
    if (bloquearClics || // Los clics están bloqueados
        carta.emparejada || // La carta ya está emparejada
        carta.id === cartaVolteada1?.id) return // La carta ya está volteada

    // Seleccionar primera o segunda carta
    if (!cartaVolteada1) {
      setCartaVolteada1(carta) // Guardar primera carta
    } else {
      setCartaVolteada2(carta) // Guardar segunda carta
    }
  }

  // Efecto que se activa cuando cambia cartaVolteada2
  useEffect(() => {
    // Solo se ejecuta cuando hay dos cartas seleccionadas
    if (cartaVolteada1 && cartaVolteada2) {
      setBloquearClics(true) // Bloquear interacciones

      // Comparar imágenes de las dos cartas
      if (cartaVolteada1.imagen === cartaVolteada2.imagen) {
        // Pareja correcta: actualizar estado de emparejamiento
        setCartas(prev =>
          prev.map(carta =>
            // Marcar ambas cartas como emparejadas
            carta.id === cartaVolteada1.id || carta.id === cartaVolteada2.id
              ? { ...carta, emparejada: true }
              : carta
          )
        )
        resetearSeleccion()
      } else {
        // Pareja incorrecta: voltear después de 1 segundo
        setTimeout(resetearSeleccion, 1000)
      }
      setContador(contador + 1)
    }
  }, [cartaVolteada2]) // Se activa cuando cartaVolteada2 cambia

  // Nuevo efecto para comprobar victoria cuando cambian las cartas
  useEffect(() => {
    comprobarFinJuego()
  }, [cartas]) // Se ejecuta cada vez que cambia el estado de cartas

  // Reinicia la selección de cartas
  const resetearSeleccion = () => {
    setCartaVolteada1(null)
    setCartaVolteada2(null)
    setBloquearClics(false) // Rehabilitar interacciones
  }

  // Crea una fila de cartas
  const crearFila = (inicio, fin) => {
    return cartas.slice(inicio, fin).map(carta => (
      <Card
        key={carta.id} // ID único para React
        image={carta.imagen}
        // Una carta está volteada si:
        volteada={
          carta.emparejada || // Está emparejada
          carta.id === cartaVolteada1?.id || // Es la primera seleccionada
          carta.id === cartaVolteada2?.id // Es la segunda seleccionada
        }
        onClick={() => manejarClic(carta)}
      />
    ))
  }

  // ESTO ES PARA EL CONFETTI
  const tirarConfetti = () => {
    const duration = 8000 // Más corto para mejor UX
    const end = Date.now() + duration;

    (function frame () {
      // eslint-disable-next-line no-undef
      confetti({
        particleCount: 7, // Menos partículas = más performance
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        zIndex: 2000,
        colors: ['#ff0000', '#00ff00', '#0000ff'] // Personaliza colores
      })
      // eslint-disable-next-line no-undef
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffffff', '#1b191a']
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  // Estructura principal del componente
  return (
    <Container>
      <Board>
        {/* Fila 1: Cartas 0-4 */}
        <Fila>{crearFila(0, 5)}</Fila>

        {/* Fila 2: Cartas 5-9 */}
        <Fila>{crearFila(5, 10)}</Fila>

        {/* Fila 3: Cartas 10-14 */}
        <Fila>{crearFila(10, 15)}</Fila>

        {/* Fila 4: Cartas 15-19 */}
        <Fila>{crearFila(15, 20)}</Fila>
      </Board>

      {/* Componentes de controles y popup */}
      <Controls contador={contador} reset={reiniciarJuego} />
      <PopUp mostrarse={mostrarPopUp}/>
    </Container>
  )
}

export default App
