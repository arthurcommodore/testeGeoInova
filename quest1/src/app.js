//Isso é uma função auto invocável, para evitar o máximo possível o escopo público(window)
(function() {
    const buttonAdd = document.querySelector("#add")
    const _repeatTags = new Map

    //adiciona os eventos a todos os buttons
    buttonsClick()

    /*utilizado para tornar mais sutíl a iserção de elementos,
      diminuindo a replicação de código, e tornando mais curto
    */
    function insertElem(where, elem, tag) {
        document.querySelector(tag).insertAdjacentElement(where, elem)
    }

      //Está função simplesmente cria um objeto contando quantidade de repetição das tags.
    function repeatedQtd(tag, tags, _count = 0) {
        //Está criando um objeto mostrando a quantidade de cada tag
        _repeatTags.set(tag, (tags.filter(elem => elem === tag).length) ) //exemplo: {input: 3}

        return tags.length <= _count ? repeatedQtd(tags[_count++]) : _repeatTags
    }

    //Está função vai criar todos os elementos solicitados no array:(tags)
    function createElements(tags) {
        //construindo os elementos
        const result = []
        tags.filter((elem, i) => tags.indexOf(elem) === i).map((elem) => {
            Array(repeatedQtd(elem, tags).get(elem)).fill().map(() => {
                result.push(document.createElement(elem))
            }) 
        })
        //modificando as tags
        return result
    }

    //Está função modifica a propriedades dos elementos criados
    function modifyWrite(...elems) {
        const [inputQuestion, inputAnswer, buttonAnswer, buttonQuestion] = elems

        inputQuestion.placeholder = 'question'
        inputQuestion.type = 'text'
        inputQuestion.id = 'question'
        inputQuestion.classList = 'form-control'

        inputAnswer.placeholder = 'answer'
        inputAnswer.type = 'text'
        inputAnswer.id = 'answer'
        inputAnswer.classList = 'form-control answer'

        buttonAnswer.classList = 'btn btn-outline-primary'
        buttonAnswer.id = 'addQuestion'
        buttonAnswer.innerHTML = 'Add question'

        buttonQuestion.classList = 'btn btn-outline-primary'
        buttonQuestion.innerHTML = 'add more answers'
        buttonQuestion.id = "addAnswer"

    }

    function modifyQuestion(...elems) {
        const [option, li, select] = elems

        li.innerHTML = document.querySelector("#question").value
        select.classList = 'form-select answer'
    }

    function modifyAnswer(...elems) {
        const [inputAnswer, buttonAnswerDel] = elems

        inputAnswer.placeholder = 'answer'
        inputAnswer.type = 'text'
        inputAnswer.id = 'answerDel'
        inputAnswer.classList ='form-control answer answerDel'
        

        buttonAnswerDel.classList = 'btn btn-danger'
        buttonAnswerDel.id = 'addQuestionDel'
        buttonAnswerDel.innerHTML = 'Delte Answer'
        buttonAnswerDel.addEventListener('click', buttonDelete(buttonAnswerDel, inputAnswer) )
    }

    function buttonsClick() {
        //modificar os elementos no click
        const elements = createElements(['input','input', 'button', 'button'])
        const [inputQuestion, inputAnswer, buttonQuestion, buttonAnswer] = elements

        function writeQuestion() {
            elements.map(elem => {
                insertElem('beforeend', elem, '#questions')
            })
            modifyWrite(...elements)
        }
        
        //Vai ser chamada para adicionar o questionário
        function addQuestion() {
            elems =  createElements(['option', 'li', 'select',])
            const [option, li, select] = elems

            let verifyInputs = true
            document.querySelectorAll('input').forEach(input => {
                if(!input.value.trim())  
                    verifyInputs = false
            })

            verifyInputs ? 
            (() => {
                modifyQuestion(...elems)
                insertElem('beforeend', li, 'ul')
                insertElem('beforeend', select, 'ul')
                
                option.innerHTML = inputAnswer.value
                
                document.querySelectorAll('.answer').forEach(input => {
                    const [option] = createElements(['option'])
                    option.innerHTML = input.value
                    select.insertAdjacentElement('beforeend', option)
                })
                buttonAnswer.remove()
                buttonQuestion.remove()
                document.querySelectorAll('.answerDel').forEach(elem => {
                    elem.remove()
                })
                document.querySelectorAll('.btn-danger').forEach(elem => {
                    elem.remove()
                })

            })()
                : (() => {
                    document.querySelectorAll('input').forEach(input => {
                        input.style.border = '1px solid red'
                    })
                })() //Caso de errado borda vermelha
            }
            function addAnswer() {
                elems = createElements(['input', 'button'])
                const [input, button] = elems
                modifyAnswer(...elems)
                insertElem('beforebegin', input, '#addQuestion')
                insertElem('beforebegin', button, '#addQuestion')
            }
            //adiciona os eventos nos buttons
            buttonAdd.addEventListener('click', writeQuestion) 
            buttonQuestion.addEventListener('click', addQuestion)
            buttonAnswer.addEventListener('click', addAnswer)
        }

        function buttonDelete(input, button) {
            return function() {
                input.remove()
                button.remove()
                            }
        }

})()