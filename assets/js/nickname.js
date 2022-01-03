const formButton = document.getElementById('save-nickname')
let nicknames = []

formButton.addEventListener('click', 
function(e) {
    e.preventDefault();
})


const addNickname = () => {

    let nickname = {
        name: document.getElementById('nickname-entry').value
    }
    nicknames.push(nickname)
    document.querySelector('form').reset

    console.log('added', {nicknames})

    localStorage.setItem('NicknameHasBeenAdded', JSON.stringify(nicknames))

}

const myForm = document.getElementById("todo");
const list = document.querySelector(".list-items");
myForm.addEventListener("submit", addTodo);

function addTodo(e) {
  e.preventDefault();
  const userInput = document.querySelector(".userAdd").value;
  const userListItem = document.createElement("li");
  userListItem.appendChild(document.createTextNode(userInput));
  list.appendChild(userListItem);
  localStorage.setItem('userListItem', userInput);
}

