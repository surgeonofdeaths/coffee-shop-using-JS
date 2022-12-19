const userSurname = document.querySelector('input[name="surname"]')
const userName = document.querySelector('input[name="name"]')

const goodsElements = document.querySelectorAll('input[type="checkbox"]')
const countElements =  document.querySelectorAll('input[type="number"]')

const btn = document.querySelector('.btn')
const resultElem = document.querySelector('.result')

const countGoods = {
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "cappuccino": 0,
    "chocolate-muffin": 0,
    "blueberry-muffin": 0,
    "apple-tart": 0
}

const choicePriceGoods = {
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "cappuccino": 0,
    "chocolate-muffin": 0,
    "blueberry-muffin": 0,
    "apple-tart": 0
}

function finalGoods() {
    let goods = []
    for (let goodItem in countGoods) {
        if (countGoods[goodItem] !== 0) {
            goods.push(goodItem)
        }
    }
    return goods.join(', ')
}

function calculatePriceSum () {
    let tally = 0
    for (let key in countGoods) {
        if (countGoods[key] < 0) {
            tally = 'Ошибка. Негативное количество недопустимо.'
            break
        } else {
            tally += countGoods[key] * choicePriceGoods[key]
        }
    }
    resultElem.innerHTML = tally.toString()
}

countElements.forEach(elem => {
    elem.addEventListener('change', function () {
        countGoods[elem.id] = parseInt(elem.value)
        calculatePriceSum.call()
    })
})

goodsElements.forEach(product => {
    product.addEventListener('change', () => {
        let countElement = document.querySelector(`#${product.value}`)
        if (product.checked) {
            choicePriceGoods[product.value] = parseInt(product.dataset.price)
            if (countElement.value === '0') {
                countElement.value = '1'
                countGoods[product.value] = 1
                choicePriceGoods[product.value] = parseInt(product.dataset.price)
            }
        } else {
            choicePriceGoods[product.value] = 0
            countElement.value = 0
        }
        calculatePriceSum.call()
    })
});

btn.addEventListener('click', () => {
    let totalGoods = finalGoods.call()
    alert(`${userSurname.value} ${userName.value} заказал:\n${totalGoods}\nНа сумму: ${resultElem.innerHTML}`)
})


