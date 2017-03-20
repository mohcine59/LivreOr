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

   /****** Création d'un MiddleWare ***********/
app.use(require('./middlewares/flash.js'))
//app.use(require(function (request, response, next){
//	
//	request.flash = function(type, content){
//		
//		if(request.session.flash === undefined){
//			request.session.flash = {}
//		}
//		request.session.flash[type] = content
//	}
//	
//	next() //pour lui dire d'éxécuter le code suivant, si il n'y a pas de next() alors le reste de la reponse ne va pas se faire
//}))

/******************************* NOS ROUTES *************************************/
app.get('/', (request, response) => {
	let Message = require('./models/message')
	Message.all(function(messages){
		response.render('pages/index', {msg: messages})
	})
})

app.post('/', (request, response) =>{
	if(request.body.message === undefined || request.body.message === ""){
		//response.render('pages/index', {error: "Le message est vide !"}) //pour le renvoyer sur la page avec un message error
		request.flash('error', "Vous n'avez pas posté de message")
		response.redirect('/') //pour le rediriger
	}else{
		let Message = require('./models/message')
		Message.create(request.body.message, function(){
			request.flash('success', "Merci pour votre message !")
			response.redirect('/') //pour le rediriger
		})
	}
	
})

app.listen(8080)