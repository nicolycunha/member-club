const form = document.querySelector('form')
const inputId = document.getElementById('id')
const base_url = 'http://localhost:3333'

form.onsubmit = async event => {
    event.preventDefault()

    try {
        const id = inputId.value.trim()

        const result = await fetch(`${base_url}/clients/${id}`)
        const data = await result.json()

        console.log(data)
    } catch (error) {
        console.log(error)
        alert('Identificador de cartão fidelidade inválido!')
    }
}
