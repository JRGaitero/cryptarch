// Get X-API-KEY from file
let apiKey;
fetch('js/x-api-key')
    .then(response => response.text())
    .then(response => apiKey = response);

//Event for closing details
document.querySelector('.details div:first-child>i').addEventListener('click', () => {
    document.querySelector('.main').style.display = '';
    document.querySelector('.details-main').style.display = 'none';
})

// Get individual weapon manifest
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

// Individual weapon manifest handler
const manifestHandler = response => {
    console.log(response);
    //Stat reset
    document.querySelector('.details .stats-container div:first-child li:nth-child(6)').style.display = '';
    document.querySelector('.details .stats-container div:first-child li:last-child').style.display = '';
    document.querySelector('.details .stats-container div:last-child').style.visibility = 'visible';

    //Perk reset
    document.querySelector('.details .perksScreenshot-container li:nth-child(2)').style.visibility = 'visible';
    document.querySelector('.details .perksScreenshot-container li:nth-child(3)').style.visibility = 'visible';
    document.querySelector('.details .perksScreenshot-container li:nth-child(4)').style.visibility = 'visible';
    document.querySelector('.details .perksScreenshot-container li:last-child').style.visibility = 'visible';

    //Icon
    document.querySelector('.details .weapons__weapon img:first-child').setAttribute('src',
        `https://www.bungie.net${response['Response']['displayProperties']['icon']}`);
    document.querySelector('.details .weapons__weapon img:last-child').setAttribute('src',
        `https://www.bungie.net${response['Response']['iconWatermark']}`);

    //Name
    document.querySelector('.details h2').textContent = response['Response']['displayProperties']['name'];

    //Flavor text
    document.querySelector('.flavorText').textContent = response['Response']['flavorText'];

    //Categories
    document.querySelector('.details .weapons__weapon-categories li:first-child').textContent = response['Response']['inventory']['tierTypeName'];
    let slot = document.querySelector('.details .weapons__weapon-categories li:nth-child(2)');
    let damageIcon = document.querySelector('.details .weapons__weapon-categories img');
    switch (response['Response']['inventory']['bucketTypeHash']) {
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
    switch (response['defaultDamageType']) {
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
    document.querySelector('.details .weapons__weapon-categories li:last-child').textContent = response['Response']['itemTypeDisplayName'];

    //Weapon Stats
    if (response['itemTypeDisplayName'] === 'Grenade Launcher' || response['Response']['itemTypeDisplayName'] === 'Rocket Launcher') {
        let stability = document.querySelector('.details .stats-container div:first-child li:first-child');
        let handling = document.querySelector('.details .stats-container div:first-child li:nth-child(2)');
        let reloadSpeed = document.querySelector('.details .stats-container div:first-child li:nth-child(3)');
        let velocity = document.querySelector('.details .stats-container div:first-child li:nth-child(4)');
        let blastRadius = document.querySelector('.details .stats-container div:first-child li:nth-child(5)');
        let rpm = document.querySelector('.details .stats-container div:first-child li:nth-child(6)');
        let magazine = document.querySelector('.details .stats-container div:first-child li:last-child');

        stability.querySelector('.statName').textContent = 'Stability';
        stability.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][155624089]['value']}%`;
        stability.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][155624089]['value'];

        handling.querySelector('.statName').textContent = 'Handling';
        handling.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][943549884]['value']}%`;
        handling.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][943549884]['value'];

        reloadSpeed.querySelector('.statName').textContent = 'Reload Speed';
        reloadSpeed.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4188031367]['value']}%`;
        reloadSpeed.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4188031367]['value'];

        velocity.querySelector('.statName').textContent = 'Velocity';
        velocity.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][2523465841]['value']}%`;
        velocity.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][2523465841]['value'];

        blastRadius.querySelector('.statName').textContent = 'Blast Radius';
        blastRadius.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][3614673599]['value']}%`;
        blastRadius.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][3614673599]['value'];

        rpm.querySelector('.statName').textContent = 'RPM';
        rpm.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4284893193]['value'];

        magazine.querySelector('.statName').textContent = 'Magazine';
        magazine.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][3871231066]['value'];

    } else if (response['itemTypeDisplayName'] === 'Combat Bow') {
        let impact = document.querySelector('.details .stats-container div:first-child li:first-child');
        let accuracy = document.querySelector('.details .stats-container div:first-child li:nth-child(2)');
        let stability = document.querySelector('.details .stats-container div:first-child li:nth-child(3)');
        let handling = document.querySelector('.details .stats-container div:first-child li:nth-child(4)');
        let reloadSpeed = document.querySelector('.details .stats-container div:first-child li:nth-child(5)');
        let draw = document.querySelector('.details .stats-container div:first-child li:nth-child(6)');
        let magazine = document.querySelector('.details .stats-container div:first-child li:last-child');

        impact.querySelector('.statName').textContent = 'Impact';
        impact.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4043523819]['value']}%`;
        impact.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4043523819]['value'];

        accuracy.querySelector('.statName').textContent = 'Accuracy';
        accuracy.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][5]['value']}%`;
        accuracy.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][5]['value'];

        stability.querySelector('.statName').textContent = 'Stability';
        stability.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][155624089]['value']}%`;
        stability.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][155624089]['value'];

        handling.querySelector('.statName').textContent = 'Handling';
        handling.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][943549884]['value']}%`;
        handling.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][943549884]['value'];

        reloadSpeed.querySelector('.statName').textContent = 'Reload Speed';
        reloadSpeed.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4188031367]['value']}%`;
        reloadSpeed.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4188031367]['value'];

        draw.querySelector('.statName').textContent = 'Draw Time';
        draw.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][447667954]['value'];

        magazine.querySelector('.statName').textContent = 'Magazine';
        magazine.querySelector('.statNumber').textContent = '1';

    } else if (response['Response']['itemTypeDisplayName'] === 'Sword') {
        let swing = document.querySelector('.details .stats-container div:first-child li:first-child');
        let impact = document.querySelector('.details .stats-container div:first-child li:nth-child(2)');
        let range = document.querySelector('.details .stats-container div:first-child li:nth-child(3)');
        document.querySelector('.details .stats-container div:first-child li:nth-child(4)').style.display = 'none';
        document.querySelector('.details .stats-container div:first-child li:nth-child(5)').style.display = 'none';
        let chargeRate = document.querySelector('.details .stats-container div:first-child li:nth-child(6)');
        let magazine = document.querySelector('.details .stats-container div:first-child li:last-child');


        swing.querySelector('.statName').textContent = 'Swing Speed';
        swing.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][2837207746]['value']}%`;
        swing.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][2837207746]['value'];

        impact.querySelector('.statName').textContent = 'Impact';
        impact.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4043523819]['value']}%`;
        impact.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4043523819]['value'];

        range.querySelector('.statName').textContent = 'Range';
        range.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][1240592695]['value']}%`;
        range.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][1240592695]['value'];

        chargeRate.querySelector('.statName').textContent = 'Charge Rate';
        chargeRate.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][3022301683]['value'];

        magazine.querySelector('.statName').textContent = 'Magazine';
        magazine.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][925767036]['value'];

    } else {
        let impact = document.querySelector('.details .stats-container div:first-child li:first-child');
        let range = document.querySelector('.details .stats-container div:first-child li:nth-child(2)');
        let stability = document.querySelector('.details .stats-container div:first-child li:nth-child(3)');
        let handling = document.querySelector('.details .stats-container div:first-child li:nth-child(4)');
        let reloadSpeed = document.querySelector('.details .stats-container div:first-child li:nth-child(5)');
        let rpm = document.querySelector('.details .stats-container div:first-child li:nth-child(6)');
        let magazine = document.querySelector('.details .stats-container div:first-child li:last-child');

        impact.querySelector('.statName').textContent = 'Impact';
        impact.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4043523819]['value']}%`;
        impact.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4043523819]['value'];

        range.querySelector('.statName').textContent = 'Range';
        range.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][1240592695]['value']}%`;
        range.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][1240592695]['value'];

        stability.querySelector('.statName').textContent = 'Stability';
        stability.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][155624089]['value']}%`;
        stability.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][155624089]['value'];

        handling.querySelector('.statName').textContent = 'Handling';
        handling.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][943549884]['value']}%`;
        handling.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][943549884]['value'];

        reloadSpeed.querySelector('.statName').textContent = 'Reload Speed';
        reloadSpeed.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][4188031367]['value']}%`;
        reloadSpeed.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4188031367]['value'];

        if (response['itemTypeDisplayName'] === 'Fusion Rifle' || response['Response']['itemTypeDisplayName'] === 'Linear Fusion Rifle') {
            rpm.querySelector('.statName').textContent = 'Charge Time';
            rpm.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][2961396640]['value'];
        } else {
            rpm.querySelector('.statName').textContent = 'RPM';
            rpm.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][4284893193]['value'];
        }


        magazine.querySelector('.statName').textContent = 'Magazine';
        magazine.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][3871231066]['value'];
    }

    //Hidden Stats
    if (response['Response']['itemTypeDisplayName'] !== 'Sword') {
        let aim = document.querySelector('.details .stats-container div:last-child li:first-child');
        let size = document.querySelector('.details .stats-container div:last-child li:nth-child(2)');
        let zoom = document.querySelector('.details .stats-container div:last-child li:nth-child(3)');
        let recoil = document.querySelector('.details .stats-container div:last-child li:nth-child(4)');
        let bounce = document.querySelector('.details .stats-container div:last-child li:last-child');

        aim.querySelector('.statName').textContent = 'Aim Assist';
        aim.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][1345609583]['value']}%`;
        aim.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][1345609583]['value'];

        size.querySelector('.statName').textContent = 'Inventory Size';
        size.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][1931675084]['value']}%`;
        size.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][1931675084]['value'];

        zoom.querySelector('.statName').textContent = 'Zoom';
        zoom.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][3555269338]['value']}%`;
        zoom.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][3555269338]['value'];

        recoil.querySelector('.statName').textContent = 'Recoil';
        recoil.querySelector('.statBar div').style.width = `${response['Response']['stats']['stats'][2715839340]['value']}%`;
        recoil.querySelector('.statNumber').textContent = response['Response']['stats']['stats'][2715839340]['value'];

        bounce.querySelector('.statName').textContent = 'Bounce';
        bounce.querySelector('.statBar div').style.width = `${100 - response['Response']['stats']['stats'][2715839340]['value']}%`;
        bounce.querySelector('.statNumber').textContent = `${100 - response['Response']['stats']['stats'][2715839340]['value']}`;

    } else {
        document.querySelector('.details .stats-container>div:last-child').style.visibility = 'hidden';
    }

    //Perks
    if (response['Response']['inventory']['tierTypeName'] === 'Common') {
        let first = document.querySelector('.details .perksScreenshot-container li:first-child img');
        document.querySelector('.details .perksScreenshot-container li:nth-child(2)').style.visibility = 'hidden';
        document.querySelector('.details .perksScreenshot-container li:nth-child(3)').style.visibility = 'hidden';
        document.querySelector('.details .perksScreenshot-container li:nth-child(4)').style.visibility = 'hidden';
        document.querySelector('.details .perksScreenshot-container li:last-child').style.visibility = 'hidden';

        let url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][0]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                first.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`)
            })
            .catch(error=>{
                console.log(error)
            })

    } else if (response['Response']['inventory']['tierTypeName'] === 'Uncommon') {
        let first = document.querySelector('.details .perksScreenshot-container li:first-child img');
        let second = document.querySelector('.details .perksScreenshot-container li:nth-child(2) img');
        let third = document.querySelector('.details .perksScreenshot-container li:nth-child(3) img');
        document.querySelector('.details .perksScreenshot-container li:nth-child(4)').style.visibility = 'hidden';
        document.querySelector('.details .perksScreenshot-container li:last-child').style.visibility = 'hidden';

        let url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][0]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => first.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][1]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => second.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][2]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => third.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })

    } else if (response['Response']['inventory']['tierTypeName'] === 'Rare') {
        let first = document.querySelector('.details .perksScreenshot-container li:first-child img');
        let second = document.querySelector('.details .perksScreenshot-container li:nth-child(2) img');
        let third = document.querySelector('.details .perksScreenshot-container li:nth-child(3) img');
        let fourth = document.querySelector('.details .perksScreenshot-container li:nth-child(4) img');
        document.querySelector('.details .perksScreenshot-container li:last-child').style.visibility = 'hidden';

        let url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][0]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => first.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][1]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => second.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][2]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => third.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][3]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => fourth.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })

    } else {
        let first = document.querySelector('.details .perksScreenshot-container li:first-child img');
        let second = document.querySelector('.details .perksScreenshot-container li:nth-child(2) img');
        let third = document.querySelector('.details .perksScreenshot-container li:nth-child(3) img');
        let fourth = document.querySelector('.details .perksScreenshot-container li:nth-child(4) img');
        let fifth = document.querySelector('.details .perksScreenshot-container li:last-child img');

        let url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][0]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => first.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][1]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => second.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][2]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => third.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][3]['singleInitialItemHash']}/`;
        fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(handleError)
            .then(response => response.json())
            .then(response => fourth.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
            .catch(error=>{
                console.log(error)
            })
        if (response['Response']['sockets']['socketEntries'][4]['plugSources'] === 1) {
            fifth.style.visibility = 'hidden';
        } else {
            url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${response['Response']['sockets']['socketEntries'][4]['singleInitialItemHash']}/`;
            fetch(url, {
                headers: {
                    'x-api-key': apiKey
                }
            })
                .then(handleError)
                .then(response => response.json())
                .then(response => fifth.setAttribute('src', `https://www.bungie.net${response['Response']['displayProperties']['icon']}`))
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    //Weapon screenshot
    document.querySelector('.details .perksScreenshot-container>img').setAttribute('src',
        `https://www.bungie.net${response['Response']['screenshot']}`);

    //Make visible
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.details-main').style.display = '';



}

const handleError = response => {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        return response;
    }
}

// Weapon list manifest handler
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

// Load weapon list manifest
fetch("js/data/data.json")
    .then(handleError)
    .then(response => response.json())
    .then(handleResponse)
    .catch(error=>{
        console.log(error)
    })

//Filters
document.querySelector('form.search').addEventListener('change', () => {
    filters();
});

const filters = () => {
    let weaponsLi = document.querySelectorAll('li.weapons__weapon');
    weaponsLi.forEach(element => {
        let filteredValues = [];
        if (element.querySelector('h2').textContent.indexOf(document.forms['search']['wName'].value) !== -1) {
            filteredValues.push(element.querySelector('h2').textContent);
        }
        if (element.querySelector('ul.weapons__weapon-categories li:first-child').textContent.startsWith(document.forms['search']['rarity'].value) === true){
            filteredValues.push(element.querySelector('ul.weapons__weapon-categories li:first-child').textContent);
        }
        if (element.querySelector('ul.weapons__weapon-categories li:nth-child(2)').textContent.startsWith(document.forms['search']['slot'].value) === true){
            filteredValues.push(element.querySelector('ul.weapons__weapon-categories li:nth-child(2)').textContent);
        }
        if (element.querySelector('ul.weapons__weapon-categories li:last-child').textContent.startsWith(document.forms['search']['wType'].value) === true){
            filteredValues.push(element.querySelector('ul.weapons__weapon-categories li:last-child').textContent);
        }
        if (filteredValues.length !== 4) {
            element.style.display = 'none';
        } else {
            element.style.display = '';
        }
    })
}