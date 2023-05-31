"use strict"
let filter = document.querySelector('.filter')
//https://starline-alarm.by/starline/category_search/

async function getData(url) {

    let res = await fetch(url)

    let data = await res.json();

    return data;
}


let count = 0;
async function setFilter() {

    let data = await getData('https://starline-alarm.by/starline/category_search');
    console.log(data);

    data.forEach(({ title, categores }) => {
        let wrapper = document.createElement('div');

        let titleFilter = document.createElement('h3');
        titleFilter.textContent = title
        wrapper.append(titleFilter);



        categores.forEach((categore) => {
            let wrapperCheckBocks = document.createElement('label');
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.addEventListener('change', filterCards);


            let span = document.createElement('span');
            span.textContent = categore;
            wrapperCheckBocks.append(input);
            wrapperCheckBocks.append(span);
            wrapper.append(wrapperCheckBocks);
        })



        filter.append(wrapper);
    })

}

setFilter()

let cards = document.querySelector('.cards');

async function setCards() {

    let data = await getData('https://starline-alarm.by/starline/product/');

    console.log(data);

    data.forEach(({ title, image, category: { title: cat } }) => {

        cards.innerHTML += `
       <div>
       <h3>${title}</h3>
       <div>
         <img src = ${image} alt = ${title}>
       </div>
       <p>${cat}</p>
     </div>
       `


    })
}

setCards()

function filterCards(event) {

    let labe = event.target.parentElement;

    let nameChategori = labe.lastElementChild.textContent;

    let cards = document.querySelectorAll('.cards p')





    cards.forEach((elem) => {
        let wrapperCard = elem.parentElement;
        if (!(elem.textContent === nameChategori)) {

            wrapperCard.className = 'hidden'
            console.log(wrapperCard);
        } else {

            wrapperCard.className = 'visible'
        }

        if (!event.target.checked) {
            wrapperCard.className = 'visible'

        }
    })






}