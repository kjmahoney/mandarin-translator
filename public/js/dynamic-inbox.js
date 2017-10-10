console.log('working');

$('.c-index__input--adjust').each(function(index, obj) {
  console.log($(this).attr('size'));
  console.log($(this).val().length);
  $(this).attr('size', $(this).val().length + 1);
  console.log($(this).attr('size'));
});

// const resizeInputBox = () => {
//     $('.c-index__input--adjust').attr('size', $('.c-index__input--adjust').val().length);
// }
// resizeInputBox();
