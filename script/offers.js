document.addEventListener('DOMContentLoaded', function() {
    const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
    const housingList = document.getElementById('housingList');
    const filterForm = document.getElementById('filterForm');
    const isLoggedIn = localStorage.getItem('LoggedIn') === 'true';

    const fieldLabels = {
        title: 'Titre',
        description: 'Description',
        price: 'Prix',
        address: 'Adresse',
        specificValues: {
            compartimentIndep: 'Compartiment Indépendant',
            reacteur: 'Reactor',
            compartiment: 'Compartment',
            ascenseur: 'Elevator',
            nombreModules: 'Number of Modules'
        }
    };

    function displayAnnonces(annonces) {
        housingList.innerHTML = '';

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

            Object.entries(annonce).forEach(([key, value]) => {
                if (key !== 'specificValues') {
                    const fieldLabel = fieldLabels[key];
                    if (fieldLabel) {
                        const fieldElement = document.createElement('p');
                        fieldElement.classList.add('house-' + key);
                        fieldElement.textContent = `${fieldLabel}: ${value}`;
                        housingContent.appendChild(fieldElement);
                    }
                } else {
                    const specificValuesLabel = fieldLabels.specificValues;
                    Object.entries(value).forEach(([specKey, specValue]) => {
                        const specLabel = specificValuesLabel[specKey];
                        if (specLabel) {
                            const specElement = document.createElement('p');
                            specElement.classList.add('house-specific');
                            specElement.textContent = `${specLabel}: ${specValue}`;
                            housingContent.appendChild(specElement);
                        }
                    });
                }
            });

            if (isLoggedIn) {
                const modifyButton = document.createElement('button');
                modifyButton.textContent = 'Modifier';
                modifyButton.classList.add('modify-button');
                modifyButton.addEventListener('click', function() {
                    window.location.href = `./modify.html?id=${annonce.id}`;
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', function() {
                    annonces.splice(annonces.indexOf(annonce), 1);
                    localStorage.setItem('annonces', JSON.stringify(annonces));
                    window.location.reload();
                });

                housingContent.appendChild(modifyButton);
                housingContent.appendChild(deleteButton);
            }

            housing.appendChild(housingHeader);
            housing.appendChild(housingContent);

            housingList.appendChild(housing);
        });
    }

    function sortByPrice(annonces, sortOrder) {
        if (sortOrder === 'asc') {
            return annonces.slice().sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            return annonces.slice().sort((a, b) => b.price - a.price);
        } else {
            return annonces;
        }
    }

    function filterByType(annonces, type, minPrice, maxPrice) {
        let filteredAnnonces = annonces;
    
        if (type !== 'all') {
            filteredAnnonces = filteredAnnonces.filter(annonce => annonce.type === type);
        }
    
        if (minPrice !== '') {
            filteredAnnonces = filteredAnnonces.filter(annonce => annonce.price >= parseFloat(minPrice));
        }
    
        if (maxPrice !== '') {
            filteredAnnonces = filteredAnnonces.filter(annonce => annonce.price <= parseFloat(maxPrice));
        }
    
        return filteredAnnonces;
    }

    filterForm.addEventListener('input', function() {
        const selectedType = filterForm.type.value;
        const minPrice = filterForm.minPrice.value;
        const maxPrice = filterForm.maxPrice.value;
        const sortOrder = filterForm.sort.value;
        const sortedAnnonces = sortByPrice(annonces, sortOrder);
        const filteredAnnonces = filterByType(sortedAnnonces, selectedType, minPrice, maxPrice);
        displayAnnonces(filteredAnnonces);
    });    

    displayAnnonces(annonces);
});
