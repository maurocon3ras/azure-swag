module.exports = async function (context, req, inputDocument) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let message;

    if(!inputDocument){
        message = "Document not found";
    }else{
        message = inputDocument.message;
    }

    context.res = {
        body: {
            message
        }
    };
}