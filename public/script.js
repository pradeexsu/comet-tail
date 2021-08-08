
theIDE = {}
theAnotherIDE = {}
theTheme = "base16-dark"

theLoader = document.querySelector('.load-wrapper')
requestType = document.getElementById('request-type')
requestUri = document.getElementById('input-uri')
status = document.getElementById('input-uri')
statusButton = document.querySelector('#status-request')
responseTime = document.querySelector('#query-time')
responseByte = document.querySelector('#data-size')

// let loader = `<div class="load-wrapper"><div class="load-5" ><div><p>Loading ...</p><div class="ring-2"><div class="ball-holder"><div class="ball"></div></div></div></div></div></div>`

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
        highlightSelectionMatches: {showToken: /\w/},
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
    // console.time('time1')


    fetch(uri, options)
        .then(response => {
            setResponse(response.status)
            // console.log(JSON.stringify(Object.assign({},response)))
            
            const end = new Date().getTime();
            let duration =  end - start;
            // if(duration>900)
            responseTime.innerHTML = duration + ' ms'
            return response.json()
        }).then(json => {
            let res = JSON.stringify(json, null, '\t')
            theAnotherIDE.setOption('value', res)
            // let duration = console.timeEnd("timer1")
            
            // console.log(json)
            responseByte.innerHTML = JSON.stringify(json, null, '').length +' B'
            return res
        }).then((res)=>{
            endloader()
        })
}

function setResponse(errorCode){
    let error_info = error_description[`${errorCode}`]
    statusButton.innerHTML = `<abbr title="${error_info.title}"> ${errorCode} <span id="status">${error_info.msg}</span></abbr>`

    if (200<=errorCode && errorCode<=299 ) {
            statusButton.style.background = color.green
    }else if(300 <= errorCode && errorCode <=399){
        statusButton.style.background = color.orange
    }else if(400 <= errorCode && errorCode <=499){
        statusButton.style.background = color.red
    }else{
        statusButton.style.background = color.black
    }
}

endloader()

