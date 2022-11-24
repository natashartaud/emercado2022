document.getElementById("email1").value = sessionStorage.getItem("email");

document.getElementById("name").value = localStorage.getItem("name");
document.getElementById("secondname").value = localStorage.getItem("secondname");
document.getElementById("surname").value = localStorage.getItem("surname");
 document.getElementById("cellphone").value = localStorage.getItem("cellphone");

function validateProfile () { 
   localStorage.setItem("name", document.getElementById("name").value);
   localStorage.setItem("secondname", document.getElementById("secondname").value);
   localStorage.setItem("surnam", document.getElementById("surname").value);
   localStorage.setItem("secondsurname", document.getElementById("secondsurname").value);
   localStorage.setItem("cellphone", document.getElementById("cellphone").value);
}
  

function gotPhoto(element) { 
    let file = element.files[0];
 
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    async function Main() {
       const file = document.querySelector('#userImage').files[0];
       localStorage.setItem("img", await toBase64(file));
       document.getElementById("userImageProfile").src=localStorage.getItem("img");
    }
    
    Main();
   }  