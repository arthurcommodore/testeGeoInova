
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
    const inputs = document.querySelectorAll('input')
    let inputsComplete 

    inputs.forEach(input => {
        inputsComplete = input.value.trim()
    })
    
    const promises = []
    inputsComplete ?
        (() => {
            saveLocal()
            Promise.all(generatePromises(promises))
                .then(json => insertMsg(json))
        })()
    : (() => {
        inputs.forEach(input => input.style.border = '1px solid red')
    })()
}

function getMsg(param) {
    return new Promise((resp, reject) => {
        msgs.push(param.message)
        resp(param) 
    })
}

function insertMsg(array) {
    const msg = document.querySelector('#msg')
    const msgText = []
    array.forEach(elem => {
        msgText.push(elem.message)
    })
    msg.innerHTML = msgText.toString()
}

function saveLocal() {
    inputName = document.querySelector('input[name="name"]')
    inputEmail = document.querySelector('input[name="email"]')
    inputNascimento = document.querySelector('input[name="nascimento"')

    localStorage.setItem('name', inputName.value)
    localStorage.setItem('email', inputEmail.value)
    localStorage.setItem('nascimento', inputNascimento.value)
}