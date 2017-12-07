window.addEventListener('load', main);

window.setInterval(() => {
    document.querySelector('.last').innerHTML = new Date().toTimeString().split(" ")[0];
}, 5000);

function main() {
    appendFromJson();

    const form = document.querySelector('#self-text');
    form.addEventListener('submit', appendFromForm);
    
}

function appendFromJson() {
    fetch("./data.json")
    .then((response) => {
        response
            .json()
            .then((json) => {
                appendInChat(json.mensagens[Math.floor((Math.random() * 5) + 1)].texto, json.mensagens[Math.floor((Math.random() * 5) + 1)].tempo, 'other');
            });
    });
}

function appendFromForm(event) {
    event.preventDefault();

    let text = document.querySelector('.textarea');
    const time =  new Date().toJSON();
    
    appendInChat(text.value, time, 'self');
    appendFromJson();

    text.value = '';
    return false;
}

function appendInChat(text, time, who) {
    let avatar = '';

    switch (who) {
        case ('self'):
            avatar = 'https://i.imgur.com/DY6gND0.png';
        break;
        case ('other'):
            avatar = 'https://i.imgur.com/HYcn9xO.png';
        break;
    }

    const html = `<li class='${who}'><div class='avatar'><img src='${avatar}' draggable='false' /></div><div class='msg'><p>${text}</p></p><time>${time}</time></div></li>`;
    const chat  = document.querySelector('.chat');
    chat.innerHTML = chat.innerHTML + html;
}