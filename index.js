const url = 'http://127.0.0.1:3000/api/seguidores/listadodeseguidores?usuario=Gabriela&skip=0&limit=10';
const HTML_response = document.getElementById('app')
fetch(url)
.then((resp) => resp.json())
.then((data) => console.log(data))
