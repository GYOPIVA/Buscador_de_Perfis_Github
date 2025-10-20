const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const profileContainer = document.getElementById("profile-container");

/* Base url github */

const API_URL = "https://api.github.com/users/";

async function getUser(username) {
    try {
        const response = await fetch(API_URL + username);
        /* se a resposta nao for Ok (ex: erro 404) a gente joga um erro */
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
        const data = await response.json();
        createProfileCard(data);
    }
    catch (error) {
        createErrorCard(error.message);
    }
}

/* Função para criar p html do card de perfil */

function createProfileCard(user) {
    const {
        avatar_url, name, login, bio, public_repos, followers, following, html_url
    } = user;

    const cardHTML = `
    <div class="profile-card">
    <img src="${avatar_url}" alt="Avatar de ${name || login}" class="profile-avatar">
    <div class="profile-info">
    <h2>${name || login}</h2>
    <a href="${html_url}" target="_blank">@${login}</a>
    <p>${bio || 'Este usuário não possui uma bio.'}</p>
    
    <div class="profile-stats">
    <div class="stat">
    <span>${public_repos}</span>
    Repositórios
    </div>
    <div class="stat">
    <span>${followers}</span>
    Seguidores
    </div>
    <div class="stat">
    <span>${following}</span>
    Seguindo
    </div>
    </div>
    </div>
    </div>`;

    profileContainer.innerHTML = cardHTML;
    profileContainer.style.display="block"; /* Mostra o container */
}

/* Evento de "Submit" do formulario */

searchForm.addEventListener("submit", (event) =>{
    event.preventDefault(); /* Previne o carregamento da pagina */

    const userToSearch = searchInput.value.trim();

    if(userToSearch){
        getUser(userToSearch);
        searchInput.value = "";/* Limpa o input após a pesquisa */
    }
})
