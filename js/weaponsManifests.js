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
        type.textContent = response[key]['itemTypeDisplayName'];
        categories.appendChild(rarity);
        categories.appendChild(slot);
        categories.appendChild(type);

        header.appendChild(nameFlav);
        header.appendChild(categories);

        weapon.appendChild(iconFrame);
        weapon.appendChild(header);

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