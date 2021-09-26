
theIDE = {}
theAnotherIDE = {}
theTheme = "base16-dark"

theLoader = document.querySelector('.load-wrapper')
requestType = document.getElementById('request-type')
requestUri = document.getElementById('input-uri')
status = document.getElementById('input-uri')
statusButton = document.querySelector('#status-request')
formatJSON = document.querySelector('#format-json')

responseTime = document.querySelector('#query-time')
responseByte = document.querySelector('#data-size')

color = {
    red:'#f3533a',
    orange: '#fa9f42',
    blue: '#5acfc9',
    green: '#8ad879',
    purple: '#752092',
    black: '#000000',
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
        highlightSelectionMatches: {showToken: /\w/},
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
        highlightSelectionMatches: {showToken: /\w/},
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

formatJSON.addEventListener('click',()=>{
    try {
        theIDE.setValue( JSON.stringify(JSON.parse(theIDE.getValue()),null, 2))
    } catch (error) {
        console.error(error)
    }
})

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
function endloader(){
    theLoader.style.display = "none"
}

function isLocalhost(s) {
    let re = /^(https?:\/\/)?(localhost:\d{4,5}$)/
            // ^1                // ^2
    let res = re.exec(s)
    if(res===null)
        return null
    return 'http://'+res[2]
}

async function send() {
    let uri = requestUri.value
    localhost = isLocalhost(uri)
    if(localhost)
        requestUri.value = localhost
    startloader()
    uri = requestUri.value
    let jsonBody = theIDE.getValue()
    let method = requestType.value
    let options = {
        method: method,
        headers: {
            "Content-type": "application/json;",
        }
    }

    if (method !== 'GET') {
        options['body'] = JSON.stringify(jsonBody)
    }
    const start = new Date().getTime()
    const loaderTimeout = setTimeout(()=>{
        setResponse(408)
        endloader()
    },10000)

    fetch(uri, options)
        .then(response => {
            setResponse(response.status)
            console.log('status: '+response.status)
            const end = new Date().getTime();
            let duration =  end - start;
            responseTime.innerHTML = duration + ' ms'
            return response.json()
        }).then(json => {
            let res = JSON.stringify(json, null, '\t')
            responseByte.innerHTML = JSON.stringify(json, null, '').length +' B'
            theAnotherIDE.setOption('value', res)
            return res
        }).then((res)=>{
            clearTimeout(loaderTimeout)
            endloader()
        })
}

function setResponse(statusCode){
    let error_info = error_description[`${statusCode}`]
    statusButton.innerHTML = `<abbr title="${error_info.title}"> ${statusCode} <span id="status">${error_info.msg}</span></abbr>`

    if (200<=statusCode && statusCode<=299 ) {
            statusButton.style.background = color.green
    }else if(300 <= statusCode && statusCode <=399){
        statusButton.style.background = color.orange
    }else if(400 <= statusCode && statusCode <=499){
        statusButton.style.background = color.red
    }else{
        statusButton.style.background = color.black
    }
}

endloader()

