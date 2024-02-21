document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('type').addEventListener('change', function() {
        const type = this.value;
        const specifiquesDiv = document.getElementById('specifiques');
      
        // Supprimer les champs spécifiques précédents
        specifiquesDiv.innerHTML = '';
      
        // Ajouter les champs spécifiques selon le type de bien sélectionné
        if (type === 'Rocket') {
          specifiquesDiv.innerHTML = `
            <label for="reacteur">Réacteur:</label><br>
            <input type="text" id="reacteur" name="reacteur" required><br>
            <label for="compartimentIndep">Compartiment Indépendant:</label><br>
            <input type="checkbox" id="compartimentIndep" name="compartimentIndep">
          `;
        } else if (type === 'SpaceShip') {
          specifiquesDiv.innerHTML = `
            <label for="compartiment">Compartiment:</label><br>
            <input type="text" id="compartiment" name="compartiment" required><br>
            <label for="ascenseur">Ascenseur:</label><br>
            <input type="checkbox" id="ascenseur" name="ascenseur">
          `;
        } else if (type === 'SpaceStation') {
          specifiquesDiv.innerHTML = `
            <label for="nombreModules">Nombre de modules:</label><br>
            <input type="number" id="nombreModules" name="nombreModules" required><br>
          `;
        }
    });
  
    document.getElementById('contact').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire
        
        const titre = document.getElementById('title').value; // Récupérer le titre
        const description = document.querySelector('textarea[name="description"]').value;
        const prix = document.querySelector('input[name="price"]').value;
        const adresse = document.querySelector('input[name="location"]').value;
        const type = document.getElementById('type').value;
        
        let specifiques = '';
      
        if (type === 'Rocket') {
          const reacteur = document.getElementById('reacteur').value;
          const compartimentIndep = document.getElementById('compartimentIndep').checked;
          specifiques = `Réacteur: ${reacteur}, Compartiment Indépendant: ${compartimentIndep ? 'Oui' : 'Non'}`;
        } else if (type === 'SpaceShip') {
          const compartiment = document.getElementById('compartiment').value;
          const ascenseur = document.getElementById('ascenseur').checked;
          specifiques = `Compartiment: ${compartiment}, Ascenseur: ${ascenseur ? 'Oui' : 'Non'}`;
        } else if (type === 'SpaceStation') {
          const nombreModules = document.getElementById('nombreModules').value;
          specifiques = `Nombre de modules: ${nombreModules}`;
        }
      
        // Récupérer les annonces précédentes du localStorage ou initialiser un tableau vide
        const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
      
        // Récupérer le nombre d'annonces actuellement stockées
        const nombreAnnonces = annonces.length;
      
        // Utiliser le nombre d'annonces + 1 comme ID pour la nouvelle annonce
        const nouvelId = nombreAnnonces + 1;
      
        // Ajouter la nouvelle annonce au tableau
        annonces.push({ id: nouvelId, titre, description, prix, adresse, type, specifiques });
      
        // Mettre à jour le localStorage avec le nouveau tableau d'annonces
        localStorage.setItem('annonces', JSON.stringify(annonces));
      
        // Rediriger vers index.html
        window.location.href = './index.html';
    });    
})