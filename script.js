// Funções de envio e recebimento do localstorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (db_client) => localStorage.setItem('db_client', JSON.stringify(db_client))

// -- CRUD --

//DELETE
const deleteClient = (index) => {
  const db_client = readClient()
  db_client.splice(index, 1)
  setLocalStorage(db_client)
}

//UPDATE
const updateClient = (index, client) => {
  const db_client = getLocalStorage()
  db_client[index] = client
  setLocalStorage(db_client)
}

//READ
const readClient = () => getLocalStorage()

//CREATE
const createClient = (client) => {
  const db_client = getLocalStorage()
  db_client.push(client)
  setLocalStorage(db_client)
}

//Verifica se o formulário é válido
const isValidFields = () => {
  return document.getElementById('form').reportValidity()
}

//Interação com usuário
const clearFields = () => {
  const fields = document.querySelectorAll('.form-control')
  fields.forEach(field => field.value = '')
}

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('recipient-name').value,
      imagem: document.getElementById('exampleFormControlFile1').value,
      descrição: document.getElementById('recipient-').value
    }
    createClient(client)
    updateTable()
    clearFields()
  }
}

const createRow = (client) =>{
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
  <td>${client.nome}</td>
  <td>${client.imagem}</td>
  <td>${client.descrição}</td>
  <td>
    <button class="btn btn-secondary m-1">editar</button>
    <button class="btn btn-danger m-1">excluir</button>
  </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () =>{
  const db_client = readClient()
  clearTable()
  db_client.forEach(createRow)
}

updateTable()

//Capturar botão Cadastro de Cliente
document.querySelector('#btnSalvar')
  .addEventListener('click', saveClient)