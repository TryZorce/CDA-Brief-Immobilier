document.addEventListener('DOMContentLoaded', function() {
    const annonces = JSON.parse(localStorage.getItem('annonces')) || [];

    const housingList = document.getElementById('housingList');

    annonces.forEach(annonce => {
      const housing = document.createElement('div');
      housing.classList.add('housing');

      const housingHeader = document.createElement('div');
      housingHeader.classList.add('housing-header');

      const housingImg = document.createElement('img');
      housingImg.classList.add('housing-img');

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
          housingImg.src = './assets/default.jpg';
      }

      housingHeader.appendChild(housingImg);

      const housingContent = document.createElement('div');
      housingContent.classList.add('housing-content');

      const title = document.createElement('p');
      title.textContent = annonce.titre;
      housingContent.appendChild(title);

      const description = document.createElement('p');
      description.textContent = annonce.description;
      housingContent.appendChild(description);

      const price = document.createElement('p');
      price.textContent = annonce.prix + '€';
      housingContent.appendChild(price);

      const address = document.createElement('p');
      address.textContent = annonce.adresse;
      housingContent.appendChild(address);

      const specificities = document.createElement('p');
      specificities.textContent = annonce.specifiques;
      housingContent.appendChild(specificities);

      housing.appendChild(housingHeader);
      housing.appendChild(housingContent);

      housingList.appendChild(housing);
    });
  });