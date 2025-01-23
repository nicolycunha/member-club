const base_url = 'https://member-club-api.vercel.app'
const form = document.querySelector('form')
const inputId = document.getElementById('id')

const clientCard = document.querySelector('.card-client')
const cuttingCounterCard = document.querySelector('.card-cutting-counter')
const loyaltyCard = document.querySelector('.card-loyalty')
const historyCard = document.querySelector('.card-history')

const modal = document.getElementById('modal')
const close = document.querySelector('.close')

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
            createLoyaltyCard(data)
            createCuttingCounterCard(data)
            createHistoryCard(data)

            if (
                data.loyaltyCard?.totalCuts === data.loyaltyCard?.cutsNeeded &&
                data.loyaltyCard?.cutsRemaining == 0
            ) {
                modal.style.display = 'block'
            }
        }
    } catch (error) {
        console.log(error)
        alert('Não foi possível carregar os dados deste cartão fidelidade!')
    }
}

close.onclick = function () {
    modal.style.display = 'none'
}

function clearCards() {
    clientCard.innerHTML = ''
    clientCard.classList.remove('hidden')

    loyaltyCard.innerHTML = ''
    loyaltyCard.classList.remove('hidden')

    cuttingCounterCard.innerHTML = ''
    cuttingCounterCard.classList.remove('hidden')

    historyCard.innerHTML = ''
    historyCard.classList.remove('hidden')
}

function createClientCard(data) {
    try {
        const photo = createClientCardPhoto(data)
        const info = createClientCardInfo(data)

        clientCard.append(photo, info)
    } catch (error) {
        throw error
    }
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

function createLoyaltyCard(data) {
    try {
        const header = createLoyaltyCardHeader(data)

        const cutsGrid = createLoyaltyCardCutsGrid(data)

        loyaltyCard.append(header, cutsGrid)
    } catch (error) {
        throw error
    }
}

function createLoyaltyCardHeader(data) {
    try {
        const cutsNeeded = data.loyaltyCard?.cutsNeeded

        const header = document.createElement('header')
        header.classList.add('flex', 'gap-1', 'between')

        const sectionDescription =
            createLoyaltyCardHeaderDescription(cutsNeeded)

        const sectionId = createLoyaltyCardHeaderId(data)

        header.append(sectionDescription, sectionId)

        return header
    } catch (error) {
        throw error
    }
}

function createLoyaltyCardHeaderDescription(cutsNeeded) {
    try {
        const section = document.createElement('section')
        section.classList.add('description')

        const title = document.createElement('h3')
        title.classList.add('subtitle')
        title.textContent = 'Cartão fidelidade'

        const description = document.createElement('p')
        description.textContent = `Ao fazer cortes de cabelo, o ${
            cutsNeeded == 8 ? 'oitavo' : 'décimo'
        } sai de graça!`

        section.append(title, description)

        return section
    } catch (error) {
        throw error
    }
}

function createLoyaltyCardHeaderId(data) {
    try {
        const section = document.createElement('section')
        section.classList.add('id')

        const id = document.createElement('span')
        id.textContent = `ID: ${data.id}`

        section.append(id)

        return section
    } catch (error) {
        throw error
    }
}

function createLoyaltyCardCutsGrid(data) {
    try {
        const list = document.createElement('ul')
        list.classList.add('check-cuts', 'grid')

        for (let item = 0; item < data.loyaltyCard?.cutsNeeded; item++) {
            const listItem = document.createElement('li')

            if (item < data.loyaltyCard?.totalCuts) {
                const check = document.createElement('img')
                check.setAttribute('src', 'src/assets/images/check.png')
                check.setAttribute('alt', `${item}º corte feito`)

                listItem.append(check)
            }

            list.append(listItem)
        }

        return list
    } catch (error) {
        throw error
    }
}

function createCuttingCounterCard(data) {
    try {
        const header = createCuttingCounterCardHeader(data)
        const gift = createCuttingCounterCardGift()

        cuttingCounterCard.append(header, gift)
    } catch (error) {
        throw error
    }
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

function createHistoryCard(data) {
    try {
        const header = createHistoryCardHeader(data)

        const divider = document.createElement('hr')
        divider.classList.add('solid')

        const cuts = createHistoryCardList(data)

        historyCard.append(header, divider, cuts)
    } catch (error) {
        throw error
    }
}

function createHistoryCardHeader(data) {
    try {
        const header = document.createElement('header')
        header.classList.add('flex', 'between', 'mb-1', 'mt-0')

        const title = document.createElement('h3')
        title.classList.add('subtitle')
        title.textContent = 'Histórico'

        const description = document.createElement('p')
        description.classList.add('details-text')
        description.textContent = `${data.appointmentHistory.length} cortes`

        header.append(title, description)

        return header
    } catch (error) {
        throw error
    }
}

function createHistoryCardList(data) {
    try {
        const section = document.createElement('section')
        section.classList.add('logs', 'flex', 'gap-1', 'column')

        for (let appointment of data.appointmentHistory) {
            const item = document.createElement('div')
            item.classList.add('log', 'flex', 'between')

            const dateTime = createHistoryCardListDateTime(appointment)

            const check = document.createElement('div')
            check.classList.add('check', 'flex', 'center')

            const image = document.createElement('img')
            image.setAttribute('src', 'src/assets/icons/check.svg')
            image.setAttribute('alt', 'Corte feito')

            check.append(image)
            item.append(dateTime, check)
            section.append(item)
        }

        return section
    } catch (error) {
        throw error
    }
}

function createHistoryCardListDateTime(appointment) {
    try {
        const dateTime = document.createElement('div')
        dateTime.classList.add('date-time')

        const date = document.createElement('h4')
        date.classList.add('subtitle')
        date.textContent = appointment.date

        const time = document.createElement('p')
        time.classList.add('time')
        time.textContent = appointment.time

        dateTime.append(date, time)

        return dateTime
    } catch (error) {
        throw error
    }
}
