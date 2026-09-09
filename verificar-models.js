const mongoose = require('mongoose');

const Usuario = require('./models/Usuario');
const Frete = require('./models/Frete');
const Mensagem = require('./models/Mensagem');
const GPSTrajetoria = require('./models/GPSTrajetoria');

for (const [nome, Model] of Object.entries({ Usuario, Frete, Mensagem, GPSTrajetoria })) {
  if (typeof Model.findOne !== 'function') {
    throw new Error(`${nome} não foi exportado corretamente como Model Mongoose`);
  }
  console.log(`OK: ${nome}`);
}

console.log('Todos os models Mongoose estão corretos.');
