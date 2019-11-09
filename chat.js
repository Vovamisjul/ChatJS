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
        link.onload = () => resolve(link);
        document.head.append(link);
    });
}

function main() {
    $("<div id='chat'></div>").dialog({
        collapseEnabled: true,
        collapse: function(event, ui) {
            localStorage["chatState"] = "collapsed";
        },
        collapseRestore: function(event, ui) {
            localStorage["chatState"] = "unCollapsed";
        }
    });
    if (localStorage["chatState"] === "collapsed")
        $(".ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-collapse").click();
}

loadScript("js/jquery-3.4.1.min.js")
    .then(() => loadScript("js/jquery-ui.min.js"))
    .then(() => loadScript("js/jquery.ui.dialog-collapse.js"))
    .then(() => loadStyle("style/jquery-ui.css"))
    .then(() => loadStyle("style/jquery.ui.dialog-collapse.css"))
    .then(main);
