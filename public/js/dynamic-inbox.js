$('.c-index__input--adjust').each(function(index, obj) {
  $(this).attr('size', $(this).val().length + 1);
});

// const resizeInputBox = () => {
//     $('.c-index__input--adjust').attr('size', $('.c-index__input--adjust').val().length);
// }
// resizeInputBox();
