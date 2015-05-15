$(document).ready(function() {

  $('select').change(function(e){
    if($(this).val() === 'add') {
      $('.app-root').addClass('new-company');
      $('input[name="method"]').val('post');
      $('input').prop('required', true);
    }
    else {
      $('.app-root').removeClass('new-company');
      $('input[name="method"]').val('put');
    }
  });

  // $('form').on('submit', function(e){
  //   e.preventDefault();
  //   var type = '',
  //       company = '',
  //       url = '/admin';
  //
  //   if($('.app-root').hasClass('new-company')) {
  //     type = 'POST';
  //   }
  //   else {
  //     type = 'PUT';
  //     url += '/' + company;
  //   }
  //
  //   $.ajax(url, {
  //     type: type,
  //     contentType: 'multipart/form-data',
  //     data: $(this).serialize(),
  //     success: function(data) {
  //       // TODO - Clear the form
  //       alert('The opportunity for ' + data.name + ', was created successfully');
  //     }
  //   });
  // });
});
