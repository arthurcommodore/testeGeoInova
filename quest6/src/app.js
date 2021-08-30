const descubra_o_que_eu_faco = (parameter01, parameter02) => {
    let var01 = {};
    let var02 = 0;

    /*
        Vai fazer um spreed no segundo parametro e testar se no array passado, tem ou
        não no alfabeto, se tiver, vai gerar um novo array,
        somente com os elementos no array que constam no alfabeto
    */
    [...parameter02].filter((p) => /[A-Za-z]/.test(p))
        .map((c) => c.toLowerCase()) // Vai gerar um novo array, com todas as letras minusculas
        .forEach( //vai percorrer esté array novo gerado
            (p) => { 
                if (!(p in var01)) { //se o elemnto percorrido estiver no obj(var01)
                    var02 += 1; //incrementa
                    var01[p] = true; //adiciona ao objeto
                }
            });
    return var02 == parameter01; //verifica se o valor incrementado, corresponde ao primeiro paramatro passado
};
