Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.route('/', {
  name: 'globe',
  waitOn: function() {
    return Meteor.subscribe('profiles');
  }
});

Router.route('/profile/new', {
  name: 'profileNew',
  waitOn: function() {
    return Meteor.subscribe('regions');
  }
});

Router.route('/:_slug', {
  name: 'profile',
  data: function() {
    return Profiles.findOne(this.params.name);
  }
});

Router.onBeforeAction('dataNotFound', {
  only: 'profile'
});

Router.onBeforeAction(requireLogin, {
  only: 'profileNew'
});
