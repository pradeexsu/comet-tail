const error_description = {
    "200":{
        msg:"OK",
        title:"request has been processed successfully on server"
    },
    "201":{
        msg:"Created",
        title:"resources have been successfully created on server"
    },
    "202":{
        msg:"Accepted",
        title:"request has been accepted for processing"
    },
    "203":{
        msg:"OK",
        title:"Non-Authoritative Informationresponse status indicates that the request was successful"
    },
    "204":{
        msg:"No Content",
        title:"server has successfully fulfilled the request"
    },
    "205":{
        msg:"Reset Content",
        title:"Reset Content response status tells the client to reset the document view"
    },
    "206":{
        msg:"Partial Content",
        title:"the request has succeeded and has the body contains the requested ranges of data"
    },
    "300":{
        msg:"Multiple Choices",
        title:"your browser now needs to choose between them"
    },
    "301":{
        msg:"Moved Permanently",
        title:"the requested resource has been permanently moved to a new URL provided by the Location response header"
    },
    "302":{
        msg:"Found",
        title:"requested resource has been temporarily moved to a different URI"
    },
    "303":{
        msg:"See Other",
        title:"the redirects don't link to the newly uploaded resources, but to another page"
    },
    "304":{
        msg:"Not Modified",
        title:"the requested resource has not been modified since the previous transmission"
    },
    "305":{
        msg:"Use Proxy",
        title:"the requested resource has to be reached through a proxy"
    },
    "307":{
        msg:"Temporary Redirect",
        title:"the resource requested has been temporarily moved to the URL given by the Location headers"
    },
    "400":{
        msg:"Bad Request",
        title:"the server cannot or will not process the request due to something that is perceived to be a client error"
    },
    "401":{
        msg:"Unauthorized",
        title:"the request has not been applied because it lacks valid authentication credentials for the target resource"
    },
    "402":{
        msg:"Payment Required",
        title:"the request can not be processed until the client makes a payment"
    },
    "403":{
        msg:"Forbidden",
        title:"the server understood the request but refuses to authorize it"
    },
    "404":{
        msg:"Not Found",
        title:"the server could not find the requested website"
    },
    "405":{
        msg:"Method Not Allowed",
        title:"the request method is known by the server but is not supported by the target resource"
    },
    "406":{
        msg:"Not Acceptable",
        title:"server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers"
    },
    "407":{
        msg:"Proxy Authentication Required",
        title:"the request has not been applied because it lacks valid authentication credentials for a proxy server that is between the browser and the server that can access the requested resource"
    },
    "408":{
        msg:"Request Timeout",
        title:"the server would like to shut down this unused connection"
    },
    "409":{
        msg:"Conflict",
        title:"a request conflict with current state of the target resource. (Conflicts are most likely to occur in response to a PUT request)"
    },
    "410":{
        msg:"Gone",
        title:"access to the target resource is no longer available at the origin server"
    },
    "411":{
        msg:"Length Required",
        title:"the server refuses to accept the request without a defined Content-Length header"
    },
    "412":{
        msg:"Precondition Failed",
        title:"access to the target resource has been denied"
    },
    "413":{
        msg:"Request Entity Too Large",
        title:"the request entity is larger than limits defined by server"
    },
    "414":{
        msg:"URI Too Long",
        title:"the URL requested by the client was longer than it can process"
    },
    "415":{
        msg:"Unsupported Media Type",
        title:"the server refuses to accept the request because the payload format is in an unsupported format"
    },
    "416":{
        msg:"Requested Range Not Satisfiable",
        title:"server cannot serve the requested ranges"
    },
    "417":{
        msg:"Expectation Failed",
        title:"the expectation given in the request's Expect header could not be met"
    },
    "500":{
        msg:"Internal Server Error",
        title:"the server encountered an unexpected condition that prevented it from fulfilling the request"
    },
    "501":{
        msg:"Not Implemented",
        title:"the server does not support the functionality required to fulfill the request"
    },
    "502":{
        msg:"Bad Gateway",
        title:"while acting as a gateway or proxy, received an invalid response from the upstream server"
    },
    "503":{
        msg:"Service Unavailable",
        title:"The server is currently unable to handle the request due to a temporary overloading or maintenance of the server"
    },
    "504":{
        msg:"Gateway Timeout",
        title:"while acting as a gateway or proxy, did not get a response in time from the upstream server that it needed in order to complete the request"
    },
    "505":{
        msg:"HTTP Version Not Supported",
        title:"the HTTP version used in the request is not supported by the server"
    }
}
