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
    e.preventDefault(); 
    modoEdicao = false;
    abrirModal();
})

modal.btnCancelar.addEventListener('click', () => {
    fecharModal();
});

modal.btnSalvar.addEventListener('click', () => {
    let artista = obterArtistaModal();
    
    (modoEdicao) ?
        editarArtistaAPI(artista) :
        adicionarArtistaAPI(artista);
});

function alterarTituloModal(){
    (modoEdicao) ? 
        modal.titulo.textContent = "Editar artista" :
        modal.titulo.textContent = "Adicionar artista";
}

function abrirModal(){
    alterarTituloModal();
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
    .then(response => {
        tratarAutenticacaoResponse(response);
        return response.json();
    })
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

function atualizarArtistaNaTabela(artista){
    let posicaoArray = artistas.findIndex(a => a.id == artista.id);
    artistas.splice(posicaoArray, 1, artista);

    preencherTabela(artistas);
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
    .then(response => {
        tratarAutenticacaoResponse(response);

            // Tratamento feito para erros 500 da api
            if(response.status == 500){
            dispararMensagem("Houve um erro interno na API!");     
            return;
        }

        return response.json();
    })
    .then(response => {
        let artista = new Artista(response);
        artistas.push(artista);
        preencherTabela(artistas);

        fecharModal();
        dispararMensagem("Artista adicionado com sucesso!");          
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
        tratarAutenticacaoResponse(response);

        // Tratamento feito para erros 500 da api
        if(response.status == 500){
            dispararMensagem("Houve um erro interno na API!");     
            return;
        }

        return response.json();
    })
    .then(response => {
        atualizarArtistaNaTabela(new Artista(response));     
        fecharModal();
        dispararMensagem("Artista atualizado com sucesso!");   dispararMensagem("Artista atualizado com sucesso!");       
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
    let artista = artistas.find(a => a.id == id);
    atualizarModal(artista);
    abrirModal();
}

function dispararMensagem(mensagem){
    setTimeout(() => { 
        alert(mensagem);
    }, 500);
}

function excluirArtistaAPI(id){

    fetch(`${URL_BASE}/api/artista/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": obterToken()
        },
        method: "DELETE"
    })
    .then(response => {
        tratarAutenticacaoResponse(response);
        
        // Tratamento feito para erros 500 da api
        if(response.status == 500){
            dispararMensagem("Houve um erro interno na API!");     
            return;
        }
    })
    .then(() => {

        let posicaoArray = artistas.findIndex(a => a.id == id);

        //Excluindo artista do array.
        artistas.splice(posicaoArray, 1);

        //Manda atualizar a tabela.
        preencherTabela(artistas);

        dispararMensagem("Artista deletado com sucesso!");
    });

}
function excluirArtista(id){
    //Obter o artista pelo id de dentro da tabela
    let artista = artistas.find(a => a.id == id);

    if(!confirm(`Confirma excluir o artista: ${artista.nome}?`)){
        return;
    }

    excluirArtistaAPI(id);
}

obterArtistasAPI();