let artistas = [];
let tabelaArtistas = document.querySelector("#tabela-artistas tbody");
let btnAdicionar = document.getElementById("btn-adicionar");
let modoEdicao = false;

let modal = {
    self: document.querySelector("#modal-artista"),
    titulo: document.querySelector("#titulo-modal"),
    idArtista: document.querySelector("#id"),
    nomeArtista: document.querySelector("#nome"),
    tipoArtista: document.querySelector("#tipo-artista"),
    btnSalvar: document.querySelector("#btn-salvar"), 
    btnCancelar: document.querySelector("#btn-cancelar")
};

btnAdicionar.addEventListener('click', (e) => {
    e.preventDefault(); // Parar qualquer ação que esteja acontecendo no navegador.
    modoEdicao = false;
    modal.titulo.textContent = "Adicionar artista";
    abrirModal();
})

modal.btnCancelar.addEventListener('click', () => {
    fecharModal();
});

modal.btnSalvar.addEventListener('click', () => {
    let artista = obterArtistaModal();
    
    if(modoEdicao){
        editarArtistaAPI(artista);
    }else{
        adicionarArtistaAPI(artista);
    }  
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

function obterArtistaModal(){
    return new Artista({
        id: modal.idArtista.value,
        nome: modal.nomeArtista.value,
        tipo: modal.tipoArtista.options[modal.tipoArtista.selectedIndex].value
    });
}

function adicionarArtistaAPI(artista){

    artista.tipo = artista.tipo.toUpperCase();

    fetch(`${URL_BASE}/api/artista`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": obterToken()
        },
        method: "POST",
        body: JSON.stringify(artista)
    })
    .then(response => response.json())
    .then(response => {
        //Recebe o artista cadastrado
        let artista = new Artista(response);
       
        //adiciona o artista na litsa, no array
        artistas.push(artista);

        //Manda atualizar a tabela.
        preencherTabela(artistas);

        fecharModal();

        alert('Artista cadastrado com sucesso!');
    })
    .catch(error => {
        console.log(error)
    })
}

function editarArtistaAPI(artista){

    artista.tipo = artista.tipo.toUpperCase();

    fetch(`${URL_BASE}/api/artista/${artista.id}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": obterToken()
        },
        method: "PUT",
        body: JSON.stringify(artista)
    })
    .then(response => {

        if(response.status == 403){
            alert("Seu token expirou, efetue o login novamente.");
            sair()
        }

        return response.json();
    })
    .then(response => {
        //Recebe o artista cadastrado
        let artista = new Artista(response);
       
        let posicaoArray = artistas.findIndex(a => a.id == artista.id);

        // Remove o artista antigo e coloca o novo no mesmo lugar.
        artistas.splice(posicaoArray, 1, artista);
        
        //Manda atualizar a tabela.
        preencherTabela(artistas);

        fecharModal();

        alert('Artista atualizado com sucesso!');
    })
    .catch(error => {
        console.log(error)
    })
}

function atualizarModal(artista){
    modal.idArtista.value = artista.id;
    modal.nomeArtista.value = artista.nome;
    modal.tipoArtista.value = artista.tipo;
}

function editarArtista(id){

    modoEdicao = true;
    modal.titulo.textContent = "Editar artista";

    //Obter o artista pelo id de dentro da tabela
    let artista = artistas.find(a => a.id == id);

    //Atualizar o modal com os dados do artista que eu selecionei na tabela.
    atualizarModal(artista);

    abrirModal();
}

function excluirArtista(id){
    alert(id);
}
obterArtistasAPI();