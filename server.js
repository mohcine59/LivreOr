"use strict";

let express = require('express')
let app = express()
let session = require('express-session')

let bodyParser = require('body-parser') //middleware

/*********** Moteur de template **********/
app.set('view engine', 'ejs')

/***************************** NOS MIDDLEWARE **********************************/

  
  //pour definir quel dossier distribue les fichier statics
//app.use(express.static('public')) 
app.use("/css", express.static('public')) //pour modifier l'url de distribution de fichier statics

	/***** FORMULAIRE *****/
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json()) //permet de récupérer les infos des formulaires

	/***** SESSIONS *****/
app.use(session({
	secret: 'clef',
	resave: false,
	saveUninitializer: true,
	cookie: {secure: false} //pour le https
}))

/******************************* NOS ROUTES *************************************/
app.get('/', (request, response) => {
	//response.send("COUCOU !");
	if(request.session.error){
		response.locals.error = request.session.error
		request.session.error = undefined
	}
	response.render('pages/index', {test: 'Salut'})
})

app.post('/', (request, response) =>{
	if(request.body.message === undefined || request.body.message === ""){
		//response.render('pages/index', {error: "Le message est vide !"}) //pour le renvoyer sur la page avec un message error
		request.session.error = "Il y a une erreur"
		response.redirect('/') //pour le rediriger
	}
	console.log(request.body)
})

app.listen(8080)