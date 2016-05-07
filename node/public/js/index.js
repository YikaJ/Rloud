/**
 * Created by YikaJ on 15/11/22.
 */
'use strict';

$("#loginForm").submit(function(event){

  $.post("/login", $(this).serialize())
    .then(function(response){
      if(response.code == 1){
        location.href = response.data.returnUrl;
      }else{
        alert(response.error);
      }
    });

  event.preventDefault();
});