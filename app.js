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
                <a class="item-img" href="single_page.html">

                    <img class="item-img-pic" src="${element.img}" alt="">
                    <div class="txt-box">
                        <p class="item-dsc">${element.title}</p>
                        <p class="content-font-card">${element.description}</p>
                        <p class="content-font-card-price">${element.price}</p>
                    </div>

                </a>

                <div class="add-box">
                    <a class="add"> <i class="fa fa-solid fa-cart-shopping" style="font-size: 14px;"><span
                                style="    font-family: Lato, sans-serif;"> Add to
                                Cart</span></i> </a>
                </div>
            </div>         
            
            `)

        containerEL.addEventListener("click", el => {
            console.log(`${element.title} added to cart`);
        })
    });

});