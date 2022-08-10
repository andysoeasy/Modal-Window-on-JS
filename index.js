let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://get.pxhere.com/photo/apple-plant-fruit-food-red-produce-kitchen-eat-fruits-foods-apples-diet-edible-hunger-sano-flowering-plant-rose-family-nectarine-goodness-an-ingredient-land-plant-rose-order-711281.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://zdorof.ru/wp-content/uploads/2020/06/01_oranges_finally-here-s-which-orange-came-first-the-color-or-the-fruit_691064353_lucky-business.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://severdv.ru/wp-content/uploads/2019/11/mango.jpg'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 50%" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                      
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>  
`

function render(){
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',

    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})




document.addEventListener('click', event => {

    event.preventDefault()

    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id

    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()

    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            console.log('Remove')
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})