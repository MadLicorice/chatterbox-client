$(document).ready(function() {
  app.init();  
});

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  friends: [],
  
  init: function() {
    app.handleUsernameClick(); 
    app.handleSubmit();
    app.fetch();
    app.getRooms();
    app.callFetchByRoom();
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
        app.clearMessages();
        app.fetch();
        location.reload(true);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
      
    });
  },

  fetch: function(room) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        data.results.forEach(function(message) {
          app.renderMessage(message);
        });
      },
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var mess = _.escape(message.text);
    var username = _.escape(message.username);
    var time = _.escape(message.createdAt);
    var roomName = _.escape(message.roomname);
    
    var $messageContainer = $('<div class="messageContainer"></div>');
    $($messageContainer).append('<p class="username">' + 'Name: ' + username + '</p>');
    $($messageContainer).append('<p class="mess">' + 'Message: ' + mess + '</p>');
    $($messageContainer).append('<p class="roomname">' + 'Roomname: ' + roomName + '</p>');    
    $($messageContainer).append('<p class="time">' + 'Time: ' + time + '</p>');
    $('#chats').append($messageContainer);
  },

  renderRoom: function(roomName) {
    //var newRoom = $('<div id="roomName"></div>');
    $('.dropdown').append('<option>' + roomName + ' </option>');
  },

  handleUsernameClick: function(username) { 
    $('body').on('click', '.username', function() {
      var friend = $(this).text().slice(6);
      if (!app.friends.includes(friend)) {
        app.friends.push(friend);
        $('.friendzone').append('<option>' + friend + ' </option>');
        console.log('i am a username: ', username);
      }
    });
  },
  
  handleSubmit: function() {
    $('#sendButton').on('click', function() {
      var post = {
        username: 'Your secret admirer',
        text: $('#sendIt').val(),
        roomname: 'That one guy',
      };
      app.send(post);
    });
  },
  
  getRooms: function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        var allRooms = _.uniq(data.results, false, function(message) {
          return message.roomname;
        }).map(function(properties) {
          return properties.roomname;
        });
        allRooms.forEach(function(room) {
          app.renderRoom(room);    
        });
      },
    });
  },

  callFetchByRoom: function() {
    $('.dropdown').change(function() {
      var room = $(this).val();
      console.log(room);
      app.fetchByRoom(room);
    });
    // var room = $('.dropdown').val();
    // app.clearMessages();
    // app.fetchByRoom(room);
  },

  fetchByRoom: function(room) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {
        order: '-createdAt', 
        where: '{"roomname": "' + room + '" }'
      },
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        data.results.forEach(function(message) {
          app.renderMessage(message);
        });
      },
    });
  },

};


