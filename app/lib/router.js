Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('profiles');
  }
});

Router.route('/', {name: 'globe'});
