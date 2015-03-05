$(document).ready(function() {

  $('select').change(function(e){
    if($(this).val() === 'add') {
      $('.app-root').addClass('new-company');
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
      company = $('select').val();
      url += '/' + company;
    }
    
    var data = $.serializeJSON($(this));
    
    data.company = company;
    
    $.ajax(url, {
      type: type,
      data: data
    })
  });
});