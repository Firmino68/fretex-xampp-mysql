const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['cliente', 'motorista'],
    required: true
  },
  documento: String,
  telefone: String,
  veiculo: {
    type: String,
    default: null
  },
  distrito: {
    type: String,
    default: null
  },
  morada: String,
  emailVerificado: {
    type: Boolean,
    default: false
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Hash password antes de salvar (CORRIGIDO - sem next)
usuarioSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Método para comparar passwords
usuarioSchema.methods.compararPassword = async function(passwordIngredients) {
  return await bcrypt.compare(passwordIngredients, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
