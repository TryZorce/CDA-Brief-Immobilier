document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('type').addEventListener('change', function() {
        const type = this.value;
        const specifiquesDiv = document.getElementById('specifiques');
      
        specifiquesDiv.innerHTML = '';
      
        // Add specific fields based on the selected type of property
        if (type === 'Rocket') {
          specifiquesDiv.innerHTML = `
            <label for="reacteur">Reactor:</label><br>
            <input type="text" id="reacteur" name="reacteur" required><br>
            <label for="compartimentIndep">Independent Compartment:</label><br>
            <input type="checkbox" id="compartimentIndep" name="compartimentIndep">
          `;
        } else if (type === 'SpaceShip') {
          specifiquesDiv.innerHTML = `
            <label for="compartiment">Compartment:</label><br>
            <input type="text" id="compartiment" name="compartiment" required><br>
            <label for="ascenseur">Elevator:</label><br>
            <input type="checkbox" id="ascenseur" name="ascenseur">
          `;
        } else if (type === 'SpaceStation') {
          specifiquesDiv.innerHTML = `
            <label for="nombreModules">Number of Modules:</label><br>
            <input type="number" id="nombreModules" name="nombreModules" required><br>
          `;
        }
    });
  
    document.getElementById('contact').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form behavior
        
        const titre = document.getElementById('title').value; // Get the title
        const description = document.querySelector('textarea[name="description"]').value;
        const prix = document.querySelector('input[name="price"]').value;
        const adresse = document.querySelector('input[name="location"]').value;
        const type = document.getElementById('type').value;
        
        let specifiques = '';
      
        if (type === 'Rocket') {
          const reacteur = document.getElementById('reacteur').value;
          const compartimentIndep = document.getElementById('compartimentIndep').checked;
          specifiques = `Reactor: ${reacteur}, Independent Compartment: ${compartimentIndep ? 'Yes' : 'No'}`;
        } else if (type === 'SpaceShip') {
          const compartiment = document.getElementById('compartiment').value;
          const ascenseur = document.getElementById('ascenseur').checked;
          specifiques = `Compartment: ${compartiment}, Elevator: ${ascenseur ? 'Yes' : 'No'}`;
        } else if (type === 'SpaceStation') {
          const nombreModules = document.getElementById('nombreModules').value;
          specifiques = `Number of Modules: ${nombreModules}`;
        }
      
        const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
      
        // Get the number of currently stored ads
        const numberOfAds = annonces.length;
      
        const newId = numberOfAds + 1;
      
        annonces.push({ id: newId, titre, description, prix, adresse, type, specifiques });
      
        localStorage.setItem('annonces', JSON.stringify(annonces));
      
        window.location.href = './index.html';
    });    
})
