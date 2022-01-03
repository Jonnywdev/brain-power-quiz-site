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


