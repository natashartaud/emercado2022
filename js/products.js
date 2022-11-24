
const ORDER_ASC_BY_PRICE = "0-1000000";
const ORDER_DESC_BY_PRICE = "1000000-0";
const ORDER_BY_PROD_REL = "Rel.";
const searchProduct = document.querySelector("#searchProduct");
const resultado = document.querySelector("#product-list-container");

let ProductList = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;


function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if (asoldCount > bsoldCount) { return -1; }
            if (asoldCount < bsoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}



const filtradoDeProductos = () => {
    resultado.innerHTML = "";
    const texto = searchProduct.value.toLowerCase();

    for (let product of ProductList) {
        let nombre = product.name.toLowerCase();
        let descripcion = product.description.toLowerCase();

        if (nombre.indexOf(texto) !== -1 || descripcion.indexOf(texto) !== -1) {
            resultado.innerHTML += `
                    
                <div class="row" >
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted"> Autos vendidos:${product.soldCount} </small>
                        </div>
                        <br> 
                        <br>
                        <p class="mb-1"> Descripcion: </p>
                        <p class="mb-1">${product.description}</p>
                        <p class="mb-1">${product.currency} ${product.cost}</p>
                        
                    </div>
                </div>
             `

        }

    }

    if (resultado.innerHTML === "") {
        resultado.innerHTML += `

        <h1> No contamos con ese producto por el momento... </h1>
        `

    }
}

var arrayDB = [];
var ultimoID = 0;
var newRegistration = {};
function generarID() {
    ultimoID++;
    return ultimoID;
}

function read(){
    document.getElementById('btnGet1').addEventListener('click', function(){
        let idGet = document.getElementById('inputGet1Id').value;
        for(let registration of arrayDB){
            
            if( registration.id.indexOf(idGet) !== -1){
                document.getElementById('results').innerHTML += `
                <li>${registration.nombre} ${registration.apellido} ${registration.id}</li>
                `
                
            }
            if (registration.id ===''){
                document.getElementById('results').innerHTML += `
                <li>No se encuentra el ID </li>
                `

            }
            
        }
    })
}

searchProduct.addEventListener('keyup', filtradoDeProductos)
filtradoDeProductos();



function showProductList() {

    let htmlContentToAppend = ""; //cocatenar info // 
    for (let i = 0; i < ProductList.length; i++) {
        let product = ProductList[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <div  onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted"> Autos vendidos:${product.soldCount} </small>
                        </div>
                        <br> 
                        <br>
                        <p class="mb-1"> Descripcion: </p>
                        <p class="mb-1">${product.description}</p>
                        <p class="mb-1">${product.currency} ${product.cost}</p>
                        
                    </div>
                </div>
            </div>
             `

        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProduct(sortCriteria, productArray) {
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        ProductList = productArray;
    }

    ProductList = sortProduct(currentSortCriteria, ProductList);

    //Muestro las categorías ordenadas
    showProductList();
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CARS_PRODUCT_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductList = resultObj.data.products
            showProductList()

        }
    });

    document.getElementById("sortByPriceDesc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByPriceAsc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortBySellArtc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductList();
    });



});

if (localStorage.getItem("text")) {
    document.getElementById("nombreUsuario").innerHTML = localStorage.getItem('text');
}

