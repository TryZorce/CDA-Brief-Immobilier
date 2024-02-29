document.addEventListener('DOMContentLoaded', function() {
    const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
    const housingList = document.getElementById('housingList');
    const filterForm = document.getElementById('filterForm');

    // Objet de mapping des clés des champs aux libellés correspondants
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
            // Ajoutez d'autres champs spécifiques si nécessaire
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

            // Parcourir les champs de l'annonce et afficher le libellé et la valeur correspondants
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
                    // Si des valeurs spécifiques sont présentes, parcourir et afficher chacune
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

            housing.appendChild(housingHeader);
            housing.appendChild(housingContent);

            housingList.appendChild(housing);
        });
    }

    function sortByPrice(annonces) {
        return annonces.slice().sort((a, b) => a.price - b.price);
    }

    function filterByType(annonces, type) {
        if (type === 'all') {
            return annonces;
        } else {
            return annonces.filter(annonce => annonce.type === type);
        }
    }

    filterForm.addEventListener('change', function() {
        const selectedType = filterForm.type.value;
        const sortedAnnonces = sortByPrice(annonces);
        const filteredAnnonces = filterByType(sortedAnnonces, selectedType);
        displayAnnonces(filteredAnnonces);
    });

    displayAnnonces(annonces);
});
