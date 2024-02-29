document.addEventListener('DOMContentLoaded', function () {
    // Récupération des annonces depuis le stockage local
    const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
    const housingList = document.getElementById('housingList');

    // Affichage des annonces dans la liste
    annonces.forEach(annonce => {
        const housing = document.createElement('div');
        housing.classList.add('housing');

        // Création de l'en-tête de l'annonce avec l'image appropriée (si disponible)
        const housingHeader = document.createElement('div');
        housingHeader.classList.add('housing-header');
        const housingImg = document.createElement('img');
        housingImg.classList.add('housing-img');

        // Attribution de l'image appropriée en fonction du type de propriété
        switch (annonce.type) {
            case 'Rocket':
                housingImg.src = './assets/rocket.jpeg';
                break;
            case 'SpaceShip':
                housingImg.src = './assets/vaisseau.jpeg';
                break;
            case 'SpaceStation':
                housingImg.src = './assets/station.jpg';
                break;
            default:
                housingImg.src = './assets/default.jpg'; // Image par défaut
        }

        // Ajout de l'image à l'en-tête de l'annonce
        housingHeader.appendChild(housingImg);

        // Création du contenu de l'annonce
        const housingContent = document.createElement('div');
        housingContent.classList.add('housing-content');

        // Ajout des détails de l'annonce
        const title = document.createElement('p');
        title.textContent = annonce.title;
        housingContent.appendChild(title);

        const description = document.createElement('p');
        description.textContent = annonce.description;
        housingContent.appendChild(description);

        const price = document.createElement('p');
        price.textContent = annonce.price + '€';
        housingContent.appendChild(price);

        const address = document.createElement('p');
        address.textContent = annonce.address;
        housingContent.appendChild(address);

        // Ajout des spécificités
        if (annonce.specificValues) {
            Object.entries(annonce.specificValues).forEach(([key, value]) => {
                const spec = document.createElement('p');
                spec.textContent = `${key}: ${value}`;
                housingContent.appendChild(spec);
            });
        }

        // Création des boutons Modifier et Supprimer
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modifier';
        modifyButton.classList.add('modify-button');
        modifyButton.addEventListener('click', function() {
            // Action à effectuer lors du clic sur le bouton Modifier
            // Redirection vers la page de modification avec l'ID de l'annonce
            window.location.href = `./modify.html?id=${annonce.id}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            // Action à effectuer lors du clic sur le bouton Supprimer
            // Supprimer l'annonce de la liste et du stockage local
            annonces.splice(annonces.indexOf(annonce), 1);
            localStorage.setItem('annonces', JSON.stringify(annonces));
            // Actualiser la page pour refléter les changements
            window.location.reload();
        });

        // Ajout des boutons à l'en-tête de l'annonce
        housingContent.appendChild(modifyButton);
        housingContent.appendChild(deleteButton);

        // Ajout de l'en-tête et du contenu à l'élément logement
        housing.appendChild(housingHeader);
        housing.appendChild(housingContent);

        // Ajout de l'élément logement à la liste des logements
        housingList.appendChild(housing);
    });
});
