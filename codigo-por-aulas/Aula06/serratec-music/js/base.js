const URL_BASE = `https://serratec-music-manager-api.herokuapp.com`;


function salvarToken(token){
    localStorage.setItem("token", token)
}

function obterToken(){
    return localStorage.getItem("token")
}

function sair(){
    localStorage.removeItem("token")
    direcionarTelaDeLogin()
}

function direcionarTelaDeLogin(){
    window.open("login.html", "_self");
}

function direcionarTelaDeArtistas(){
    window.open("artistas.html", "_self");
}

function usuarioLogado(){
    let token =  obterToken();
    return !!token;
}

function validarUsuarioAutenticado(){

    let logado = usuarioLogado();
    
    if(window.location.pathname == "/login.html"){

        //Se tiver logado, não pode acessar o login
        if(logado){
            direcionarTelaDeArtistas();
        }
    }else if(!logado && window.location.pathname != "/login.html"){
        direcionarTelaDeLogin();
    }
}


validarUsuarioAutenticado();