$(document).ready(function() {
  app.init();
  });

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  init: function() {
    app.handleUsernameClick(); 
    app.handleSubmit();
    app.fetch();
    app.send();
    //app.renderMessage(); 
  },

  send: function(message) { 
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(url) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        data.results.forEach(function(message) {
          app.renderMessage(message);
        });
        // for (var i = 0; i < message.length; i++) {
        //   app.renderMessage(messages[i]);
        // }
      
      },
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    // var $mess = $('<p class="message username"></p>');
    // $mess.text(message);
    // $('#chats').append($mess);
    var mess = JSON.stringify(message.text);
    var username = message.username;
    var time = message.createdAt;
    var roomName = message.roomname;
    $('#chats').append('<p class="username">' + 'Name: ' + _.escape(username) + '</p>')
     .append('<p class="username">' + 'Message: ' + _.escape(mess) + '</p>')
     .append('<p class="username">' + 'Roomname: ' + _.escape(roomName) + '</p>')
     .append('<p class="username">' + 'Time: ' + _.escape(time) + '</p>');
  },

  renderRoom: function(roomName) {
    var newRoom = $('<div id="roomName"></div>');
    $('#roomSelect').append(newRoom);
  },

  handleUsernameClick: function() {
    $('body').on('click', '.username', function() {
    });
  },
  
  handleSubmit: function() {
    $('body').on('click', '.username', function() {
    });
  }

};


