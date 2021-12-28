const closeModal = () => {
  clearFields()
  document.querySelector('#close').classList.remove('.close')
}

// Funções de envio e recebimento do localstorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (db_client) => localStorage.setItem('db_client', JSON.stringify(db_client))

// // -- CRUD --

//DELETE
const deleteClient = (index) => {
  const db_client = readClient()
  db_client.splice(index, 1)
  setLocalStorage(db_client)
}

//UPDATE
const updateClient = (index, client) => {
  const db_client = readClient()
  db_client[index] = client
  setLocalStorage(db_client)
}

// //READ
const readClient = () => getLocalStorage()

// CREATE
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

//Salvando cliente
const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('recipient-name').value,
      imagem: document.getElementById('exampleFormControlFile1').value,
      descricao: document.getElementById('recipient-descricao').value
    }
    const index = document.getElementById('recipient-name').dataset.index
    if (index == 'new') {
      createClient(client)
      updateTable()
      closeModal()
    } else {
      updateClient(index, client)
      updateTable()
      closeModal()
    }
  }
}

//Criando um item (linha) no HTML
const createRow = (client, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
  <td>${client.nome}</td>
  <td><img src="./imagens/ilustra-marketing.png"</td>
  <td>${client.descricao}</td>
  <td>
    <button class="btn btn-secondary m-1" id="editar-${index}" data-toggle="modal" data-target="#exampleModal">editar</button>
    <button class="btn btn-danger m-1" id="excluir-${index}">excluir</button>
  </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow)
}

//Limpando tabela
const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))
}

//Atualizando Tabela
const updateTable = () => {
  const db_client = readClient()
  clearTable()
  db_client.forEach(createRow)
}

const fillFields = (client) => {
  document.getElementById('recipient-name').value = client.nome
  //document.getElementById('exampleFormControlFile1').value = client.imagem
  document.getElementById('recipient-descricao').value = client.descricao
  document.getElementById('recipient-name').dataset.index = client.index

}

const editClient = (index) => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
}

const editDelete = (event) => {
  if (event.target.type == 'submit') {

    const [action, index] = event.target.id.split('-')

    if (action == 'editar') {
      editClient(index)
    } else {
      const client = readClient()[index]
      const response = confirm(`Tem certeza que deseja excluir ?`)
      if (response == true) {
        deleteClient(index)
        updateTable()
      }
    }
  }
}

updateTable()

//Capturar botão Cadastro
document.querySelector('#btnSalvar')
  .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
  .addEventListener('click', editDelete)