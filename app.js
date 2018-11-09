var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

mongoose.connect('mongodb://rasantos24:coso1234@ds155213.mlab.com:55213/musica', function(err, res){
  if(err) throw err;
  console.log('Conectado a la BD');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var models = require('./models/musica')(app,mongoose);
var MusicCtrl = require('./controllers/musicas');

var router = express.Router();
router.get('/', function(req, res) {
   res.send("Holi");
});
app.use(router);

var musics = express.Router();

musics.route('/musics')
  .get(MusicCtrl.findAllMusic)
  .post(MusicCtrl.addMusic);

musics.route('/musics/:_id')
  .get(MusicCtrl.findById)
  .put(MusicCtrl.updateMusic)
  .delete(MusicCtrl.deleteMusic);

app.use('/api', musics);

app.listen(3000, function() {
  console.log("Node server running on ds155213.mlab.com");
});