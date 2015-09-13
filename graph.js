if (Meteor.isClient) {
  // counter starts at 0
  Meteor.startup(function () {
    $(window).ready(function(){
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    });

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '397371567128368',
        status     : true,
        xfbml      : true,
        version: 'v2.4'
      });
    };
    setTimeout(function() {
      FB.login(function() {
              /*FB.api('/me/feed', 'post', {message: 'Hello World!'}, function(response) {
                if(!response || response.error) {
                  alert('The post could not be submitted');
                  console.log(response.error)
                }
                else {
                  alert('The post was successfully submitted. Post ID: ' + response.id);
                }
              });*/
      }, {scope: 'publish_actions'});
    }, 7000);
  });

  Template.postStatus.events({
    'submit form': function(e) {
      alert('You submitted!');
    }
  });

  Template.body.helpers({
      userDetails: function() {
        var user = Meteor.user();
        console.log(user.services.facebook);
        if(user.services.facebook) {
          var ret;
          ret += 'Email: ' + user.services.facebook.email;
          ret += '\nName: ' + user.services.facebook.name;
          ret += '\nLink: ' + user.services.facebook.link;
          ret += '\nGender: ' + user.services.facebook.gender;
          ret += '\nLocale: ' + user.services.facebook.locale;
          ret += '\nAge: ' + user.services.facebook.age_range.min;
          return ret;
        }
      },
      email: function() {
        var user = Meteor.user();
        return user.services.facebook.email;
      },
      name: function() {
        var user = Meteor.user();
        return user.services.facebook.name;
      },
      gender: function() {
        var user = Meteor.user();
        return user.services.facebook.gender;
      },
      age: function() {
        var user = Meteor.user();
        return user.services.facebook.age_range.min;
      },
      locale: function() {
        var user = Meteor.user();
        return user.services.facebook.locale;
      },
      link: function() {
        var user = Meteor.user();
        return user.services.facebook.link;
      },
      dp: function() {
        var user = Meteor.user();
        setTimeout(function() {
          $('#dimmer-div').removeClass('active');
        }, 3500);
        return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
