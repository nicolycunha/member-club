const base_url = 'http://localhost:3333'
const form = document.querySelector('form')
const inputId = document.getElementById('id')

const clientCard = document.querySelector('.card-client')
const cuttingCounterCard = document.querySelector('.card-cutting-counter')

form.onsubmit = async event => {
    event.preventDefault()

    try {
        const id = inputId.value.trim()

        if (!!id) {
            const result = await fetch(`${base_url}/clients/${id}`)

            if (result.status == 404) {
                alert('Identificador de cartão fidelidade inválido!')
                return
            }

            const data = await result.json()

            clearCards()
            createClientCard(data)
            createCuttingCounterCard(data)
        }
    } catch (error) {
        console.log(error)
        alert('Não foi possível carregar os dados deste cartão fidelidade!')
    }
}

function clearCards() {
    clientCard.innerHTML = ''
    clientCard.classList.remove('hidden')

    cuttingCounterCard.innerHTML = ''
    cuttingCounterCard.classList.remove('hidden')
}

function createClientCard(data) {
    const photo = createClientCardPhoto(data)
    const info = createClientCardInfo(data)

    clientCard.append(photo, info)
}

function createClientCardPhoto(data) {
    try {
        const photo = document.createElement('img')
        photo.setAttribute('src', `src/assets/images/profile/${data.photo}`)
        photo.setAttribute('alt', `Foto de ${data.name}`)

        return photo
    } catch (error) {
        throw error
    }
}
function createClientCardInfo(data) {
    try {
        const info = document.createElement('div')
        info.classList.add('info')

        const name = document.createElement('h2')
        name.textContent = data.name

        const clientSince = document.createElement('p')
        clientSince.textContent = `Cliente desde ${data.clientSince}`

        info.append(name, clientSince)

        return info
    } catch (error) {
        throw error
    }
}

function createCuttingCounterCard(data) {
    const header = createCuttingCounterCardHeader(data)
    const gift = createCuttingCounterCardGift()

    cuttingCounterCard.append(header, gift)
}

function createCuttingCounterCardHeader(data) {
    try {
        const cutsRemaining = data.loyaltyCard?.cutsRemaining
        const totalCuts = data.loyaltyCard?.totalCuts
        const cutsNeeded = data.loyaltyCard?.cutsNeeded

        const header = document.createElement('header')
        header.classList.add('flex', 'column')

        const emphasis = `<strong>${cutsRemaining}</strong>`

        const title = document.createElement('h2')
        title.textContent = ' cortes restantes'
        title.insertAdjacentHTML('afterbegin', emphasis)

        const progressBox = createCuttingCounterCardHeaderProgress(
            totalCuts,
            cutsNeeded
        )

        header.append(title, progressBox)

        return header
    } catch (error) {
        throw error
    }
}

function createCuttingCounterCardHeaderProgress(totalCuts, cutsNeeded) {
    try {
        const progressBox = document.createElement('div')
        progressBox.classList.add('progress', 'flex', 'gap-1')

        const progress = document.createElement('progress')
        progress.setAttribute('value', totalCuts)
        progress.setAttribute('max', cutsNeeded)

        const details = document.createElement('p')
        details.classList.add('details-text')
        details.textContent = `${totalCuts} de ${cutsNeeded}`

        progressBox.append(progress, details)

        return progressBox
    } catch (error) {
        throw error
    }
}

function createCuttingCounterCardGift() {
    try {
        const gift = document.createElement('div')
        gift.classList.add('flex', 'end')

        const image = document.createElement('img')
        image.setAttribute('class', 'gift-box')
        image.setAttribute('src', 'src/assets/images/gift.png')
        image.setAttribute('alt', 'Imagem de presente')

        gift.append(image)

        return gift
    } catch (error) {
        throw error
    }
}
