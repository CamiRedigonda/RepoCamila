  
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
var simplePopover = app.popover.create({
  targetEl: 'a.dynamic-popover',
  content: '<div class="popover">'+
              '<div class="popover-inner">'+
                '<div class="block">'+
                  '<p><a href="#" class="link popover-close">1</a></p>'+
                  '<p><a href="#" class="link popover-close">2</a></p>'+
                  '<p><a href="#" class="link popover-close">3</a></p>'+
                  '<p><a href="#" class="link popover-close">4</a></p>'+
                  '<p><a href="#" class="link popover-close">5</a></p>'+
                  '<p><a href="#" class="link popover-close">Tachar</a></p>'+
                '</div>'+
              '</div>'+
            '</div>',
  // Events
  on: {
    open: function (popover) {
      console.log('Popover open');
    },
    opened: function (popover) {
      console.log('Popover opened');
    },
  }
});
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    // se llega aca, cuando termina de cargar el INDEX.html
    console.log("Device is ready!");

    $$('#inicio').on('click', function(){

        nj1 = $$('#j1').val();  //NO PONER var, asi se usa la variable global definida.
        nj2 = $$('#j2').val();

        if (nj1 === "") {
          nj1 = "Jugador 1"
        }

        if (nj2 === "") {
          nj2 = "Jugador 2"
        }

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
    function clickSimple(valorDados){
      simplePopover.open()

    };

    

    $$('#nj1').text(nj1);
    $$('#nj2').text(nj2);
    $$('#j1_1').on('click', function () {clickSimple(1);});
    $$('#j1_2').on('click', function () {clickSimple(2);});
    $$('#j1_3').on('click', function () {clickSimple(3);});
    $$('#j1_4').on('click', function () {clickSimple(4);});
    $$('#j1_5').on('click', function () {clickSimple(5);});
    $$('#j1_6').on('click', function () {clickSimple(6);});
    $$('#j2_1').on('click', function () {clickSimple(1);});
    $$('#j2_2').on('click', function () {clickSimple(2);});
    $$('#j2_3').on('click', function () {clickSimple(3);});
    $$('#j2_4').on('click', function () {clickSimple(4);});
    $$('#j2_5').on('click', function () {clickSimple(5);});
    $$('#j2_6').on('click', function () {clickSimple(6);});

})

$$(document).on('page:init', '.page[data-name="finjuego"]', function (e) {
    // se ejecuta cuando se carga FIN JUEGO
    console.log(e);
    


})