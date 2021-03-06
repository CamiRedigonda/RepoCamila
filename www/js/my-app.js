
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
var idSeleccionado;
var simple = app.actions.create({
    buttons: [
        {
            text: 'Elige la cantidad de dados',
            label: true,
            bold: true,
        },
        {
            text: '1',
            onClick: function () {
                toque(1);
            }
        },
        {
            text: '2',
            onClick: function () {
                toque(2);
            }
        },
        {
            text: '3',
            onClick: function () {
                toque(3);
            }
        },
        {
            text: '4',
            onClick: function () {
                toque(4);
            }
        },
        {
            text: '5',
            onClick: function () {
                toque(5);
            }
        },
        {
            text: 'Tachar',
            onClick: function () {
                tachar();
            }

        },
        {
            text: 'Cancelar',
            color: 'red'
        },
    ]

})
var juego = app.actions.create({
    buttons: [
        {
            text: 'Servida',
            onClick: function () {
                toque("servida");
            }
        },
        {
            text: 'Armada',
            onClick: function () {
                toque("noservida");
            }
        },
        {
            text: 'Tachar',
            onClick: function () {
                tachar();
            }
        },
        {
            text: 'Cancelar',
            color: 'red'
        }, ,
    ]
})
function crearPopupFinal() {
    var total1= parseInt($$('#j1_12').text())
    var total2= parseInt($$('#j2_12').text())
    var j1= $$('#nj1').text()
    var j2= $$('#nj2').text()
    if(total1 > total2){
        var ganador= j1;
        }else{
            var ganador= j2;
        }
    if(total1 === total2){
        var textoFinal= "<p>¡Han empatado!</p>" ;
        }else{
        var textoFinal= '<p>¡Ha ganado '+ganador+'!</p>';
        }
    var popup = app.popup.create({
        content: '<div class="popup">'+
                    '<div class="block">'+
                        textoFinal+
                        '<p><a href="/index/" class="link popup-close">Volver</a></p>'+
                    '</div>'+
                '</div>',
        // Events
        on: {
            open: function (popup) {
            console.log('Popup open');
            },
            opened: function (popup) {
            console.log('Popup opened');
            },
        }
    });
    return popup;
}
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    // se llega aca, cuando termina de cargar el INDEX.html
    console.log("Device is ready!");

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
    nj1 = $$('#j1').val();  //NO PONER var, asi se usa la variable global definida.
    nj2 = $$('#j2').val();
    if (nj1 === "") {
        nj1 = "Jugador 1"
    }
    if (nj2 === "") {
        nj2 = "Jugador 2"
    }

    console.log(e);
    $$('#nj1').text(nj1);
    $$('#nj2').text(nj2);
    $$('.as1').on('click', function () {
        idSeleccionado = this.id;
        simple.open();
    });
    $$('.as2').on('click', function () {
        idSeleccionado = this.id;
        juego.open();
    });
    $$('#limpiar').on('click', limpiar);
    $$('#fin').on('click', fin);

})
$$(document).on('page:init', '.page[data-name="finjuego"]', function (e) {
    // se ejecuta cuando se carga FIN JUEGO
    console.log(e);
})
function limpiar(){
    for (jugador = 1; jugador <= 2; ++jugador) {
        for (jugada = 1; jugada <= 12; ++jugada) {
            $$('#j'+jugador+"_"+jugada).text('-');
        }
    }

    actualizarTotal();
}
function fin(){
    var popup = crearPopupFinal();
    popup.open();
    limpiarTodo();
}
function limpiarTodo(){
    limpiar();
    $$('#nj1').text('');
    $$('#nj2').text('');
    $$('#j1').text('');
    $$('#j2').text('');
}

function toque(dados) {
    var puntos;
    puntos = calcular(idSeleccionado, dados);
    if (dados == 'servida' || dados == 'noservida') {
        dados = 1;
    }
    puntos = puntos * dados;
    $$('#' + idSeleccionado).text(puntos);
    actualizarTotal();
}
function tachar() {
    $$('#' + idSeleccionado).text('X');
    actualizarTotal();
}
function actualizarTotal() {
    for (jugador = 1; jugador <= 2; ++jugador) {
        var score = 0;
        for (jugada = 1; jugada <= 11; ++jugada) {
            var campo = parseInt($$('#j' + jugador + '_' + jugada).text());
            if (typeof campo == 'number' && !isNaN(campo)) {

                score += campo;
            }
        }
        $$('#j'+jugador+'_12').text(score);
    }
}
function calcular(id, ref) {
    var puntajeArmada = [1, 2, 3, 4, 5, 6, 20, 25, 40, 50, 60];
    var puntajeServida = [1, 2, 3, 4, 5, 6, 25, 30, 45, 55, 65];
    var indice = parseInt(id.split('_')[1]) - 1
    if(ref === "servida"){
        return puntajeServida[indice];
    }else{
        return puntajeArmada[indice];
    }
}