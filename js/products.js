class Products{
    constructor(urlJSON){
        this.urlJSON = urlJSON
    }
    getProducts(idProduct){
        return new Promise(resolve => {
            $.getJSON(this.urlJSON, function(response, state){
                if(state==="success"){
                    if(idProduct){
                        const product = response.filter(product => product.id === idProduct)
                        resolve(product[0])
                    }else{
                        resolve(response)   
                    }
                }
            })
        })
    }
    innerHTML(products){
        for (const product of products) {
            $('#box-products').append(`
                <div class="product">
                    <img src="${product.img}" alt="">
                    <div class="data-product">
                        <p>${product.name}</p>
                        <p>$${product.price}</p>
                        <div class="add-cart" onclick="add(${product.id})">+ añadir al carrito</div>
                    </div>
                </div>
            `)
        }
    }
    addCart(product, productsInCart){
        $('.cart-product').remove()
        const isInCart = this.isInCart(product, productsInCart)
        //si el producto a agregar no se encuentra en el carrito se añade con la cantidad 1
        if(!isInCart==='true' || isInCart===undefined){
            product.cant = 1
            productsInCart.push(product)
            this.updateCart(productsInCart)
        }        
    }
    isInCart(product, productsInCart){
        for (const productData of productsInCart) {
            //si el producto a agregar se encuentra en el carrito se le suma +1 a su cantidad actual
            if(product.id === productData.id){
                productData.cant = productData.cant + 1
                this.updateCart(productsInCart)
                return true
            }
        }
    }
    updateCart(productsInCart, animationSet){
        //guarda el precio total de los productos
        const total = this.totalPrice(productsInCart)
        //limpia el carrito y vuelve a listar los productos que no se eliminaron o que se añadieron
        //si animationSet existe entonces no hay animacion de actualizacion de carrito
        if(animationSet){
            $('.cart-product').remove()
        }else{
            $('.cart-product').css({"opacity": "0", "height":"20px"}).toggle(200, function(e){
                e.remove()
            })
        }
        for (const product of productsInCart) {
            $('#cart').append(`
            <div class="cart-product">
                <p class="product-name">${product.name}</p>
                <p>$${product.price}</p>
                <div id="cantidad">
                <p>${product.cant}</p>
                <div id="controller-sum" onclick="user.setCuantity(${product.id}, undefined, productsInCart)">+</div>
                <div id="controller-res" onclick="user.setCuantity(undefined, ${product.id}, productsInCart)">-</div>
                </div>
                <img class="trash" onclick="user.deleteProducts(${product.id}, productsInCart)" src="./img/icons/trash.png" alt="">
            </div>
            `)
        }
        if(productsInCart.length === 0){
            $('#content-total').remove()
        }else{
            $('#cart').append(`
            <div class="cart-product" id="content-total">
                <p class="product-name" id="total-price">Total: $<p id="total">${total}</p></p>
                <p id="buy" onclick="user.buy()">Comprar</p>
            </div>
            `)
        }
        this.updateQuantity(productsInCart)
    }
    updateQuantity(productsInCart){
        //actualiza la cantidad total del boton carrito
        let cant = 0
        if(productsInCart.length===0){
            $('#number-products').html(cant)
        }else{
            for (const product of productsInCart) {
                cant = cant + product.cant
                $('#number-products').html(cant)
            }
        }
    }
    setCuantity(idProductSum, idProductRes, productsInCart){
        //control de botones de suma y resta en carrito
        if(idProductSum){
            for (const product of productsInCart) {
                if(product.id === idProductSum){
                    product.cant = product.cant + 1
                }
            }
            this.updateCart(productsInCart, true)
        }else{
            for (const product of productsInCart) {
                if(product.id === idProductRes){
                    if(product.cant>=2){
                        product.cant = product.cant - 1
                    }
                }
            }
            this.updateCart(productsInCart, true)
        }
    }
    deleteProducts(idProduct, productsInCart){
        //elimina un producto en especifico del carrito
        if(idProduct){
            productsInCart.forEach((product, index, object) => {
                if(product.id === idProduct){
                    object.splice(index, 1)
                }
            })
            this.updateCart(productsInCart)
        }else{
            //vacia el carrito completamente
            productsInCart.length = 0
            this.updateCart(productsInCart)
        }
    }
    totalPrice(productsInCart){
        //se obtiene el precio total de la compra iterando los productos del carrito
        let total = 0
        for (const product of productsInCart) {
            total = total + (product.cant * product.price)
        }
        return total
    }
    buy(){
        //se guarda el monto total de la compra y reedirecciona al checkout
        const totalJson = JSON.stringify($('#total').html());
        sessionStorage.setItem("totalCart", totalJson);
        $(location).attr('href','secciones/checkout.html')
    }
}
const urlJSON = "./js/json/products.json"
const user = new Products(urlJSON)
const productsInCart = []

//al hacer click en añadir al carrito se ejecuta la siguiente funcion asincrona
async function add(idProduct){
    const product = await user.getProducts(idProduct)
    await user.addCart(product, productsInCart)
}
//lista los productos
async function listProducts(){
    const products = await user.getProducts()
    await user.innerHTML(products)
}
listProducts()
//al hacer click en el boton del carrito aparece o desaparece la tabla de productos agregados
$('#cart-button').click(function(){
    $('#cart').toggle()
})
//al hacer click sobre el primer icono trash en el carrito lo vacia completamente
$('#trash').click(function(){
    user.deleteProducts(undefined, productsInCart)
})
