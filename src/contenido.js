/* ================================================================
   CONTENIDO EDITABLE
   Todo el texto que quieras cambiar está aquí.
   Cambia solo lo que va entre comillas y guarda el archivo.
   ================================================================ */

export default {

  // Día en que dijo que sí (AAAA-MM-DDTHH:MM:00). Mueve el contador en vivo.
  inicio: "2026-09-24T00:00:00",

  // Firma
  firma: "Tu Mar",

  // Las dos canciones. Para cambiar una: Spotify > Compartir > Copiar enlace,
  // y pega aquí lo que va después de /track/ (sin ?si=...).
  canciones: {
    mia: {
      id: "7qiZfU4dY1lWllzX7mPBI3",
      titulo: "Shape of You",
      artista: "Ed Sheeran",
      de: "De mí para ti",
      nota: "Es la primera vez que te dedico una canción, y no la escogí al azar. Esta es mi forma de decirte que te amo, en canción. Escúchala pensando en que cada vez que suene, yo estoy pensando en ti."
    },
    suya: {
      id: "5RIcOnCoAAzjhXkpgOAkiY",
      titulo: "armagedón",
      artista: "HUMBE",
      de: "De ti para mí",
      nota: "La canción que tú me dedicaste. La guardo como se guarda una carta. Esta sala es mi respuesta."
    }
  },

  // Las 11 estrellas de Tauro y lo que significa cada una.
  estrellas: [
    { id: "a", nombre: "Aldebarán", apodo: "el ojo del toro", x: 44.3, y: 58.1, grande: true,
      razon: "Tus ojos. Siempre te lo digo y no pienso dejar de decirlo." },
    { id: "b", nombre: "Elnath", apodo: "el cuerno", x: 18.6, y: 13.1,
      razon: "Tu voz. Lo primero que quiero escuchar y lo último antes de dormir." },
    { id: "e", nombre: "Ain", apodo: "“ojo” en árabe", x: 51, y: 42.6,
      razon: "Tu cara al abrir mi página por primera vez: felicidad y sorpresa al mismo tiempo." },
    { id: "d", nombre: "Delta", apodo: "las Híades", x: 56.4, y: 52.7,
      razon: "Cómo me calmas cuando estoy nervioso, sin darte cuenta de que lo haces." },
    { id: "g", nombre: "Gamma", apodo: "las Híades", x: 59.1, y: 63,
      razon: "Que me expliques tu película favorita escena por escena, con toda la paciencia del mundo." },
    { id: "h", nombre: "Theta", apodo: "las Híades", x: 51, y: 61,
      razon: "Tu “no” con sátira, y el “sí” que llegó un segundo después." },
    { id: "z", nombre: "Zeta", apodo: "el otro cuerno", x: 12.1, y: 40.5,
      razon: "Cómo te ríes de mis comentarios, aunque sean malísimos." },
    { id: "l", nombre: "Lambda", apodo: "el hocico", x: 67.7, y: 71.9,
      razon: "Lo bien que cuidas lo que está vivo: los caballos, las plantas, la naturaleza entera." },
    { id: "x", nombre: "Xi", apodo: "la pata", x: 83, y: 80,
      razon: "Que te pierdas en un museo mirando una obra, y que yo me pierda mirándote a ti." },
    { id: "o", nombre: "Ómicron", apodo: "la pata", x: 89, y: 86,
      razon: "Que leas el cielo y me cuentes lo que dicen las estrellas." },
    { id: "p", nombre: "Pléyades", apodo: "las siete hermanas", x: 75.2, y: 29.5, cumulo: true,
      razon: "Que me hayas contado tus miedos, y que me dejaras contarte los míos." }
  ],

  // Biblioteca. "colores": fondo, texto, acento de la portada dibujada.
  libros: [
    { titulo: "Orgullo y prejuicio", autor: "Jane Austen", estrellas: 5,
      etiquetas: ["Romance", "Tu favorita"], colores: ["#13306f", "#f4f2ee", "#c8372d"],
      nota: "Tu película favorita y la primera que vimos juntos como algo más. Tú me explicabas cada escena y yo hacía comentarios para hacerte reír. Un mes después sigo pensando que Darcy se tardó demasiado. Yo no pensaba cometer el mismo error." },
    { titulo: "Harry Potter", autor: "J. K. Rowling", estrellas: 5,
      etiquetas: ["Fantasía", "Siempre"], colores: ["#7a1f1a", "#e9b949", "#0d1734"],
      nota: "Tu saga. De ahí me quedo con una sola palabra, la de Snape. Hay amores que no necesitan un discurso; les basta con decir “siempre”." },
    { titulo: "Nuestra bitácora", autor: "Cita I · por Mar", estrellas: 5,
      etiquetas: ["4 capítulos", "Léela →"], colores: ["#0b1d4a", "#f4f2ee", "#5a71ad"], bitacora: true,
      nota: "Mi perspectiva de nuestra primera cita, en cuatro capítulos. La empecé por ti, para que ningún día importante se nos pierda. Está abierta en el teléfono de al lado." },
    { titulo: "Un mes", autor: "Cita II · en curso", estrellas: 5,
      etiquetas: ["Esta página", "Sin final"], colores: ["#f4f2ee", "#13306f", "#c8372d"],
      nota: "El segundo capítulo lo estás leyendo ahora mismo. No tiene final, y esa es la idea." }
  ],

  // Bitácora · Cita I (se lee dentro del teléfono)
  bitacora: [
    { titulo: "La previa", texto: [
      "La noche anterior no podía quedarme quieto. Tenía la cabeza llena de ideas a medio armar y ninguna certeza de cómo iba a ser la cita. No sabía bien qué íbamos a hacer ni cómo iba a organizarlo todo, pero había algo que sí tenía claro: era el momento. Mañana le iba a pedir que fuera mi novia.",
      "Hablamos por llamada en Discord, como tantas otras noches, y quedamos en vernos al día siguiente a una hora exacta. Yo intentaba sonar tranquilo, pero por dentro la ansiedad me ganaba. Cada vez que la escuchaba reír pensaba en lo que se venía y sentía un nudo en el estómago, de esos que no son malos, sino de emoción.",
      "Luego empezó a leerme un libro. Su voz tenía algo que me calmaba, como si todo lo que me preocupaba se fuera apagando de a poco. No recuerdo en qué página me quedé, solo que en algún momento cerré los ojos y me dormí escuchándola, con la sensación de que el día siguiente iba a ser distinto a todos los anteriores."
    ]},
    { titulo: "Todo lo que preparé para ti", texto: [
      "Desperté con una sola idea en la cabeza: tenía que dejar todo listo. Lo primero fue la playlist. Busqué canciones que me recordaban a ella y otras que ella misma me había recomendado. Mientras las ordenaba, me di cuenta de que no era solo música; era nuestra historia de este mes, contada canción por canción.",
      "Después me puse a hacer una página web con preguntas para conocernos mejor y con un poco de todo lo que ya sé de ella. Quería que al abrirla sintiera que la he estado escuchando de verdad, que cada detalle que me ha contado se ha quedado conmigo.",
      "Entre tanto, casi se me pasa la hora. Corrí a ducharme y fue ahí, bajo el agua, donde se me ocurrió la idea de esta bitácora. Pensé en su amnesia, en lo fácil que es que los momentos se escapen, y quise que este día quedara guardado en algún lugar donde ninguno de los dos pudiera perderlo. Un libro de nosotros, para leerlo juntos cuantas veces quisiéramos. Salí de la ducha sabiendo que esto también era un regalo, para ella y para mí."
    ]},
    { titulo: "Su película favorita", texto: [
      "La cita empezó con Orgullo y prejuicio. Es su película favorita y la ha visto tantas veces que se la sabe de memoria, así que mientras avanzaba me iba explicando detalles para que entendiera bien la historia. Yo, en cambio, no paraba de hacer comentarios, y cada uno le sacaba una risa. Creo que en ese momento disfrutaba más escucharla reír que la propia película.",
      "A mitad de la peli llegó mi hora de almorzar. Antes de irme le dejé la playlist sonando, para que me acompañara, aunque no estuviera ahí. Me gustaba imaginarla escuchando cada canción, reconociendo algunas y descubriendo por qué había elegido otras.",
      "Cuando volví, seguimos donde nos habíamos quedado hasta terminarla. Ver a Elizabeth y a Darcy darse cuenta de lo que sentían, justo el día en que yo pensaba declararme, se sintió como una señal. Como si la historia me estuviera diciendo que ya era hora de dejar de esperar."
    ]},
    { titulo: "Una carta y un sí", texto: [
      "Después de la película llegó el momento de las preguntas. Le pedí que prendiera su cámara para ver su reacción al entrar a la página por primera vez, y su cara fue un poema: felicidad y sorpresa al mismo tiempo. Verla así me confirmó que todo el esfuerzo había valido la pena.",
      "Empezamos a responder las preguntas, cada uno a su turno, riéndonos y descubriendo cosas nuevas. Lo que ella no sabía es que, mientras respondíamos, yo terminaba otra página: una carta escrita al estilo de Orgullo y prejuicio, donde le pedía que fuera mi novia.",
      "Cuando acabamos, le pedí que prendiera la cámara otra vez y yo también encendí la mía. Abrió la página y su asombro fue todavía mayor que antes. Leyó la carta completa, en silencio, y yo solo podía mirarla, con el corazón latiendo como nunca.",
      "Al terminar, le hice la pregunta. Con toda la sátira del mundo me dijo que no… y al instante respondió que sí. En su rostro vi una ilusión única, y yo no podía dejar de sonreír. En ese momento entendí que esta ya no era solo una primera cita. Era el primer capítulo de nuestra historia."
    ]}
  ],

  // Momentos compartidos. "foto" es opcional: pon la imagen en public/fotos/
  // y escribe su ruta, por ejemplo "/fotos/overcooked.jpg".
  // Si "foto" está vacío, la página dibuja una obra abstracta en su lugar.
  momentos: [
    { titulo: "Películas de terror", anio: "2026", tecnica: "Luces apagadas, gritos a dúo y manos tapando la pantalla",
      medidas: "Duración: lo que dure el susto", motivo: "terror", foto: "",
      nota: "Nos asustamos juntos, que es la mejor manera de asustarse. Lo que más miedo me daba no era la película, era que se acabara la llamada." },
    { titulo: "Overcooked", anio: "2026", tecnica: "Técnica mixta: cebollas sin picar, platos en llamas, órdenes a gritos",
      medidas: "Edición única (por ahora)", motivo: "cocina", foto: "",
      nota: "Quemamos la cocina, se nos cayó todo y aun así fuimos el mejor equipo. Me debes una revancha." },
    { titulo: "Llamadas", anio: "2026 · en curso", tecnica: "Voz sobre Discord",
      medidas: "Duración: indefinida", motivo: "llamadas", foto: "",
      nota: "Las horas se van más rápido cuando estás al otro lado. Nunca encuentro el momento de colgar, y está bien así." },
    { titulo: "Risas", anio: "2026", tecnica: "Mis comentarios sobre tu risa",
      medidas: "Medidas variables", motivo: "risas", foto: "",
      nota: "Mis comentarios y tu risa: la mejor colaboración de toda la exhibición. Cada vez que te ríes siento que gané algo." },
    { titulo: "Miedos e inseguridades", anio: "2026", tecnica: "Honestidad",
      medidas: "Obra frágil. Manipular con cuidado", motivo: "miedos", foto: "",
      nota: "Me contaste lo que te pesa y yo te conté lo mío. Ese día dejé de conocerte por encima. Gracias por confiarme las partes que no le muestras a cualquiera." },
    { titulo: "La pregunta", anio: "2026", tecnica: "Carta al estilo de Jane Austen, cámaras encendidas",
      medidas: "Respuesta: “no”… “sí”", motivo: "pregunta", foto: "",
      nota: "Te leí mi carta, te hice la pregunta y me dijiste que no. Un segundo después dijiste que sí, y vi en tu cara una ilusión que no se me va a olvidar." }
  ],

  // Herbario: plantas de tu tierra
  herbario: [
    { forma: "cedro", latin: "Cedrus libani", nombre: "Cedro del Líbano",
      nota: "Está en la bandera de tu tierra. Aguanta la nieve y los siglos sin doblarse, como nosotros después de una pelea." },
    { forma: "olivo", latin: "Olea europaea", nombre: "Olivo",
      nota: "Significa paz y vive cientos de años. Así quiero que dure esto." },
    { forma: "anemona", latin: "Anemone coronaria", nombre: "Anémona",
      nota: "En primavera tiñe de rojo las colinas del Líbano. Es del color de lo que siento cuando me miras." },
    { forma: "jazmin", latin: "Jasminum officinale", nombre: "Jazmín",
      nota: "El perfume de las noches del Levante. Así me imagino tu voz si tuviera olor." },
    { forma: "lavanda", latin: "Lavandula angustifolia", nombre: "Lavanda",
      nota: "Calma. Lo mismo que siento cuando te escucho al otro lado de la llamada." }
  ],

  // Qué es el amor para los dos.
  amor: [
    "Luchar por el otro, incluso en los días en que estamos enojados.",
    "Querer cada cosa del otro: las buenas, las malas y las que todavía no entendemos.",
    "Pelear poco pero fuerte, y aun así elegirnos de nuevo.",
    "Contarnos los miedos sin miedo.",
    "Siempre."
  ]
};
