  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/anotador/',
        url: './pages/anotador.html',
      },

    ]
    // ... other parameters
  });
var mainView = app.views.create('.view-main');
var nj1 = "";
var nj2 = "";
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    // se llega aca, cuando termina de cargar el INDEX.html
    console.log("Device is ready!");

    $$('#inicio').on('click', function(){
        nj1 = $$('#j1').val();  //NO PONER var, asi se usa la variable global definida.
        nj2 = $$('#j2').val();

        console.log("Jugadores seteados: " + nj1 + " / " + nj2);
    })
});
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
    // cargar un track por cada pagina que carga el usuario.

})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    // se ejecuta cuando se carga ANOTADOR
    console.log(e);
    

    $$('#nj1').text(nj1);
    $$('#nj2').text(nj2);



})

$$(document).on('page:init', '.page[data-name="finjuego"]', function (e) {
    // se ejecuta cuando se carga FIN JUEGO
    console.log(e);
    


})