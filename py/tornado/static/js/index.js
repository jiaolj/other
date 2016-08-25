window.onload = function(){
  $('a.update').click(function(){
    var tr = $(this).parent().parent();
    $.ajax({
      url : '/update',
      data : {pk:tr.attr('pk')},
      dataType : 'json',
      success : function(back){
        $('dl.console').html(function(){
          var htm = '';
          $.each(back.console,function(m,n){
            htm += '<dt>'+n+'</dt>'
          })
          return htm;
        })
      }
    })
  })
}