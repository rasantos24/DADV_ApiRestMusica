var mongoose = require('mongoose');
var Music  = mongoose.model('Music');

//GET - Return all music in the DB
exports.findAllMusic = function(req, res) {
	Music.find(function(err, musics) {
    if(err) res.send(500, err.message);

    console.log('GET /music')
		res.status(200).jsonp(musics);
	});
};

//GET - Return a Music with specified ID
exports.findById = function(req, res) {
	Music.findById(req.params.id, function(err, music) {
    if(err) return res.send(500, err.message);

    console.log('GET /music/' + req.params.id);
		res.status(200).jsonp(music);
	});
};

//POST - Insert a new Music in the DB
exports.addMusic = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var music = new Music({
		_id: req.body._id,
        cancion: req.body.cancion,
		artista: req.body.artista,
		album: req.body.album,
		anio: req.body.anio,
		pais: req.body.pais
	});

	music.save(function(err, music) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(music);
	});
};

//PUT - Update a register already exists
exports.updateMusic = function(req, res) {
	Music.findById(req.params.id, function(err, music) {
		music._id = req.body._id;
		music.cancion = req.body.cancion;
		music.artista = req.body.artista;
		music.album = req.body.album;
		music.anio = req.body.anio;
		music.pais = req.body.pais;

		music.save(function(err) {
			if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(music);
		});
	});
};

//DELETE - Delete a Music with specified ID
exports.deleteMusic = function(req, res) {
	Music.findById(req.params.id, function(err, music) {
		music.remove(function(err) {
			if(err) return res.status(500).send(err.message);
        res.status(200).send();
		})
	});
};

