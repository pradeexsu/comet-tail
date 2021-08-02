
theIDE = {}
theAnotherIDE = {}
theTheme = "base16-dark"

theLoader = document.querySelector('.load-wrapper')
requestType = document.getElementById('request-type')
requestUri = document.getElementById('input-uri')
status = document.getElementById('input-uri')
statusButton = document.querySelector('#status-request')

// let loader = `<div class="load-wrapper"><div class="load-5" ><div><p>Loading ...</p><div class="ring-2"><div class="ball-holder"><div class="ball"></div></div></div></div></div></div>`

color = {
    red:'#f3533a',
    orange: '#fa9f42',
    blue: '#5acfc9',
    green: '#8ad879',
    purple: '#752092',
}

$(document).ready(() => {

    var codeArea = document.getElementById('code')
    var outputArea = document.getElementById('output')

    theIDE = CodeMirror.fromTextArea(codeArea, {
        lineNumbers: true,
        styleActiveLine: true,
        mode: "application/ld+json",
        theme: theTheme,
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: true,
        matchBrackets: true,
        lineWrapping: true,
        closeBrackets: true,
        autoCloseBrackets: [
            {
                left: '{',
                right: '}'
            },
            {
                left: '[',
                right: ']'
            },
        ],
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
            "Ctrl-Q": function (cm) {
                cm.foldCode(cm.getCursor())
            },
            "Ctrl-Space": "autocomplete",
            "Tab": "indentMore",
            "Shift-Tab": "indentLess",
            "F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            "Esc": function (cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            },
            "F8": function (cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
                Run()
            },
            "Ctrl-Y": cm => CodeMirror.commands.foldAll(cm),
            "Ctrl-I": cm => CodeMirror.commands.unfoldAll(cm),
            "Ctrl-/": cm => CodeMirror.commands.toggleComment(cm),
            "Ctrl+Shift-/": cm => CodeMirror.commands.toggleBlockComment(cm),

        }
    })
    theIDE.setSize(null, $(window).height())

    theAnotherIDE = CodeMirror.fromTextArea(outputArea, {
        lineNumbers: false,
        styleActiveLine: false,
        mode: "application/ld+json",
        theme: theTheme,
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: true,
        matchBrackets: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
            "Ctrl-Q": function (cm) {
                cm.foldCode(cm.getCursor())
            },
            "Ctrl-Space": "autocomplete",
            "Tab": "indentMore",
            "Shift-Tab": "indentLess",
            "F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            "Esc": function (cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            },
            "F8": function (cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
                Run()
            },
            "Ctrl-Y": cm => CodeMirror.commands.foldAll(cm),
            "Ctrl-I": cm => CodeMirror.commands.unfoldAll(cm),
            "Ctrl-/": cm => CodeMirror.commands.toggleComment(cm),
            "Ctrl+Shift-/": cm => CodeMirror.commands.toggleBlockComment(cm),

        }
    })
    theAnotherIDE.setSize(null, $(window).height())
    theAnotherIDE.setOption('readOnly', true)
})

document.getElementById('send-request').addEventListener('click', send)
requestType.addEventListener('change', changed)

function changed(evt){
    value = evt.target.value

    switch (value) {
        case 'GET':
            fontColor = color.blue
            break
        case 'POST':
            fontColor = color.green
            break
        case 'PUT':
            fontColor = color.orange
            break
        case 'DELETE':
            fontColor = color.red
            break
        default:
            fontColor = color.purple
            break
    }
    requestType.style.color = fontColor
}

function startloader(){
    theLoader.style.display = "block"
    

}
function endloader() {
    theLoader.style.display = "none"
}
async function send() {
    startloader()
    let jsonBody = theIDE.getValue()
    let method = requestType.value
    let uri = requestUri.value
    let options = {
        method: method,
        // credentials: 'same-origin',
        headers: {
            // mode:'no-cors',
            "Content-type": "application/json; charset=UTF-8",
            'Accept': 'application/json'
        }
    }

    if (method === 'POST') {
        options.body= JSON.stringify(jsonBody)
    }

    fetch(uri, options)
        .then(response => {
            // theAnotherIDE.setOption('value', response.json())

            return response.json()
        })
        .then(json => {
            let res = JSON.stringify(json, null, '\t')
            // console.log(res)
            theAnotherIDE.setOption('value', res)

        }).then(()=>{
            endloader()
            setResponse(200)
        })
}

function setResponse(errorCode){
    switch (errorCode) {
        case 200:
            statusButton.innerHTML = `200 <span id="status">OK</span>`
            statusButton.style.background = color.green
            break
        case 500:
            statusButton.innerHTML = `500 <span id="status">Invalid</span>`
            statusButton.style.background = color.orange
            break

        default:
            statusButton.innerHTML = `<span id="status">Error</span>`
            statusButton.style.background = color.red
            break
    }
}
endloader()