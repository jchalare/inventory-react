export const formatError = (errorMessage) => {

    if (typeof errorMessage === 'string') return errorMessage;

    let htmlErrorList = '<ul>';

    errorMessage.forEach(element => {
        htmlErrorList += `<li>${element}</li>`;
    });

    htmlErrorList += '</ul>';

    return htmlErrorList;
}