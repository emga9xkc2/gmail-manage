function injectEvent() {
    var btns = document.querySelectorAll("button");
    btns.forEach(function (button) {
        button.onclick = function () {
            haction = [];
            haction_get = button.getAttribute("haction");
            if (haction_get != null) {
                if (haction_get.includes(":") > 0) {
                    haction = haction_get.split(":");
                }
            }
            clicked(button.id, haction);
        };
    });
    var selects = document.querySelectorAll("select");
    selects.forEach(function (select) {
        select.onchange = function () {
            change(select.id, [select.value, "text"]);
        };
    });
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.onchange = function () {
            type = input.type;
            if (type == "radio") {
                change(input.name, [input.value, type]);
            } else if (type == "checkbox") {
                change(input.id, [input.checked, "check"]);
            } else {
                change(input.id, [input.value, type]);
            }
        };
    });
    // for (var btn of btns) {
    //     if (!btn.id || btn.getAttribute("onclick")) continue;

    //     btn.onclick = (evt) => {
    //         // alert(evt.target.id);
    //         console.log(evt.target.id);
    //         haction = [];
    //         haction_get = evt.target.getAttribute("haction");
    //         if (haction_get != null) {
    //             if (haction_get.includes(":") > 0) {
    //                 haction = haction_get.split(":");
    //             }
    //         }
    //         clicked(evt.target.id, haction);
    //     };
    // }
}
function get_mails(skip, limit) {
    return sendMessage({
        action: "get_mails",
        sender: "",
        args: [skip, limit],
        form: formName(),
    });
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
function change(id, args = []) {
    var _args = [];
    if (!Array.isArray(args)) {
        _args = [args];
    } else {
        _args = args;
    }

    sendMessage({
        action: "change",
        sender: id,
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
function send_message(data) {
    return sendMessage(data);
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
function startApp() {
    injectEvent();
}

function gid(x) {
    return document.getElementById(x);
}
function gselector(x) {
    return document.querySelector(x);
}
function onMessage(data) {
    try {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        let action = data.action;

        if (action == "set_html") {
            gid(data.id).innerHTML = data.html;
            return;
        } else if (action == "set_value") {
            gid(data.id).value = data.value;
        } else if (action == "set_checked") {
            gid(data.id).checked = JSON.parse(data.checked);
        } else if (action == "set_style") {
            gid(data.id).style[data.style_name] = data.style_value;
        } else if (action == "set_style_selector") {
            gselector(data.selector).style[data.style_name] = data.style_value;
        } else if (action == "set_display_selector") {
            gselector(data.selector).style["display"] = data.display;
        } else if (action == "toast_success") {
            toastr.success(data.msg);
        } else if (action == "toast_warning") {
            toastr.warning(data.msg);
        } else if (action == "toast_info") {
            toastr.info(data.msg);
        } else if (action == "toast_error") {
            toastr.error(data.msg);
        } else if (action == "get_value") {
            return gid(data.id).value;
        } else if (action == "load_setting") {
            return gid(data.id).value;
        } else if (action == "load_url") {
            window.location.href = data.url;
        } else if (action == "load_mail") {
            load_mail(data.action);
        }
    } catch (ex) {
        console.log(ex);
    }
}
eel.expose(onMessage);
startApp();
