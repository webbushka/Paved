$(document).ready(function() {

  $('select').change(function(e){
    if($(this).val() === 'add') {
      $('.app-root').addClass('new-company');
      $('input').prop('required', true);
    }
    else {
      $('.app-root').removeClass('new-company');
    }
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    var type = '',
        company = '',
        url = '/admin';
    
    if($('.app-root').hasClass('new-company')) {
      type = 'POST';
    }
    else {
      type = 'PUT';
      url += '/' + company;
    }
        
    $.ajax(url, {
      type: type,
      data: $(this).serialize()
    })
  });
});