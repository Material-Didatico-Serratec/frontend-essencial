let formulario = {
    email: document.querySelector("#email"),
    senha: document.querySelector("#senha"),
    btnEntrar: document.querySelector("#btn-entrar")
};

//Aqui estamos escutando o evento de click.
formulario.btnEntrar.addEventListener('click', () => {
    alert("Olá!!!");

    let usuario = new Usuario({
        email: formulario.email.value,
        senha: formulario.senha.value
    });

    //Validar se o usuario e senha podem acessar o sistema.

    window.open('/artistas.html', '_self');

})