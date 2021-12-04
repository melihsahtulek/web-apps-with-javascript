getJsonData = () => {
    fetch('./productList.json')
        .then(data => data.json())
        .then(data => {
            addHtml(data,itemsBtn);
        })
}

getJsonData();

const itemContainer = document.querySelector('#itemContainer');
addHtml = (data,callback) => {
        for (const key in data) {
            itemContainer.innerHTML += `
                <div class="col-md-4 col-12 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"> ${data[key].product} </h5>
                            <h6 class="card-subtitle mb-2 text-muted" data-id="${Math.ceil(data[key].money)}">$${Math.ceil(data[key].money)} </h6>
                            <button class="card-link btn btn-success btn-sm" data-id="${data[key].id}" id="addTocardBtn">Add To Card</button>
                        </div>
                    </div>
                </div>
            `;
        } 
        callback(card);   
        card();
}

let lcCard = []
if (localStorage.card) {
    lcCard = JSON.parse(localStorage.card);
}
lcSetItem = () => {
    localStorage.setItem('card', JSON.stringify(lcCard));
}
itemsBtn = (callback) => {
    const addTocardBtn = document.querySelectorAll('#addTocardBtn');
    addTocardBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            control = true;
            lcCard.forEach((item) => {
                if (item.id == e.target.parentElement.children[2].getAttribute('data-id')) {
                    confirm('Ürün Sepette Ekli...')
                    control = false;
                }
            })
            if (control) {
                lcCard.push(
                    {
                        id: e.target.parentElement.children[2].getAttribute('data-id'),
                        name: e.target.parentElement.children[0].textContent,
                        price: e.target.parentElement.children[1].getAttribute('data-id'),
                        unit:1
                    }
                );
            }
            lcSetItem();
            callback();
        });
    });
}

const ul = document.getElementsByTagName('ul')[0];
card = () => {
    let cardtotal = 0;
    let totalPrice = 0;
    ul.innerHTML = ''
    lcCard.forEach(item => {
        ul.innerHTML += `
            <li class="list-group-item">${item['name']} 
                <span class="text-right float-right"><b id="itemUnit">${item['unit']}</b></span> <br>
                <small> $${Math.ceil(item['price'] * item['unit'])}</small>
                <br>
                <button class="btn btn-primary btn-sm" onclick="cardItemsSet(${item['id']},this,'increase')">+</button> 
                <button class="btn btn-primary btn-sm" onclick="cardItemsSet (${item['id']},this,'decrease')">-</button>
                <button class="btn btn-danger btn-sm" onclick="cardItemsSet(${item['id']},this,'remove')">X</button>
            </li>
        `;

        cardtotal += item['unit'];
        totalPrice += Math.ceil(item['price'] * item['unit']);
    });
    document.querySelector('#cardTitle').innerHTML = `
        <b>Card...:: </b> ${cardtotal} <br>
        <b>Total...:: </b> $${totalPrice} <br>
        <button class="btn btn-outline-danger btn-sm w-50 d-none" onclick="allRemove(card)" id="allRemove">Remove List</button>
    `;
    if (lcCard.length >= 1) {
        document.querySelector('#allRemove').setAttribute('class','btn btn-outline-danger btn-sm w-50 d-inline')
    }
}

cardItemsSet = (id,e,opt) => {
    let itemUnit = e.parentElement.children[0].children[0].textContent;
    let intUnit = parseInt(itemUnit);
    let itemID = id;

    if (opt == 'increase') {
        intUnit += 1;
        for (let i = 0; i < lcCard.length; i++) {
            if (lcCard[i].id == itemID) {
                lcCard[i].unit = intUnit;
            }
        }
    }
    else if (opt == 'decrease') {
        intUnit -= 1;
        if (itemUnit != 1) {
            for (let i = 0; i < lcCard.length; i++) {
                if (lcCard[i].id == itemID) {
                    lcCard[i].unit = intUnit;
                }
            }
        }else{
            return false;
        }
    }else{
        for (let i = 0; i < lcCard.length; i++) {
            if (lcCard[i].id == itemID) {
             lcCard.splice(i ,1)
            }
        }
    }
    lcSetItem();
    card(); 
}

allRemove = (callback) => {
    localStorage.clear();
    lcCard = []
    callback();
}