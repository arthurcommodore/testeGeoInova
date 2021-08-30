
const msgs = []
const urls = [
        'https://geoinova.com.br/teste/repositorio.php',
        'https://geoinova.com.br/teste/cache.php',
        'https://geoinova.com.br/teste/fila.php'
]
const date = {
    body: new FormData(document.getElementById('form')),
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post"
}


document.querySelector('button').addEventListener('click', validacao)

const generatePromises = promises => {
    urls.map((url, i) => {
        promises.push(fetch(url, date).then(resp => resp.json()))
    })
    return promises
}

function validacao() {
    const inputs = document.querySelector('input')
    
    const promises = []

    Promise.all(generatePromises(promises))
        .then(json => insertMsg(json))

    
}

function getMsg(param) {
    return new Promise((resp, reject) => {
        msgs.push(param.message)
        resp(param) 
    })
}

function insertMsg(array) {
    const msg = document.querySelector('#msg')
    const p = document.createElement('p')

    array.forEach(elem => {
        p.insertAdjacentText('beforeend', elem.message)
    })
    msg.insertAdjacentElement('beforeend', p)
}