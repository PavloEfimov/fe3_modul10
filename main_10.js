/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/


const getBtn = document.querySelector(".js-get");
const getByIdBtn = document.querySelector(".js-id");
const inputId = document.querySelector(".js-user-id");
const addUserName = document.querySelector(".js-add");
const delUserName = document.querySelector(".js-del");
const updateUserName = document.querySelector(".js-update");
const addName = document.querySelector(".js-add-name");
const addAge = document.querySelector(".js-add-age");
const removeId = document.querySelector('.js-remove-id');
const updateId = document.querySelector('.js-upd-id');
const result = document.querySelector(".result");

getBtn.addEventListener("click", getAllUsers);
getByIdBtn.addEventListener("click", getUserById);
addUserName.addEventListener("click", addUser);
delUserName.addEventListener("click", removeUser);
updateUserName.addEventListener("click", updateUser)

function getAllUsers(event) {
    event.preventDefault();
    try {
        fetch(`https://test-users-api.herokuapp.com/users/`)
        .then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .then(data=>{
            const table = document.createElement('table');
            const heading = document.createElement('tr');
            const heading_inline1= document.createElement('td');
            const heading_inline2= document.createElement('td');
            const heading_inline3= document.createElement('td');
            heading_inline1.textContent='ID';
            heading_inline2.textContent='NAME';
            heading_inline3.textContent='AGE';
            heading.appendChild(heading_inline1);
            heading.appendChild(heading_inline2);
            heading.appendChild(heading_inline3);
            table.appendChild(heading);
            result.appendChild(table);
            data.data.forEach(element => {
                let heading_item = document.createElement('tr');
                let heading_item_inline1= document.createElement('td');
                let heading_item_inline2= document.createElement('td');
                let heading_item_inline3= document.createElement('td');
                heading_item_inline1.textContent=element.id;
                heading_item_inline2.textContent=element.name;
                heading_item_inline3.textContent=element.age;
                heading_item.appendChild(heading_item_inline1);
                heading_item.appendChild(heading_item_inline2);
                heading_item.appendChild(heading_item_inline3);
                table.appendChild(heading_item);
            });
        }
        )   
    } catch (error) {
        console.error("Get state error: ", error);
    }
}

function getUserById(event) {
    event.preventDefault();
  try {
      
    fetch(`https://test-users-api.herokuapp.com/users/`)
    // fetch(`https://test-users-api.herokuapp.com/users/`)
    .then(response=>{
        if (response.ok) return response.json();
        throw new Error('Error fetching data');
    })
    .then(data=>{
        result.textContent = JSON.stringify(data.data.find(elem=>elem.id===inputId.value))||'Такого пользователя в списке нет!';
        console.log(data.data);
        console.log(data)
    })
  } catch (error) {
    console.error("Get state error: ", error);
  }
}
function addUser(event){
    try {
        event.preventDefault();
        let newUser = {
            name:`${addName.value}`,
            age: +`${addAge.value}`
        }
        fetch(`https://test-users-api.herokuapp.com/users/`,{
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        })
        .then(response=>{
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .then(data=>{
            // result.textContent = JSON.stringify(data.data.find(elem=>elem.name===newUser.name))||'Такого пользователя в списке нет!';
            console.log(data.data);
            console.log(data)
        })
      } catch (error) {
        console.error("Get state error: ", error);
      }

}
function removeUser(event){
    try {
        event.preventDefault();
        fetch(`https://test-users-api.herokuapp.com/users/${removeId.value}`, {
            method: 'DELETE',
        })
        .then(response=>{
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .then(data=>console.log(data))
    } catch (error) {
        console.error("Get state error: ", error);
    }
}

function updateUser(){
    try {
        event.preventDefault();
        let newUser = {
            name:`${addName.value}`,
            age: +`${addAge.value}`
        }
        fetch(`https://test-users-api.herokuapp.com/users/${updateId.value}`,{
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        })
        .then(response=>{
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .then(data=>{
            // result.textContent = JSON.stringify(data.data.find(elem=>elem.name===newUser.name))||'Такого пользователя в списке нет!';
            console.log(data.data);
            console.log(data)
        })
    } catch (error) {
        console.error("Get state error: ", error);       
    }
}