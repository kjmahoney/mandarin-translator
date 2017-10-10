const $ = require('zepto');

console.log('working');

const resizeInputBox = () => {
    $('c-index__input--adjust').attr('size', $('#dynamicInbox').val().length);
}
resizeInputBox();
