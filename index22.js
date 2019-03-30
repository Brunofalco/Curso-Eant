const express = require("express")
const bodyParser = require("body-parser")
const loki = require("lokijs")
const app = express()
const port = 80
let noticiasColeccion = null

let db = new loki("noticias.json", {
    autoload: true,
    autosave: true, 
    autosaveInterval: 4000,
    autoloadCallback : function(){
    	noticiasColeccion = db.getCollection("noticias")
    	if( noticiasColeccion === null ){
    		noticiasColeccion = db.addCollection("noticias")
    	}
    }
})

app.set("view engine","ejs") //para poder usar EJS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static('public'))

app.get('/',function(request,response){
	response.send('Hola')
})

app.get('/noticias',function(request,response){
	let notas = noticiasColeccion.chain().data() 
	response.send(notas)
})

app.get('/noticias/:id',function(request,response){
	let noticiaId = request.params.id
	let nota = noticiasColeccion.get(noticiaId)
	response.send(nota)
	response.render("noticas.ejs",{
		notica

	})
})

app.post('/enviar',function(request,response){
	response.send('Hola')
})

app.post("/noticias",function(request,response){
	let	body = request.body
	noticiasColeccion.insert(body)
	response.send(body)
})

app.listen(port,function(){
	console.log('Servidor iniciado')
})
