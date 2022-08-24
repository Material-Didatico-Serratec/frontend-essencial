let artistas = [];
let tabelaArtistas = document.querySelector("#tabela-artistas tbody");


function obterArtistasAPI(){

    fetch(`${URL_BASE}/api/artista`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": obterToken()
        },
        method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        artistas = response.map(a => new Artista(a));
        preencherTabela(artistas);
    })
    .catch(error => {
        console.log(error)
    })
}

function preencherTabela(artistas){

    tabelaArtistas.textContent = "";

    artistas.map(artista => {

        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdTipo = document.createElement("td");
        let tdAcoes = document.createElement("td");

        tdId.textContent = artista.id;
        tdNome.textContent = artista.nome;

        tdTipo.innerHTML = `<span class="badge badge-pill badge-primary"> ${artista.tipo}</span>`;

        tdAcoes.innerHTML = `
        <button onclick="editarArtista(${artista.id})" class="btn btn-outline-primary btn-sm mr-2">Editar</button>
        <button onclick="excluirArtista(${artista.id})" class="btn btn-outline-primary btn-sm mr-3">Excluir</button>
        `;

        tdAcoes.classList.add("text-right")

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdTipo);
        tr.appendChild(tdAcoes);

        tabelaArtistas.appendChild(tr);
    });

}

function editarArtista(id){
    alert(id);
}

function excluirArtista(id){
    alert(id);
}
obterArtistasAPI();