exports = module.exports = function(app, mongoose)
{
  var musicSchema = new mongoose.Schema({
    _id: { type: Number },
    cancion: { type: String },
    artista: { type: String },
    album: { type: String },
    anio: { type: Number },
    pais: { type: String, }
  });

  mongoose.model('Music', musicSchema);
}
