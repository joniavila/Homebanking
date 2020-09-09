//Declaración de variables
var nombreUsuario = "Jonas Avila";
var saldoCuenta = 1000;
var limiteExtraccion = 200;
var monto = 0;
var agua = 350;
var telefono= 425;
var luz = 210;
var internet= 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var codigo = 1234;
var cuentablock = false;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//FUNCION PARA CAMBIAR EL LIMITE DE EXTRACCION
function cambiarLimiteDeExtraccion() {
    if (cuentablock==false){
        monto = parseInt(prompt("CAMBIAR EL MONTO DE EXTRACCION POR: "));
        if(esNumerico(monto)){
            if(monto!=0){
                if(multiploDeCien(monto)){
                    limiteExtraccion = monto;
                    actualizarLimiteEnPantalla();
                    alert("EL NUEVO LIMITE DE EXTRACCION ES: "+limiteExtraccion);
                }
            }else{
                valorCero();   
            }
        }
    }else{
        cuentaBloqueada();
    }
}

//FUNCION PARA EXTRAER DINERO
function extraerDinero() {
    if (cuentablock==false){    
        if(haySaldoDisponible()){
            var saldoAnterior = saldoCuenta;
            monto = parseInt(prompt("INGRESAR EL MONTO A EXTRAER DE LA CUENTA: "));
            if(esNumerico(monto)){
                if(monto!=0){
                    if(monto>saldoCuenta){
                        sinSaldo();
                    }else if(monto>limiteExtraccion){
                            alert("EL MONTO QUE DESEA EXTRAER SUPERA EL LIMITE DE EXTRACCION");
                        }else if(multiploDeCien(monto)){
                            restarMontos(monto);
                            actualizarSaldoEnPantalla();
                            alert("HAS EXTRAIDO: "+monto+
                                "\nSALDO ANTERIOR: "+saldoAnterior+
                                "\nSALDO ACTUAL: "+saldoCuenta);
                        }
                }else{
                    valorCero();
                }
            }
        }else{
            sinSaldo();
        }
    }else{
        cuentaBloqueada();
    }
}

//FUNCION PARA DEPOSITAR DINERO
function depositarDinero() {
    if (cuentablock==false){
        var saldoCuentaAnterior = saldoCuenta;
        monto = parseInt(prompt("INGRESAR EL MONTO A DEPOSITAR EN LA CUENTA: "));
        if(esNumerico(monto)){
            if(monto!=0){
                sumarMontos(monto);
                actualizarSaldoEnPantalla();
                alert("HAS DEPOSITADO: "+monto+
                    "\nSALDO ANTERIOR: "+saldoCuentaAnterior+
                    "\nSALDO ACTUAL: "+saldoCuenta);
            }else{
                valorCero();
            }
        }
    }else{
        cuentaBloqueada();
    }
}

//FUNCION PARA PAGAR LOS SERVICIOS
function pagarServicio() {
    if (cuentablock==false){
        var saldo = saldoCuenta;
        var servicioPago = "";
        if(haySaldoDisponible()){
            var servicio = (prompt("INGRESE EL VALOR DEL SERVICIO QUE DESEA ABONAR:"+
                                    "\n 1-SERVICIO DE AGUA ($350)"+
                                    "\n 2-SERVICIO DE LUZ ($210)"+
                                    "\n 3-SERVICIO DE INTERNET ($570)"+
                                    "\n 4-SERVICIO DE TELEFONO ($425)"));
            switch(servicio){
            case "1": 
                    if(saldoCuenta<agua){
                        sinSaldo();    
                    }else{
                        restarMontos(agua);
                        servicioPago = "AGUA";
                        servicioPagado(servicioPago,saldo,agua);
                        actualizarSaldoEnPantalla();
                    }
                    break;
            case "2":
                    if(saldoCuenta<luz){
                        sinSaldo();
                    }else{
                        restarMontos(luz);
                        servicioPago = "LUZ";
                        servicioPagado(servicioPago,saldo,luz);
                        actualizarSaldoEnPantalla();
                    }
                    break;
            case "3":
                    if(saldoCuenta<internet){
                        sinSaldo();
                    }else{
                        restarMontos(internet);
                        servicioPago = "INTERNET";
                        servicioPagado(servicioPago,saldo,internet);
                        actualizarSaldoEnPantalla();
                    }
                    break;
            case "4":
                    if(saldoCuenta<telefono){
                        sinSaldo();
                    }else{
                        restarMontos(telefono);
                        servicioPago = "TELEFONO";
                        servicioPagado(servicioPago,saldo,telefono);
                        actualizarSaldoEnPantalla();
                    }
                    break;
            default:
                    alert("INGRESE UN VALOR CORRESPONDIENTE A UN SERVICIO");
            }
        }else{
            sinSaldo();
        }
    }else{
        cuentaBloqueada();
    }   
}

//FUNCION PARA TRANSFERIR DINERO
function transferirDinero() {
    if (cuentablock==false){
        if(haySaldoDisponible()){
            monto = parseInt(prompt("INGRESE EL MONTO A TRANSFERIR: "));
            if(esNumerico(monto)){
                if(monto!=0){
                    if(monto>saldoCuenta){
                    sinSaldo();
                    }else{
                        var cuentaAtrasnferir = parseInt(prompt("CUENTAS AMIGAS: "+
                                                                "\nCUENTA AMIGA Nº1: 1234567"+
                                                                "\nCUENTA AMIGA Nº2: 7654321"+
                                                                "\nINGRESE EL NUMERO DE CUENTA A TRANSFERIR: "));
                        if (cuentaAtrasnferir == cuentaAmiga1 || cuentaAtrasnferir== cuentaAmiga2){
                            restarMontos(monto);  
                            actualizarSaldoEnPantalla();
                            alert("SE HAN TRANSFERIDO: "+monto+
                                "\n CUENTA DESTINO: "+cuentaAtrasnferir);
                        }else{
                            alert("UNICAMENTE PUEDE TRANSFERIR DINERO A CUENTAS AMIGAS");
                        }
                    }
                }else{
                    valorCero();
                }
            }
        }else{
            alert(sinSaldo());
        }
    }else{
        cuentaBloqueada();}
}

//FUNCION PARA INICIAR SESION
function iniciarSesion() {
    for(var i=1;i<4 ;i++){
        codigoIngresado = parseInt(prompt("INGRESAR CODIGO DE INGRESO DE 4 DIGITOS: "));
        if(codigoIngresado==codigo){
            alert("---BIENVENIDO JONAS AVILA, YA PUEDES COMENZAR A REALIZAR TUS MOVIMIENTOS---");
            break;
        }else if(i==3){
            alert("-------------SU CUENTA HA SIDO BLOQUEADA-------");
            bloquearCuenta();
            break;
            }      
            alert("--EL CODIGO INGRESADO ES INCORRECTO--"+
                  "\n--INGRESELO NUEVAMENTE, INTENTO "+i+"/3 ");   
    }
}

// FUNCION PARA SUMAR
function sumarMontos(monto){
    saldoCuenta = saldoCuenta + monto;
}

//FUNCION PARA RESTAR
function restarMontos(monto){
    saldoCuenta=saldoCuenta-monto;
}

//FUNCION PARA VALIDAR QUE SEA NUMERICO
function esNumerico(monto){
    if(monto/1==monto){
        return true;
    }else{
        alert("-----INGRESE UN VALOR NUMERICO----");
    }
}

//FUNCION PARA VALIDAR SI HAY SALDO DISPONIBLE
function haySaldoDisponible(){
    if(saldoCuenta>0 && saldoCuenta!=null){
        return true;
    }else{
        return false;
    }
}

//FUNCION PARA MOSTRAR EL SERVICIO PAGO
function servicioPagado(servicio, saldo, monto){
    alert("HAS ABONADO EL SERVICIO DE: "+servicio+
          "\n SALDO ANTERIOR: "+saldo+
          "\n DINERO DESCONTADO: "+monto+
          "\n SALDO ACTUAL: "+saldoCuenta); 
}

//FUNCION PARA VALIDAR QUE EL MONTO SEA MULTIPLO DE 100
function multiploDeCien(monto){
        if (monto%100!=0){
            alert("UNICAMENTE PUEDE RETIRAR BILLETES DE $100, INGRESE VALORES ENTEROS MULTIPLOS DE 100");
        }else{
            return true;
        }
}

//FUNCIO QUE INDICA QUE NO HAY SALDO DISPONIBLE
function sinSaldo(){
    alert("---NO POSEE SALDO DISPONIBLE PARA LA OPERACION SOLICITADA--- ");
}

// FUNCION PARA BLOQUEAR CUENTA
function bloquearCuenta(){
    saldoCuenta = 0;
    nombreUsuario = "";
    limiteExtraccion = 0;
    cuentablock = true;
    actualizarLimiteEnPantalla;
    actualizarSaldoEnPantalla;
}

//FUNCION PARA CUENTA BLOQUEADA
function cuentaBloqueada(){
    alert("SU CUENTA HA SIDO BLOQUEADA, INGRESE SESION NUEVAMENTE");
}

//FUNCION PARA INFORMAR QUE INGRESE UN VALOR DISTINTO DE 0
function valorCero(){
    alert("--- INGRESE UN VALOR DISTINTO DE 0 ---")
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
