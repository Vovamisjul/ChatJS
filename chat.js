function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);

        document.head.append(script);
    });
}

function loadStyle(src) {
    return new Promise(function (resolve, reject) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', src);
        link.src = src;
        link.onload = () => resolve(link);
        document.head.append(link);
    });
}

function addMessageToChat(who, message) {
    let yourMessage = `<p> ${who}: ${message}</p>`;
    localStorage["chatDialog"] = (localStorage["chatDialog"] || "") + yourMessage;
    let dialog = $("#chat .chat-dialog");
    dialog.append(yourMessage);
    dialog.animate({scrollTop:  dialog.height()}, 1000);
    if (who === "You")
        setTimeout(addMessageToChat.bind(this, "Bot", `Answer on "${message.toUpperCase()}"`), 15000);
}

function sendMessage() {
    let input = $("#chat .chat-input");
    addMessageToChat("You", input.val())
    input.val("");
}

function main() {
    $("<div id='chat'>" +
        "<div class='chat-dialog'></div>" +
        "<div class='inputs'><input class='chat-input'>" +
        "<button class='chat-send'>Send</button></div>" +
        "</div>").dialog({
        draggable: false,
        position: { my: 'right bottom', at: 'right bottom' },
        collapseEnabled: true,
        collapse: function(event, ui) {
            localStorage["chatState"] = "collapsed";
        },
        collapseRestore: function(event, ui) {
            localStorage["chatState"] = "unCollapsed";
        }
    });
    if (localStorage["chatState"] === "collapsed")
        $(".ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-collapse").click(); //не знаю, как сделать по адекватному, чтобы октрывалось свернутым
    $("#chat .chat-send").click(sendMessage);                                                           //там вроде есть метод collapse(), но я не понял у какого он объекта
    $("#chat .chat-input").keydown((e) => {
        if (e.keyCode === 13)
            sendMessage();
    });
    let dialog = $("#chat .chat-dialog");
    dialog.append(localStorage["chatDialog"]);
    dialog.animate({scrollTop:  dialog.height()}, 1000);
}

loadScript("js/jquery-3.4.1.min.js")
    .then(() => loadScript("js/jquery-ui.min.js"))
    .then(() => loadScript("js/jquery.ui.dialog-collapse.js"))
    .then(() => loadStyle("style/jquery-ui.css"))
    .then(() => loadStyle("style/jquery.ui.dialog-collapse.css"))
    .then(() => loadStyle("style/chat-style.css"))
    .then(main);
