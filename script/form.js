document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'événement pour le changement de type
    document.getElementById('type').addEventListener('change', function() {
        const type = this.value;
        const specifiquesDiv = document.getElementById('specifiques');

        // Efface le contenu précédent
        specifiquesDiv.innerHTML = '';

        // Ajoute les champs spécifiques en fonction du type sélectionné
        switch (type) {
            case 'Rocket':
                specifiquesDiv.innerHTML = `
                    <label for="reacteur">Reactor:</label><br>
                    <input type="text" id="reacteur" name="reacteur" required><br>
                    <label for="compartimentIndep">Independent Compartment:</label><br>
                    <input type="checkbox" id="compartimentIndep" name="compartimentIndep">
                `;
                break;
            case 'SpaceShip':
                specifiquesDiv.innerHTML = `
                    <label for="compartiment">Compartment:</label><br>
                    <input type="text" id="compartiment" name="compartiment" required><br>
                    <label for="ascenseur">Elevator:</label><br>
                    <input type="checkbox" id="ascenseur" name="ascenseur">
                `;
                break;
            case 'SpaceStation':
                specifiquesDiv.innerHTML = `
                    <label for="nombreModules">Number of Modules:</label><br>
                    <input type="number" id="nombreModules" name="nombreModules" required><br>
                `;
                break;
            default:
                // Ne rien faire pour d'autres types
                break;
        }
    });

    // Écouteur d'événement pour la soumission du formulaire
    document.getElementById('contact').addEventListener('submit', function(event) {
        event.preventDefault();

        // Récupération des valeurs du formulaire
        const titre = document.getElementById('title').value;
        const description = document.querySelector('textarea[name="description"]').value;
        const prix = document.querySelector('input[name="price"]').value;
        const adresse = document.querySelector('input[name="location"]').value;
        const type = document.getElementById('type').value; // Récupération du type

        let property;

        // Création d'une instance en fonction du type sélectionné
        switch (type) {
            case 'Rocket':
                const reacteur = document.getElementById('reacteur').value;
                const compartimentIndep = document.getElementById('compartimentIndep').checked;
                property = new Rocket(null, titre, description, prix, adresse, reacteur, compartimentIndep);
                break;
            case 'SpaceShip':
                const compartiment = document.getElementById('compartiment').value;
                const ascenseur = document.getElementById('ascenseur').checked;
                property = new SpaceShip(null, titre, description, prix, adresse, compartiment, ascenseur);
                break;
            case 'SpaceStation':
                const nombreModules = document.getElementById('nombreModules').value;
                property = new SpaceStation(null, titre, description, prix, adresse, nombreModules);
                break;
            default:
                console.error('Invalid property type');
                return;
        }

        // Sauvegarde du type avec les valeurs spécifiques
        property.type = type;

        // Sauvegarde des valeurs spécifiques
        property.saveSpecificValues();

        // Récupération des annonces existantes
        const annonces = JSON.parse(localStorage.getItem('annonces')) || [];

        // Génération d'un nouvel identifiant
        const newId = annonces.length + 1;

        // Attribution de l'identifiant à la propriété
        property.id = newId;

        // Ajout de la propriété à la liste des annonces
        annonces.push(property);

        // Enregistrement des annonces dans le stockage local
        localStorage.setItem('annonces', JSON.stringify(annonces));

        // Redirection vers la page principale
        window.location.href = './index.html';

        
    });

    
});
