var  lienzo ;
var  ctx ;
var  FPS  =  60 ;

var  anchoF  =  50 ;
var  altoF  =  50 ;

var  muro  =  '# 044f14' ;
var  puerta  =  '# 3a1700' ;
var  tierra  =  '# c6892f' ;
var  llave  =  '# c6bc00' ;

var  protagonista ;

var  enemigo  =  [ ] ;

var  imagenAntorcha ;

var  tileMap ;

var  musica ,  sonido1 ,  sonido2 ,  sonido3 ;

var  nivel  =  1 ;
var  nivelProgres ;

var  stiloMapa  =  localStorage . getItem ( "stiloMapa" ) ;



// Traer sonidos
musica  =  new  Howl ( {
  src : [ "music / rainy_city.wav" ] ,
  bucle : verdadero ,
  volumen : 0.5
} ) ;
sonido1  =  nuevo  Aullido ( {
  src : [ "sonidos / 1.mp3" ] ,  // muerte
  bucle : falso ,

} ) ;
sonido2  =  nuevo  Aullido ( {
  src : [ "sonidos / coin.wav" ] ,  // llave
  bucle : falso ,

} ) ;
sonido3  =  nuevo  Aullido ( {
  src : [ "sonidos / Win.wav" ] ,  // Pasamos de nivel
  bucle : falso ,

} ) ;



//! Escenarios

var  escenario  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  1 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  3 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;
var  escenario1  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  1 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  3 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;

// Ariel Omar Méndez Valverde
var  escenario2  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  1 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  3 ,  2 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;
var  escenario3  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  3 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  1 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;

// Niveles de Gustavo Hernández
var  escenario4  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  1 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  3 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;

var  escenario5  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  3 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  1 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;


// Niveles Jesica Maqueda

var  escenario6  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  3 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  1 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;

var  escenario7  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  3 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  1 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;


// Niveles de Cinthia Guadalupe Soto Rodríguez. 
var  escenario8  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  3 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  1 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]

] ;

var  escenario9  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  1 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  3 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
] ;


var  escenario10  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  1 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  3 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]

var  escenario11  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  1 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  3 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario12  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  3 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  1 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario13  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  3 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  1 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario14  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  3 ,  0 ,  1 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario15  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  3 ,  0 ,  0 ,  2 ,  0 ,  1 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario16  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  0 ,  1 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  3 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario17  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ,  1 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  0 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ,  0 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  3 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]
var  escenario18  =  [
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ] ,
  [ 0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  0 ,  2 ,  2 ,  1 ,  0 ,  3 ,  2 ,  2 ,  0 ,  2 ,  0 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  0 ,  2 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  2 ,  0 ,  0 ,  2 ,  2 ,  0 ] ,
  [ 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ]
]

/ * -------------------------- Termianan niveles ------------------- * /
function  dibujaEscenario ( )  {


  // casos para cada escenario por nivel
  switch  ( nivel )  {
    caso  1 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario1 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      / * document.getElementById ('nivel'). innerHTML = nivel; * /
      romper ;
    caso  2 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario2 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  3 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario3 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  4 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario4 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  5 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario5 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  6 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario6 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  7 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario7 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  8 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario8 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  9 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario9 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  10 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario10 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  11 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario11 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  12 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario12 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  13 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario13 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  14 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario14 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  15 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario15 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  16 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario16 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  17 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario17 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;
    caso  18 :
      documento . getElementById ( 'nivelProgress' ) . setAttribute ( 'valor' ,  nivel ) ;
      escenario  =  escenario18 ;
      documento . getElementById ( 'nivel' ) . innerHTML  =  nivel ;
      romper ;

    por defecto :
      alert ( "LLegaste final, tiene gando !!!" ) ;
      romper ;
  }
  consola . log ( "NIVEL:"  +  nivel ) ;
  para  ( y  =  0 ;  y  <  10 ;  y ++ )  {
    para  ( x  =  0 ;  x  <  15 ;  x ++ )  {

      var  azulejo  =  escenario [ y ] [ x ] ;
      ctx . drawImage ( tileMap ,  tile  *  32 ,  0 ,  32 ,  32 ,  anchoF  *  x ,  altoF  *  y ,  anchoF ,  altoF ) ;
    }
  }
}


var  antorcha  =  función  ( x ,  y )  {
  esto . x  =  x ;
  esto . y  =  y ;

  esto . retraso  =  10 ;
  esto . contador  =  0 ;
  esto . fotograma  =  0 ;  // 0-3


  esto . cambiaFotograma  =  function  ( )  {
    si  ( este . fotograma  <  3 )  {
      esto . fotograma ++ ;
    }  más  {
      esto . fotograma  =  0 ;
    }

  }


  esto . dibuja  =  función  ( )  {

    if  ( this . contador  <  this . retraso )  {
      esto . contador ++ ;
    }  más  {
      esto . contador  =  0 ;
      esto . cambiaFotograma ( ) ;
    }

    ctx . drawImage ( tileMap ,  this . fotograma  *  32 ,  64 ,  32 ,  32 ,  anchoF  *  x ,  altoF  *  y ,  anchoF ,  altoF ) ;
  }

}




// CLASE ENEMIGO
var  malo  =  function  ( x ,  y )  {
  esto . x  =  x ;
  esto . y  =  y ;

  esto . direccion  =  Matemáticas . piso ( Matemáticas . aleatorio ( )  *  4 ) ;

  esto . retraso  =  50 ;
  esto . fotograma  =  0 ;


  esto . dibuja  =  función  ( )  {

    switch  ( nivel )  {
      caso  1 :
      caso  2 :
      caso  3 :
      caso  4 :
      caso  5 :
      caso  6 :
        ctx . drawImage ( tileMap ,  0 ,  32 ,  32 ,  32 ,  this . x  *  anchoF ,  this . y  *  altoF ,  anchoF ,  altoF ) ;

        romper ;
      caso  7 :
      caso  8 :
      caso  9 :
      caso  10 :
      caso  11 :
      caso  12 :
        ctx . drawImage ( tileMap ,  64 ,  32 ,  32 ,  32 ,  this . x  *  anchoF ,  this . y  *  altoF ,  anchoF ,  altoF ) ;

        romper ;
      caso  13 :
      caso  14 :
      caso  15 :
      caso  16 :
      caso  17 :
      caso  18 :
        ctx . drawImage ( tileMap ,  96 ,  32 ,  32 ,  32 ,  this . x  *  anchoF ,  this . y  *  altoF ,  anchoF ,  altoF ) ;

        romper ;
       

        romper ;

      por defecto :
        romper ;
    }
    / * ctx.drawImage (tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF); * /
  }


  esto . compruebaColision  =  function  ( x ,  y )  {
    var  colisiona  =  falso ;

    si  ( escenario [ y ] [ x ]  ==  0 )  {
      colisiona  =  verdadero ;
    }
    return  colisiona ;
  }


  esto . mueve  =  function  ( )  {

    protagonista . colisionEnemigo ( esto . x ,  esto . y ) ;


    if  ( this . contador  <  this . retraso )  {
      esto . contador ++ ;
    }  más  {
      esto . contador  =  0 ;

      // ARRIBA
      si  ( esta . direccion  ==  0 )  {
        si  ( esto . compruebaColision ( esto . x ,  esto . y  -  1 )  ==  falso )  {
          esto . y - ;
        }  más  {
          esto . direccion  =  Matemáticas . piso ( Matemáticas . aleatorio ( )  *  4 ) ;
        }
      }


      // ABAJO
      si  ( esta . direccion  ==  1 )  {
        si  ( esto . compruebaColision ( esto . x ,  esto . y  +  1 )  ==  falso )  {
          esto . y ++ ;
        }  más  {
          esto . direccion  =  Matemáticas . piso ( Matemáticas . aleatorio ( )  *  4 ) ;
        }
      }

      // IZQUIERDA
      si  ( esta . direccion  ==  2 )  {
        si  ( esto . compruebaColision ( esto . x  -  1 ,  esto . y )  ==  falso )  {
          esto . x - ;
        }  más  {
          esto . direccion  =  Matemáticas . piso ( Matemáticas . aleatorio ( )  *  4 ) ;
        }
      }

      // IZQUIERDA
      si  ( esta . direccion  ==  3 )  {
        si  ( esto . compruebaColision ( esto . x  +  1 ,  esto . y )  ==  falso )  {
          esto . x ++ ;
        }  más  {
          esto . direccion  =  Matemáticas . piso ( Matemáticas . aleatorio ( )  *  4 ) ;
        }
      }
    }

  }

}


// OBJETO JUGADOR
var  jugador  =  function  ( )  {
  esto . x  =  1 ;
  esto . y  =  1 ;
  esto . color  =  '# 820c01' ;
  esto . llave  =  falso ;


  esto . dibuja  =  función  ( )  {
    ctx . drawImage ( tileMap ,  32 ,  32 ,  32 ,  32 ,  this . x  *  anchoF ,  this . y  *  altoF ,  anchoF ,  altoF ) ;
  }


  esto . colisionEnemigo  =  function  ( x ,  y )  {
    si  ( esto . x  ==  x  &&  esto . y  ==  y )  {
      esto . muerte ( ) ;
    }

  }


  esto . márgenes  =  función  ( x ,  y )  {
    var  colision  =  falso ;

    si  ( escenario [ y ] [ x ]  ==  0 )  {
      colisión  =  verdadero ;
    }

    retorno  ( colisión ) ;
  }



  esto . arriba  =  función  ( )  {
    if  ( this . margenes ( this . x ,  this . y  -  1 )  ==  false )  {
      esto . y - ;
      esto . logicaObjetos ( ) ;
    }
  }


  esto . abajo  =  función  ( )  {
    if  ( this . margenes ( this . x ,  this . y  +  1 )  ==  false )  {
      esto . y ++ ;
      esto . logicaObjetos ( ) ;
    }
  }

  esto . izquierda  =  función  ( )  {
    if  ( this . margenes ( this . x  -  1 ,  this . y )  ==  falso )  {
      esto . x - ;
      esto . logicaObjetos ( ) ;
    }
  }

  esto . derecha  =  función  ( )  {
    if  ( this . margenes ( this . x  +  1 ,  this . y )  ==  falso )  {
      esto . x ++ ;
      esto . logicaObjetos ( ) ;
    }
  }


  esto . victoria  =  function  ( )  {
    consola . log ( '¡Ha ganado!' ) ;

    esto . x  =  1 ;
    esto . y  =  1 ;

    esto . llave  =  falso ;  // el jugador ya no tiene la llave
    nivel ++ ;
    // escenario [8] [3] = 3; // volvemos a poner la llave en su sitio
  }


  esto . muerte  =  función  ( )  {
    consola . log ( '¡Has perdido!' ) ;

    setTimeout ( "sonido1.play ();" ,  0.1  *  1000 ) ;
    setTimeout ( "ubicación.reload ();" ,  0.6  *  1000 ) ;

    if  ( nivel  >  recuperar ( ) )  {
      guardar ( nivel ) ;
    }

    esto . x  =  1 ;
    esto . y  =  1 ;

    nivel  =  1 ;



    esto . llave  =  falso ;  // el jugador ya no tiene la llave
    escenario [ 8 ] [ 3 ]  =  3 ;  // volvemos a poner la llave en su sitio
  }




  esto . logicaObjetos  =  function  ( )  {
    var  objeto  =  escenario [ este . y ] [ esto . x ] ;

    // OBTIENE llave
    if  ( objeto  ==  3 )  {
      esto . llave  =  verdadero ;
      escenario [ esto . y ] [ esto . x ]  =  2 ;
      consola . log ( '¡¡Ha obtenido la llave !!' ) ;
      sonido2 . jugar ( ) ;
    }



    // ABRIMOS LA PUERTA
    if  ( objeto  ==  1 )  {
      si  ( esto . llave  ==  verdadero )  {
        esto . victoria ( ) ;
        sonido3 . jugar ( ) ;

      }  más  {
        consola . log ( '¡No tienes la llave, no puedes pasar!' ) ;
      }
    }


  }

}




// TODO: Cambiar tileMap cada 5 niveles (dejar que el jugador escoja el estilo)

// TODO: contexto del juego (historia) e istrucciones detalladas
// TODO: pwa
// TODO: cambiar hubicacion del prota segun el nivel
// TODO: cambiar hubicacion de los enemigos segun el nivel

/ * ------------------------------------------------ ---------------------------- * /

// TODO: ¡Opcional! respuesta aptica del juego (vibración del móvil)
// TODO: ¡Opcional! Guardar estado del juego
// TODO: ¡Opcional! animar al prota ya los enemigos
// TODO: ¡Opcional! atarldapo a movil: botones para movil, gestos de pantalla y limitar uso en horizontal


función  cambiaStilo ( mosaico )  {
  cambiar  ( mosaico )  {

    caso  1 :
      stiloMapa  =  'img / juego.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;

    caso  2 :
      stiloMapa  =  'img / juego1.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;

    caso  3 :
      stiloMapa  =  'img / juego2.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;

    caso  4 :
      stiloMapa  =  'img / juego3.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;

    caso  5 :
      stiloMapa  =  'img / juego4.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;
    caso  6 :
      stiloMapa  =  'img / juego5.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;
    caso  7 :
      stiloMapa  =  'img / juego6.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;
    caso  8 :
      stiloMapa  =  'img / s.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;
    caso  9 :
      stiloMapa  =  'img / tilemap6.png' ;
      localStorage . setItem ( "stiloMapa" ,  stiloMapa ) ;
      tileMap  =  nueva  imagen ( ) ;
      tileMap . src  =  stiloMapa ;
      borraCanvas ( ) ;
      dibujaEscenario ( ) ;
      imagenAntorcha . dibuja ( ) ;
      imagenAntorcha2 . dibuja ( ) ;
      imagenAntorcha3 . dibuja ( ) ;
      imagenAntorcha4 . dibuja ( ) ;
      protagonista . dibuja ( ) ;

      romper ;




    por defecto :
      romper ;
  }

}



function  inicializa ( )  {

  lienzo  =  documento . getElementById ( 'lienzo' ) ;
  ctx  =  lienzo . getContext ( '2d' ) ;
  documento . getElementById ( 'maxProgress' ) . setAttribute ( 'valor' ,  localStorage . getItem ( 'max' ) ) ;




  // Musica
  //musica.play ();

  if  ( localStorage . getItem ( "stiloMapa" )  ==  null )  {
    stiloMapa  =  'img / tilemap5.png' ;
  }

  tileMap  =  nueva  imagen ( ) ;





  tileMap . src  =  stiloMapa ;




  // cargamos nivel maximo
  var  recuperado ;
  if  ( localStorage . getItem ( "max" )  ==  undefined )  {

    documento . getElementById ( 'máximo' ) . innerHTML  =  0 ;

  }  más  {
    recuperado  =  recuperar ( ) ;
    documento . getElementById ( 'máximo' ) . innerHTML  =  recuperado ;
  }



  // CREAMOS AL JUGADOR
  protagonista  =  nuevo  jugador ( ) ;

  // CREAMOS LA antorcha
  imagenAntorcha  =  nueva  antorcha ( 0 ,  0 ) ;
  imagenAntorcha2  =  nueva  antorcha ( 14 ,  0 ) ;
  imagenAntorcha3  =  nueva  antorcha ( 0 ,  9 ) ;
  imagenAntorcha4  =  nueva  antorcha ( 14 ,  9 ) ;

  // CREAMOS LOS ENEMIGOS
  enemigo . empujar ( nuevo  malo ( 3 ,  3 ) ) ;
  enemigo . empujar ( nuevo  malo ( 5 ,  7 ) ) ;
  enemigo . empujar ( nuevo  malo ( 7 ,  7 ) ) ;

  // LECTURA DEL TECLADO
  documento . addEventListener ( 'keydown' ,  function  ( tecla )  {

    if  ( tecla . keyCode  ==  38 )  {
      protagonista . arriba ( ) ;
    }

    if  ( tecla . keyCode  ==  40 )  {
      protagonista . abajo ( ) ;
    }

    if  ( tecla . keyCode  ==  37 )  {
      protagonista . izquierda ( ) ;
    }

    if  ( tecla . keyCode  ==  39 )  {
      protagonista . derecha ( ) ;
    }

  } ) ;

  setInterval ( function  ( )  {
    principal ( ) ;
  } ,  1000  /  FPS ) ;
}


// guardado
función  guardar ( nivel )  {
  localStorage . setItem ( "max" ,  nivel ) ;
}

// recuperado
función  recuperar ( )  {
  return  ( localStorage . getItem ( "max" ) ) ;

}


function  borraCanvas ( )  {
  lienzo . ancho  =  750 ;
  lienzo . altura  =  500 ;
}


function  principal ( )  {
  borraCanvas ( ) ;
  dibujaEscenario ( ) ;
  imagenAntorcha . dibuja ( ) ;
  imagenAntorcha2 . dibuja ( ) ;
  imagenAntorcha3 . dibuja ( ) ;
  imagenAntorcha4 . dibuja ( ) ;
  protagonista . dibuja ( ) ;


  para  ( c  =  0 ;  c  <  enemigo . longitud ;  c ++ )  {
    enemigo [ c ] . mueve ( ) ;
    enemigo [ c ] . dibuja ( ) ;
  }

}
