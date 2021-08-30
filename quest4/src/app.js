const inputName = document.querySelector('input[name="name"]')
const inputNascimento = document.querySelector('input[name="nascimento"]')
const inputEmail = document.querySelector('input[name="email"]')

const buttonSubmit = document.querySelector('#submit')
const buttonSearch = document.querySelector('#search')

if(JSON.parse(localStorage.getItem('firstTime') ) === true)
   localInit() 

loadLocal()

    console.log(getPropries())

const saveCliente = () => {
    const [names, emails, nascimentos] = getPropries();
    const verify = () => {
        return names.length > 0 ?
            names.filter(name => name === inputName.value).length
        : 0 
    }

    console.log(verify())
    verify() === 0 ?
        (() => {
            names.push(inputName.value)
            localStorage.setItem('names', JSON.stringify(names))

            emails.push(inputEmail.value)
            localStorage.setItem('emails', JSON.stringify(emails))

            nascimentos.push(inputNascimento.value)
            localStorage.setItem('nascimentos', JSON.stringify(nascimentos))

            getCliente()
        })() : window.alert('nome de usuário já consta no sistema')
}


const getCliente = () => {
    const option = document.createElement('option')    
    option.innerHTML = inputName.value
    document.querySelector('#clientes')
        .insertAdjacentElement('beforeend', option)
}
const searchCliente = () => {
    const [names, emails, nascimentos] = getPropries()
    const divInfo = document.querySelector("#info")
    const cliente = document.querySelector("#clientes").value

    divInfo.innerHTML = ''

    const [name] = names.filter(name => name === cliente) 
    const index = names.indexOf(name)
    const email = emails[index] 
    const nascimento = nascimentos[index]

    const msg  = `
        Nome: ${name} \n
        Nascimento: ${nascimento} \n
        Email: ${email} \n
    `
    console.log(msg)
    divInfo.innerHTML = msg
}

const addCliente = () => {
    saveCliente()
}

function getPropries() {
    const names = JSON.parse(localStorage.getItem('names') )
    const emails = JSON.parse(localStorage.getItem('emails') )
    const nascimentos = JSON.parse(localStorage.getItem('nascimentos') )
    
    return [names, emails, nascimentos]
}

function localInit() {
    localStorage.setItem('firstTime', true)
    localStorage.setItem('names', JSON.stringify([]))
    localStorage.setItem('emails', JSON.stringify([]))
    localStorage.setItem('nascimentos', JSON.stringify([]))
}

function loadLocal() {
    localStorage.setItem('firstTime', false)

    const names = JSON.parse(localStorage.getItem('names') )
    const select = document.querySelector('#clientes')
    
    names.forEach(name => {
        const option = document.createElement('option')
        option.innerHTML = name 
        clientes.insertAdjacentElement('beforeend', option)
    })
}


buttonSubmit.addEventListener('click', addCliente)
buttonSearch.addEventListener('click', searchCliente)

