$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image ) {
      var html =
        `<div class="message-list__message" data-message-id = message.id >
          <div class="message-list__message-info">
            <div class="message-list__message-info-name">
              ${message.user_name}
            </div>
            <div class="message-list__message-info-date">
              ${message.created_at}
            </div>
          </div>
          <div class = "message-list__message-chat">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src="${message.image}" class="lower-message__image" >
        </div>`
    } else if (message.content) {
      var html =
        `<div class="message-list__message" data-message-id=${message.id}>
          <div class="message-list__message-info">
            <div class="message-list__message-info-name">
              ${message.user_name}
            </div>
            <div class="message-list__message-info-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__message-chat">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>` 
    } else if (message.image) {
      var html =
        `<div class="message-list__message" data-message-id=${message.id}>
          <div class="message-list__message-info">
            <div class="message-list__message-info-name">
              ${message.user_name}
            </div>
            <div class="message-list__message-info-date">
              ${message.created_at}
            </div>
          </div>
        <div class="message-list__message-chat">
        <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };

  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);    
      $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight}, 'fast');  
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $(".message-form__box-send").prop("disabled", false);
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});