const alfabeto = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',') 

const frase = 'A Gazeta publica hoje breve nota de faxina na quermesse.'.toLocaleUpperCase()
    .replace(/\s/g, '').split('')


const result = alfabeto.filter(letra => frase.includes(letra))
    .length

result === 26 ? 
    console.log('Tem todas as letras do alfabeto')
: console.log('Não tem todas as letras do alfabeto')