
let credit = document.getElementById("credit");
let transfer = document.getElementById("transfer");
let selecpaymentalert = document.getElementById("selecpaymentalert");
let shipping15 = document.getElementById('prem'); 
let shipping7 = document.getElementById('exp');
let shipping5 = document.getElementById('stand'); 
let form = document.getElementById('formcart');
let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
let alertTrigger = document.getElementById('liveAlertBtn');



fetch(CART_INFO_URL).then(response => response.json()).then(data => {
  productdata = data;
  showCartProduct();
  calcSubtotal();
 

});

function showCartProduct() {
  let selectedProdInfo = document.getElementById("cartProducts");
  selectedProdInfo.innerHTML = `<table class="table ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><img src="${productdata.articles[0].image}"class="img-thumbnail" width="110px"></th>
            <td>${productdata.articles[0].name}</td>
            <td>U$S${productdata.articles[0].unitCost}</td>
            <td><input type=number id="cantProd" min="1" value="1" onclick="calcSubtotal ()"></td>
            <td>U$S <span id="result"> </span></td>
          </tr>
          `
}

function calcSubtotal() {
  let cantProd = document.getElementById("cantProd").value;
  let priceProd = productdata.articles[0].unitCost
  let subtotal = cantProd * priceProd;
  document.getElementById("result").innerText = subtotal;
  document.getElementById("subtotal").innerText= `U$S  ${subtotal} `;
  
  if (shipping15.checked){
    result = subtotal*0.15;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("total").innerText = `U$S  ${total} `;
  } else if (shipping7.checked){
    result = subtotal*0.07;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("total").innerText = `U$S  ${total} `;
  } else if (shipping5.checked){
    result = subtotal*0.05;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("total").innerText = `U$S  ${total} `;
  }

}

function selPaymentMethod(){
  let credit= document.getElementById("credit").checked; 
  let transfer= document.getElementById("trans-number");
  let ccnumber=document.getElementById("cc-number");
  let ccsecnumber=document.getElementById("cc-secnumber");
  let ccexpiration=document.getElementById("cc-expiration");
  if (credit){
      transfer.disabled= true;
     ccnumber.disabled= false;
      ccsecnumber.disabled= false;
      ccexpiration.disabled= false;
    } else {
      transfer.disabled= false;
      ccnumber.disabled= true;
      ccsecnumber.disabled= true;
      ccexpiration.disabled= true;
    }
 }

 function validatePayments() {
  if (!transfer.checked && !credit.checked) {
    selecpaymentalert.style.color = "red";
    selecpaymentalert.innerHTML = "Debe seleccionar una forma de pago";    
  } else{
    selecpaymentalert.innerHTML = "";
  }
}



(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


function alert(message, type) {
  if(form.checkValidity()){ 
  let wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
    }
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function (event) {
    alert('¡Has comprado con éxito!', 'success')
    if(form.checkValidity()){  
    event.preventDefault()
  }
  })
}



