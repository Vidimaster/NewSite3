const url = "/data.json";
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(url);
    const containerEL = document.querySelector('.grid-feature.container.content-margin')
    data.forEach(element => {
        containerEL.insertAdjacentHTML("beforeend", `
            
               <div class="item_content">
                <a class="item-img">

                    <img class="item-img-pic" src="${element.img}" alt="">
                    <div class="txt-box">
                        <p class="item-dsc">${element.title}</p>
                        <p class="content-font-card">${element.description}</p>
                        <p class="content-font-card-price">${element.price}</p>
                    </div>

                </a>

                <div class="add-box" id="itm${element.id}">
                    <a class="add"> <i class="fa fa-solid fa-cart-shopping" style="font-size: 14px;"><span 
                                style="    font-family: Lato, sans-serif;"> Add to
                                Cart</span></i> </a>
                </div>
            </div>         
            
            `)
    });

    containerEL.addEventListener("click", function (e) {
        if (e.target.closest(".add-box") != null) {
            localStorage.setItem(e.target.closest(".add-box").id, JSON.stringify({ id: e.target.closest(".add-box").id }));
            location.reload();
        }
    });

    const CartItemEL = document.querySelector('.new_cart')

    if (localStorage.length > 0) {
        CartItemEL.insertAdjacentHTML("beforebegin", `<h2 class="cart_header">Cart Items</h2>`)
        for (let i = 0; i < localStorage.length; i++) {
            let str = JSON.parse(localStorage.getItem(localStorage.key(i)))

            CartItemEL.insertAdjacentHTML("beforeend", `
                
                <div class="cart_container">
                    <div class="container-left-cart item_in_cart"> <img src="${data[str.id.slice(-1)].img}" alt="" class="item-img">
                    </div>
                    <div class="container-right-cart item_in_cart">
                        <p class="content-font-card-header">MANGO PEOPLE T-SHIRT</p>
    
                        <p class="content-font-card-price" style="color: #F16D7F">Price: ${data[str.id.slice(-1)].price}</p>
                        <p class="content-font-card-price">Color: ${data[str.id.slice(-1)].color}</p>
                        <p class="content-font-card-price">Size: ${data[str.id.slice(-1)].size}</p>
                        <label for="name${data[str.id.slice(-1)].size}">Quantity: </label>
                        <input placeholder="${data[str.id.slice(-1)].quantity}" type="text" name="name${data[str.id.slice(-1)].size}" required minlength="1" maxlength="1" size="2" />
                    </div>
                    <div class="container-right-cart"><button id="remove${str.id.slice(-1)}" class="btn-cart-remove"><span
                                style="    font-family: Lato, sans-serif;">X</span></button></div>
                </div>      
         
         `)
        }
    }



    CartItemEL.addEventListener("click", function (e) {
        if (e.target.closest(".btn-cart-remove") != null) {
            localStorage.removeItem('itm' + e.target.closest(".btn-cart-remove").id.slice(-1));
            location.reload();
        }
    });

});



