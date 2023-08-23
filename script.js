class CartItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
}

fetch(" https://striveschool-api.herokuapp.com/books")
  .then((response) => response.json())
  .then((books) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) creaCart(cart);
    creaTabella(books, cart);
  })
  .catch((err) => console.log(err));

const scarta = (event, books, cart) => {
  const titolo = event.target.parentElement.firstChild.innerText;
  event.target.parentElement.parentElement.remove();
  for (let i = 0; i < books.length; i++) {
    if (titolo === books[i].title) {
      books.splice(i, 1);
    }
  }
  if (cart !== undefined) {
    for (let i = 0; i < cart.length; i++) {
      if (titolo === cart[i].title) {
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
  tabella.innerHTML = "";
  creaTabella(books, cart);
};
const deleteCartItem = (event, cart) => {
  const item = event.currentTarget.parentElement;
  const index = item.children[1].innerText.indexOf("Price");
  const text = item.children[1].innerText.slice(0, index - 1);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title === text) {
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  item.remove();
};
const creaCart = (cart) => {
  for (let i = 0; i < cart.length; i++) {
    const btn = document.createElement("button");
    btn.addEventListener("click", (event) => deleteCartItem(event, cart));
    const p = document.createElement("span");
    p.style = "font-size:10px";
    const div = document.createElement("div");
    div.className = "text-white ";
    const c = document.getElementById("cart");
    btn.innerHTML = `<i class="bi bi-trash"></i>`;
    p.innerText = cart[i].title + " " + cart[i].price;
    p.className = "ms-2";
    btn.classList.add("btndelete");
    div.appendChild(btn);
    div.appendChild(p);
    c.appendChild(div);
  }
};

const buy = (event, cart) => {
  const obj = event.target.parentElement;
  cart.push(new CartItem(obj.children[0].innerText, obj.children[1].innerText));
  localStorage.setItem("cart", JSON.stringify(cart));
  const btn = document.createElement("button");
  btn.addEventListener("click", (event) => deleteCartItem(event, cart));
  const p = document.createElement("span");
  p.style = "font-size:10px";
  const div = document.createElement("div");
  div.className = "text-white ";
  const c = document.getElementById("cart");
  btn.innerHTML = `<i class="bi bi-trash"></i>`;
  p.innerText = obj.children[0].innerText + " " + obj.children[1].innerText;
  p.className = "ms-2";
  btn.classList.add("btndelete");
  div.appendChild(btn);
  div.appendChild(p);
  c.appendChild(div);
};

const creaTabella = (books, cart) => {
  const tabella = document.querySelector("#tabella");
  for (let i = 0; i < books.length; i++) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card";
    card.style = "height:600px ";
    const img = document.createElement("img");
    img.setAttribute("src", books[i].img);
    img.setAttribute("alt", "img");
    img.className = "card-img-top";
    img.classList.add("imgStyle");
    const cardbody = document.createElement("div");
    cardbody.className = "card-body d-flex flex-column";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.style = "font-size:15px";
    title.innerText = books[i].title;
    const price = document.createElement("p");
    price.className = "card-text";
    price.style = "margin-bottom:auto;font-size:14px";
    price.innerText = `Price € ${books[i].price}`;
    const btn = document.createElement("a");
    btn.className = "btn btn-primary mx-2 mb-1";
    btn.innerText = "Scarta";
    btn.addEventListener("click", (event) => scarta(event, books, cart));
    const compra = document.createElement("a");
    compra.className = "btn btn-primary mx-2";
    compra.innerText = "Compra";
    compra.addEventListener("click", (event) => buy(event, cart));
    cardbody.appendChild(title);
    cardbody.appendChild(price);
    cardbody.appendChild(btn);
    cardbody.appendChild(compra);
    card.appendChild(img);
    card.appendChild(cardbody);
    col.appendChild(card);
    tabella.appendChild(col);
  }
};
