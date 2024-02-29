document.addEventListener('DOMContentLoaded', function () {
    // Récupération de l'ID de l'annonce à modifier depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const annonceId = parseInt(urlParams.get('id'));

    // Récupération des annonces depuis le stockage local
    const annonces = JSON.parse(localStorage.getItem('annonces')) || [];

    // Recherche de l'annonce à modifier par son ID
    const annonceToModify = annonces.find(annonce => annonce.id === annonceId);

    if (annonceToModify) {
        // Pré-remplir les champs du formulaire avec les détails de l'annonce
        document.getElementById('title').value = annonceToModify.title;
        document.querySelector('textarea[name="description"]').value = annonceToModify.description;
        document.querySelector('input[name="price"]').value = annonceToModify.price;
        document.querySelector('input[name="location"]').value = annonceToModify.address;

        // Pré-sélectionner le type de propriété dans le formulaire
        document.getElementById('type').value = annonceToModify.type;

        // Mettre à jour les champs spécifiques en fonction du type de propriété
        updateSpecificFields(annonceToModify.type);

        // Pré-remplir les champs spécifiques avec les valeurs de l'annonce
        fillSpecificFields(annonceToModify);

        // Ajouter un gestionnaire d'événement pour le changement de type de propriété
        document.getElementById('type').addEventListener('change', function () {
            updateSpecificFields(this.value);
        });

        // Ajouter un gestionnaire d'événement pour la soumission du formulaire de modification
        document.getElementById('contact').addEventListener('submit', function (event) {
            event.preventDefault();

            // Mettre à jour les détails de l'annonce avec les valeurs du formulaire
            annonceToModify.title = document.getElementById('title').value;
            annonceToModify.description = document.querySelector('textarea[name="description"]').value;
            annonceToModify.price = document.querySelector('input[name="price"]').value;
            annonceToModify.address = document.querySelector('input[name="location"]').value;

            // Mettre à jour les valeurs spécifiques en fonction du type de propriété
            updateSpecificValues(annonceToModify);

            // Mettre à jour l'annonce dans la liste des annonces
            const index = annonces.findIndex(annonce => annonce.id === annonceToModify.id);
            annonces[index] = annonceToModify;

            // Mettre à jour les annonces dans le stockage local
            localStorage.setItem('annonces', JSON.stringify(annonces));

            // Rediriger vers la page principale
            window.location.href = './index.html';
        });
    } else {
        console.error('Annonce à modifier non trouvée');
    }
});

function updateSpecificFields(type) {
    // Effacer les champs spécifiques précédents
    document.getElementById('specifiques').innerHTML = '';

    // Ajouter les champs spécifiques en fonction du type sélectionné
    switch (type) {
        case 'Rocket':
            document.getElementById('specifiques').innerHTML = `
                <label for="reacteur">Reactor:</label><br>
                <input type="text" id="reacteur" name="reacteur" required><br>
                <label for="compartimentIndep">Independent Compartment:</label><br>
                <input type="checkbox" id="compartimentIndep" name="compartimentIndep">
            `;
            break;
        case 'SpaceShip':
            document.getElementById('specifiques').innerHTML = `
                <label for="compartiment">Compartment:</label><br>
                <input type="text" id="compartiment" name="compartiment" required><br>
                <label for="ascenseur">Elevator:</label><br>
                <input type="checkbox" id="ascenseur" name="ascenseur">
            `;
            break;
        case 'SpaceStation':
            document.getElementById('specifiques').innerHTML = `
                <label for="nombreModules">Number of Modules:</label><br>
                <input type="number" id="nombreModules" name="nombreModules" required><br>
            `;
            break;
        default:
            // Ne rien faire pour d'autres types
            break;
    }
}

function fillSpecificFields(annonce) {
    // Remplir les champs spécifiques avec les valeurs de l'annonce
    switch (annonce.type) {
        case 'Rocket':
            document.getElementById('reacteur').value = annonce.specificValues?.reactor || '';
            document.getElementById('compartimentIndep').checked = annonce.specificValues?.independentCompartment || false;
            break;
        case 'SpaceShip':
            document.getElementById('compartiment').value = annonce.specificValues?.compartment || '';
            document.getElementById('ascenseur').checked = annonce.specificValues?.elevator || false;
            break;
        case 'SpaceStation':
            document.getElementById('nombreModules').value = annonce.specificValues?.numberOfModules || '';
            break;
        default:
            // Ne rien faire pour d'autres types
            break;
    }
}

function updateSpecificValues(annonce) {
    // Mettre à jour les valeurs spécifiques en fonction du type de propriété
    switch (annonce.type) {
        case 'Rocket':
            annonce.specificValues = {
                reactor: document.getElementById('reacteur').value,
                independentCompartment: document.getElementById('compartimentIndep').checked
            };
            break;
        case 'SpaceShip':
            annonce.specificValues = {
                compartment: document.getElementById('compartiment').value,
                elevator: document.getElementById('ascenseur').checked
            };
            break;
        case 'SpaceStation':
            annonce.specificValues = {
                numberOfModules: document.getElementById('nombreModules').value
            };
            break;
        default:
            // Ne rien faire pour d'autres types
            break;
    }
}
