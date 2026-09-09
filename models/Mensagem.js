const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  freteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Frete',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  lido: {
    type: Boolean,
    default: false
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mensagem', mensagemSchema);
