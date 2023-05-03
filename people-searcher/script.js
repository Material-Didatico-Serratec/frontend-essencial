var collaborators = [
    {
        id: 1,
        name: 'Matheus Borges',
        jobtitle: 'Analista de Sistemas Sênior',
        pictureURL: 'https://avatars.githubusercontent.com/u/127253921?v=4'
    },
    {
        id: 2,
        name: 'Adriana Rangel',
        jobtitle: 'Designer Master Plus',
        pictureURL: 'https://avatars.githubusercontent.com/u/105232781?v=4'
    },
    {
        id: 3,
        name: 'Filipe Oliveira',
        jobtitle: 'Blackbelt',
        pictureURL: 'https://avatars.githubusercontent.com/u/125571407?v=4'
    },
    {
        id: 4,
        name: 'Yan Rodrigues',
        jobtitle: 'Chief Executive Office',
        pictureURL: 'https://media.licdn.com/dms/image/D4D03AQHu7r-gXumwFw/profile-displayphoto-shrink_800_800/0/1680386054218?e=1688601600&v=beta&t=Xt6fnmbJ9q44lrrWXpWbQIeKXmftCF9nQpzHcwttc58'
    },
    {
        id: 5,
        name: 'Luiz Cidade',
        jobtitle: 'Chief Operation Office',
        pictureURL: 'https://media.licdn.com/dms/image/C4D03AQFdqBoduagqdA/profile-displayphoto-shrink_200_200/0/1660261926494?e=1688601600&v=beta&t=A2YEC5nppaXwjuiVA0TYr01uMgBkTXCENjrGhUNUMhg'
    },
    {
        id: 6,
        name: 'Juliana Boubée',
        jobtitle: 'Chief Technology Office',
        pictureURL: 'https://media.licdn.com/dms/image/D4D03AQHQRZCPQqYlXg/profile-displayphoto-shrink_800_800/0/1680130430561?e=1688601600&v=beta&t=Xq3eRRShuuyi33i0eWsTTV_XjqqwuLkkT6d_6tsrW5c'
    },
    {
        id: 7,
        name: 'Roberta Stumpf',
        jobtitle: 'Programadora Sênior Master',
        pictureURL: 'https://avatars.githubusercontent.com/u/127352235?v=4'
    },
    {
        id: 8,
        name: 'Cid Moreira',
        jobtitle: 'Apresentador',
        pictureURL: 'https://s2.glbimg.com/N7hX90ypsWaD2DDEWXsFZQKyVXM=/620x520/e.glbimg.com/og/ed/f/original/2022/07/26/1658361814352_1_AcdKppJ.jpg'
    }
]

document.getElementById("sendBtn").addEventListener('click', (e) => {
    e.preventDefault();
    searchUser();
})

document.getElementById("search").addEventListener('input', (e) => {
    if(e.target.value.length >= 3) {
        handleSuggestions(e.target.value);
    } else {
        closeSuggestions()
    }
})

// Para filtrar a cada caracter digitado
window.onload = () => {
    var htmlString = "";

    collaborators.forEach(collaborator => {
        htmlString += `<div class="personContainer">
            <img src="${collaborator.pictureURL}" alt="${collaborator.name}">
            <div class="contentContainer">
                <span class="title">${collaborator.name}</span>
                <span class="jobTitle">${collaborator.jobtitle}</span>
            </div>
        </div>`
    })

    document.getElementById("peopleContainer").innerHTML = htmlString
}

const handleSuggestions = (searchValue) => {
    const filteredCollaborators = collaborators.filter(collaborator => collaborator.name.toLowerCase().includes(searchValue.toLowerCase()));
    var htmlString = "";
    filteredCollaborators.forEach(collaborator => {
        htmlString += `<span class='collaboratorSuggestion' onclick="selectCollaborator('${collaborator.name}')">${collaborator.name}</span>`
    })

    document.getElementById("suggestions").innerHTML = htmlString;
    document.getElementById("suggestions").style.display = "flex";
}

const selectCollaborator = (collaboratorName) => {
    document.getElementById("search").value = collaboratorName;
    searchUser();
    closeSuggestions();
}

const closeSuggestions = () => {
    document.getElementById("suggestions").style.display = "none";
}

const searchUser = () => {
    const searchValue = document.getElementById("search").value;
    const filteredCollaborators = collaborators.filter(collaborator => collaborator.name.toLowerCase().includes(searchValue.toLowerCase()));
    var htmlString = "";

    if(filteredCollaborators.length > 0) {
        filteredCollaborators.forEach(collaborator => {
            htmlString += `<div class="personContainer">
                <img src="${collaborator.pictureURL}" alt="${collaborator.name}">
                <div class="contentContainer">
                    <span class="title">${collaborator.name}</span>
                    <span class="jobTitle">${collaborator.jobtitle}</span>
                </div>
            </div>`
        })
    } else {
        htmlString = "<span class='noCollaboratorFound'>Nenhum colaborador encontrado... 😞</span>"
    }

    document.getElementById("peopleContainer").innerHTML = htmlString
    document.getElementById("search").value = ""
}