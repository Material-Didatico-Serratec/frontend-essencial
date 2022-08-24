let artistas = [];
let tabelaArtistas = document.querySelector("#tabela-artistas tbody");
let btnAdicionar = document.getElementById("btn-adicionar");

let modal = {
    self: document.querySelector("#modal-artista"),
    idArtista: document.querySelector("#id"),
    nomeArtista: document.querySelector("#nome"),
    tipoArtista: document.querySelector("#tipo-artista"),
    btnSalvar: document.querySelector("#btn-salvar"), 
    btnCancelar: document.querySelector("#btn-cancelar")
};

btnAdicionar.addEventListener('click', (e) => {
    e.preventDefault(); // Parar qualquer ação que esteja acontecendo no navegador.
    // Abrir modal para adicionar artista.
    abrirModal();
})

modal.btnCancelar.addEventListener('click', () => {
    fecharModal();
});

function abrirModal(){
    $("#modal-artista").modal({backdrop: "static"});
}

function fecharModal(){
    $("#modal-artista").modal("hide");
}

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

        tdAcoes.classList.add("text-right");

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