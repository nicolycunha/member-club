const base_url = 'http://localhost:3333'
const form = document.querySelector('form')
const inputId = document.getElementById('id')

const clientCard = document.querySelector('.card-client')

form.onsubmit = async event => {
    event.preventDefault()

    try {
        const id = inputId.value.trim()

        const result = await fetch(`${base_url}/clients/${id}`)

        if (result.status == 404) {
            alert('Identificador de cartão fidelidade inválido!')
            return
        }

        const data = await result.json()

        clearCards()
        createClientCard(data)
    } catch (error) {
        console.log(error)
        alert('Não foi possível carregar os dados deste cartão fidelidade!')
    }
}

function clearCards() {
    clientCard.innerHTML = ''
}

function createClientCard(data) {
    const photo = getClientCardPhoto(data)
    const info = getClientCardInfo(data)

    clientCard.append(photo, info)
}

function getClientCardPhoto(data) {
    try {
        const photo = document.createElement('img')
        photo.setAttribute('src', `src/assets/images/profile/${data.photo}`)
        photo.setAttribute('alt', `Foto de ${data.name}`)

        return photo
    } catch (error) {
        throw error
    }
}

function getClientCardInfo(data) {
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
