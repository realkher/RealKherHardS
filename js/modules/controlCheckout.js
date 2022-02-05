
export const almacenarDatos = () =>{
    let user = []
    $('input').each(function(){
        user.push(this.value)
    })
    return user
}
export const comprar = (nameUser, monto) =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: nameUser+' porfavor confirme su compra',
        text: "Monto de compra: $"+monto,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false
    }).then((result) => {
        if(result.isConfirmed) {
            let order = Math.floor(Math.random()*(99999-10000+1)+10000);
            swalWithBootstrapButtons.fire(
                'Compra realizada!',
                `Gracias por elegir Realkher Hardstore, en unos minutos nos pondremos en contacto para seguir con su compra!
                Porfavor guarde su numero de orden: ${order}`,
                'success'
            ).then(() => {
                $(location).attr('href','../')
            })
        } 
        else if(result.dismiss === Swal.DismissReason.cancel){
            swalWithBootstrapButtons.fire(
                'Compra cancelada',
                'Si estuvo teniendo inconvenientes con su compra recuerde que puede contactarnos!',
                'error'
            ).then(() => {
                $(location).attr('href','../')
            })
        }
    })
}
export const errorCheckout = () =>{
    Swal.fire(
        'Error',
        'Estamos teniendo problemas para ejecutar su peticion, intente de nuevo mas tarde.',
        'error'
      )
}