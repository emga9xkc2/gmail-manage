async function startApp() {
    injectEvent();
}
function injectEvent() {
    var btns = document.getElementsByTagName("button");
    for (var btn of btns) {
        if (!btn.id || btn.getAttribute("onclick")) continue;
        btn.onclick = (evt) => {
            clicked(evt.target.id, evt.target.getAttribute("haction"));
        };
    }
}
function kich_hoat_tai_khoan(keyactive) {
    return sendMessage({
        action: "kich_hoat_tai_khoan",
        sender: keyactive,
        args: "",
        form: formName(),
    });
}
function handle_account(action, list_account) {
    var _args = [];
    if (!Array.isArray(list_account)) {
        _args = [list_account];
    } else {
        _args = list_account;
    }

    return sendMessage({
        action: action,
        sender: "",
        args: _args,
        form: formName(),
    });
}
function clicked(id, args = []) {
    var _args = [];
    if (!Array.isArray(args)) {
        _args = [args];
    } else {
        _args = args;
    }

    sendMessage({
        action: "clicked",
        sender: id,
        args: _args,
        form: formName(),
    });
}
function formName() {
    //   alert(location.pathname);
    return location.pathname.substring(1).split(".")[0];
}
async function sendMessage(data) {
    if (typeof data == "string") {
        data = {
            action: data,
        };
    }

    data = JSON.stringify(data);
    //   alert(data);
    a = await eel.on_message(data)();
    // alert(a);
    return a;
}

startApp();
