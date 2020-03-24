
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
                toque("X");
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
                toque("X");
            }
        },
        {
            text: 'Cancelar',
            color: 'red'
        }, ,
    ]
})
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    // se llega aca, cuando termina de cargar el INDEX.html
    console.log("Device is ready!");

    $$('#inicio').on('click', function () {

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
})
$$(document).on('page:init', '.page[data-name="finjuego"]', function (e) {
    // se ejecuta cuando se carga FIN JUEGO
    console.log(e);

})
function toque(dados) {
    var puntos;
    ide = idSeleccionado;
    puntos = calcular(idSeleccionado, dados);
    if (dados == 'servida' || dados == 'noservida') {
        dados = 1;
    }
    puntos = puntos * dados;
    $$('#' + ide).text(puntos);
    //total();
    $$('#' + ide).off('click');
}
function calcular(id, ref) {
    var a = 0;
    switch (id) {
        case 'j1_1':
            a = 1;
            break
        case 'j1_2':
            a = 2;
            break
        case 'j1_3':
            a = 3;
            break
        case 'j1_4':
            a = 4;
            break
        case 'j1_5':
            a = 5;
            break
        case 'j1_6':
            a = 6;
            break
        //servido / no servido
        case 'j1_7':
            if (ref == 'servida') {
                a = 25;
            } else {
                a = 20;
            }
            break
        case 'j1_8':
            if (ref == 'servida') {
                a = 30;
            } else {
                a = 25;
            }
            break
        case 'j1_9':
            if (ref == 'servida') {
                a = 45;
            } else {
                a = 40;
            }
            break
        case 'j1_10':
            if (ref == 'servida') {
                a = 55;
            } else {
                a = 50;
            }
            break
        case 'j1_11':
            if (ref == 'servida') {
                a = 65;
            } else {
                a = 60;
            }
            break

        //jugador 2  
        case 'j2_1':
            a = 1;
            break
        case 'j2_2':
            a = 2;
            break
        case 'j2_3':
            a = 3;
            break
        case 'j2_4':
            a = 4;
            break
        case 'j2_5':
            a = 5;
            break
        case 'j2_6':
            a = 6;
            break
        //servido / no servido
        case 'j2_7':
            if (ref == 'servida') {
                a = 25;
            } else {
                a = 20;
            }
            break
        case 'j2_8':
            if (ref == 'servida') {
                a = 30;
            } else {
                a = 25;
            }
            break
        case 'j2_9':
            if (ref == 'servida') {
                a = 45;
            } else {
                a = 40;
            }
            break
        case 'j2_10':
            if (ref == 'servida') {
                a = 55;
            } else {
                a = 50;
            }
            break
        case 'j2_11':
            if (ref == 'servida') {
                a = 65;
            } else {
                a = 60;
            }
            break
    }
    return (a)
}