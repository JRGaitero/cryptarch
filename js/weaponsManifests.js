let apiKey;
fetch('x-api-key')
    .then(response => response.text())
    .then(response => apiKey = response);

const getManifest = hash => {
    let url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${hash}/`;
    fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
        .then(handleError)
        .then(response => response.json())
        .then(manifestHandler)
        .catch(error=>{
            console.log(error)
        })
}

const manifestHandler = response => {
    /*TODO: json manifest handler */
}

const handleError = response => {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        return response;
    }
}

const handleResponse = response => {
    console.log(response)
    Object.keys(response).forEach(key => {

        let weapon = document.createElement('li');
        weapon.classList.add('weapons__weapon');

        let iconFrame = document.createElement('div');
        let icon = document.createElement('img');
        icon.setAttribute('src', `https://www.bungie.net${response[key]['displayProperties']['icon']}`);
        icon.setAttribute('alt', 'logo');
        if (response[key]['iconWatermark'] !== null) {
            let iconWatermark = document.createElement('img');
            iconWatermark.setAttribute('src', `https://www.bungie.net${response[key]['iconWatermark']}`);
            iconWatermark.setAttribute('alt', 'watermark');
            iconFrame.appendChild(icon);
            iconFrame.appendChild(iconWatermark);
        }
        else {
            iconFrame.appendChild(icon)
        }

        let header = document.createElement('div');
        header.classList.add('weapons__weapon-header');

        let nameFlav = document.createElement('div');
        nameFlav.classList.add('weapons__weapon-nameFlav');
        let name = document.createElement('h2');
        name.textContent = response[key]['displayProperties']['name'];
        let flavorText = document.createElement('p');
        flavorText.textContent = response[key]['flavorText'];
        nameFlav.appendChild(name);
        nameFlav.appendChild(flavorText);

        let categories = document.createElement('ul');
        categories.classList.add('weapons__weapon-categories');
        let rarity = document.createElement('li');
        let slot = document.createElement('li');
        let type = document.createElement('li');
        rarity.textContent = response[key]['inventory']['tierTypeName'];
        switch (response[key]['inventory']['bucketTypeHash']) {
            case 1498876634:
                slot.textContent = 'Kinetic';
                break;
            case 2465295065:
                slot.textContent = 'Energy';
                break;
            case 953998645:
                slot.textContent = 'Power';
                break;
        }
        let damageIcon = document.createElement('img');
        switch (response[key]['defaultDamageType']) {
            case 1:
                damageIcon.setAttribute('src', 'https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png');
                break;
            case 2:
                damageIcon.setAttribute('src', 'https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png');
                break;
            case 3:
                damageIcon.setAttribute('src', 'https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png');
                break;
            case 4:
                damageIcon.setAttribute('src', 'https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png');
                break;
            case 6:
                damageIcon.setAttribute('src', 'https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png');
                break;
        }
        slot.appendChild(damageIcon);
        type.textContent = response[key]['itemTypeDisplayName'];

        categories.appendChild(rarity);
        categories.appendChild(slot);
        categories.appendChild(type);

        header.appendChild(nameFlav);
        header.appendChild(categories);

        weapon.appendChild(iconFrame);
        weapon.appendChild(header);

        let hash = key.replace('_', '');
        weapon.addEventListener('click', e => {
            e.preventDefault();
            getManifest(hash);
        });

        document.querySelector('.weapons').appendChild(weapon);
    })
}
fetch("js/data/data.json")
    .then(handleError)
    .then(response => response.json())
    .then(handleResponse)
    .catch(error=>{
        console.log(error)
    })