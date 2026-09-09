const mongoose = require('mongoose');

const gpsTrajetoriaSchema = new mongoose.Schema({
  freteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Frete',
    required: true
  },
  motoristaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  accuracy: Number,
  speed: Number,
  heading: Number,
  source: {
    type: String,
    enum: ['real', 'simulacao'],
    default: 'real'
  },
  capturedAt: {
    type: Date,
    default: Date.now
  }
});

// Índice para performance
gpsTrajetoriaSchema.index({ freteId: 1, capturedAt: -1 });

module.exports = mongoose.model('GPSTrajetoria', gpsTrajetoriaSchema);
