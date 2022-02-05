import {validarFormulario} from './modules/validarForm.js';
import {almacenarDatos, comprar, errorCheckout} from './modules/controlCheckout.js';

const monto = JSON.parse(sessionStorage.getItem("totalCart"));
let user = []
$('#cancelar').click(function(){
    $(location).attr('href','../')
})
$('#inputMonto').val(monto)

async function main(){

    validarFormulario()
    $("#formulario-donacion").bind("submit", function (e) {
        e.preventDefault();
        //si validar formulario devuelve true
        if(validarFormulario()){
            $.ajax({
                type: $(this).attr("method"),
                url: $(this).attr("action"),
                data:$(this).serialize(),
                //Esta función se ejecuta durante el envió de la petición al servidor
                beforeSend: function(){
                    user =  almacenarDatos();
                },
                //Se ejecuta cuando termina la petición y esta ha sido correcta
                success: function(){
                    comprar(user[0], monto)
                },
                //Se ejecuta si la petición ha sido erronea
                error: function(){
                    errorCheckout()
                }
            });
            //Al retornar false nos cancela el envio del formulario
            return false; 
        }else{
            errorCheckout()
            return false;
        }
    })
}

main()
