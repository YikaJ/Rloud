/**
 * Created by YikaJ on 15/11/22.
 */
'use strict';

$(function(){
  $("#loginForm").submit(function(event){
    event.preventDefault();
    $.post("/login", $(this).serialize())
      .then(function(response){
        if(response.ret == 0){
          location.href = response.data.returnUrl;
        }else{
          alert(response.msg);
        }
      });
  });
})