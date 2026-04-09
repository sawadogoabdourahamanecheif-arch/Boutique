// CONFIG FIREBASE (tu vas remplacer après)
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let user = {};
let currentProduct = {};

// LOGIN
function login(){
    user.nom = nom.value;
    user.numero = numero.value;
    user.quartier = quartier.value;

    if(user.nom && user.numero && user.quartier){
        document.getElementById("login").style.display="none";
        document.getElementById("app").style.display="block";
        loadProducts();
    }
}

// PRODUITS
const products = [
    {nom:"Crème", desc:"Bonne pour la peau", cat:"cosmetique"},
    {nom:"Huile", desc:"100% naturel", cat:"soin"},
    {nom:"Parfum", desc:"Longue durée", cat:"beaute"}
];

function loadProducts(){
    const container = document.getElementById("products");
    container.innerHTML="";

    products.forEach(p=>{
        container.innerHTML += `
        <div class="product" onclick="showProduct('${p.nom}','${p.desc}')">
            <p>${p.nom}</p>
        </div>`;
    });
}

function filter(cat){
    const filtered = products.filter(p=>p.cat===cat);
    const container = document.getElementById("products");
    container.innerHTML="";

    filtered.forEach(p=>{
        container.innerHTML += `
        <div class="product" onclick="showProduct('${p.nom}','${p.desc}')">
            <p>${p.nom}</p>
        </div>`;
    });
}

// MODAL
function showProduct(nom, desc){
    currentProduct = {nom, desc};
    title.innerText = nom;
    desc.innerText = desc;
    modal.classList.remove("hidden");
}

function closeModal(){
    modal.classList.add("hidden");
}

// COMMANDE (🔥 ENREGISTRÉE DANS FIREBASE)
function order(){
    db.collection("commandes").add({
        user: user,
        produit: currentProduct,
        date: new Date()
    });

    alert("Commande envoyée !");
}