let validacion = [];
export function validarFormulario(){
    //validaciones para el input nombre y apellido
    $('#inputName').keyup(function(){
        if((isNaN($('#inputName').val()))===false){
            errorValidacion('no se puede colocar numeros', 'Name');
        }
        else if( ($('#inputName').val()).length <=3 ){
            errorValidacion('no se puede poner menos de 3 caracteres', 'Name');
        }
        else{
            validar('Name');
        }
    });
    //Validaciones para el input tarjeta
    $('#inputTarjeta').keyup(function(){
        if((isNaN($('#inputTarjeta').val()))===true){
            errorValidacion('no se pueden colocar letras', 'Tarjeta');
        }
        else if( ($('#inputTarjeta').val()).length <16 || ($('#inputTarjeta').val()).length >=17 ){
            errorValidacion('debe ingresar 16 digitos', 'Tarjeta');
        }
        else{
            validar('Tarjeta');
        }
    });
    //validaciones para el input caducidad
    $('#inputCaducidad').keyup(function(){
        if((isNaN($('#inputCaducidad').val()))===true){
            errorValidacion('no se pueden colocar letras', 'Caducidad');
        }
        else if( ($('#inputCaducidad').val()).length <4 || ($('#inputCaducidad').val()).length >=5 ){
            errorValidacion('debe ingresar 4 digitos en formato mmaa ej: 1021', 'Caducidad');
        }
        else{
            validar('Caducidad');
        }
    });
    //validaciones para el input codigo
    $('#inputCodigo').keyup(function(){
        if((isNaN($('#inputCodigo').val()))===true){
            errorValidacion('no se pueden colocar letras', 'Codigo');
        }
        else if( ($('#inputCodigo').val()).length <3 || ($('#inputCodigo').val()).length >=4 ){
            errorValidacion('debe ingresar los 3 digitos del reverso de su tarjeta', 'Codigo');
        }
        else{
            validar('Codigo');
        }
    });
    $("#inputCheck").change(function(){
        if(!($("#inputCheck").prop('checked'))){
            errorValidacion('debe aceptar los terminos y condiciones para continuar', 'Check');
        }else{
            validar('Check');
        }
    });
    //Si las validaciones dan true da el ok para que se pueda enviar el formulario
    if(validacion['name'] && validacion['tarjeta'] && validacion['caducidad'] && validacion['codigo'] && validacion['check']){
        return true
    }
    //sino quita el check a los terminos y condiciones y retorna false
    else{
        $("#inputCheck").prop('checked', false);
        errorValidacion('debe aceptar los terminos y condiciones para continuar', 'Check');
        return false
    }
}
//si no se cumple con la validacion enfoca al input causante y le pone estilos para que se de cuenta de ello
//retorna false, cont equivale a que input se refiere: 1 = inputName 2 = InputTarjeta etc...
function errorValidacion(msg, inputType){
    $('#input'+inputType).focus();
    $('#input'+inputType).css('border', '1px solid red');
    $('#'+inputType.toLowerCase()+'Help').text(msg);
    $('#'+inputType.toLowerCase()+'Help').css('color','red');
    validacion[inputType.toLowerCase()] = false;
}
//si se cumple con la validacion pone estilos en el input validado para que el usuario se de cuenta de que esa bien
//retorna true
function validar(inputType){
    $('#'+inputType.toLowerCase()+'Help').text('');
    $('#input'+inputType).css('border', '1px solid green');
    validacion[inputType.toLowerCase()] = true;
}