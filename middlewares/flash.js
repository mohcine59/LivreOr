module.exports = function (request, response, next){
	
	if(request.session.flash){
		response.locals.flash = request.session.flash
		request.session.flash = undefined
	}
	
	request.flash = function(type, content){
		
		if(request.session.flash === undefined){
			request.session.flash = {}
		}
		request.session.flash[type] = content
	}
	
	next() //pour lui dire d'éxécuter le code suivant, si il n'y a pas de next() alors le reste de la reponse ne va pas se faire
}