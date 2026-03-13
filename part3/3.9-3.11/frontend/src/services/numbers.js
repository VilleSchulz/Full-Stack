
const baseUrl = '/api/persons'
const headers = { 'Content-Type': 'application/json' }
const getAll = () => {
    return fetch(baseUrl).then((result) => result.json())
}


const create = (newObject) => {

    console.log("creating" + newObject)
    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newObject)
    }).then(response => response.json())

}


const update = ( id, newObject ) => {

    console.log(id)
    return fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(newObject)
    }).then(response => response.json())

}

const remove = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })

}


export default { getAll, create, update, remove }