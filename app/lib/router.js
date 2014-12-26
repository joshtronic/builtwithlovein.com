Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
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
  name:   'globe',
  waitOn: function() {
    return Meteor.subscribe('profiles');
  }
});

Router.route('/profile/new', {
  name:   'profileNew',
  waitOn: function() {
    return Meteor.subscribe('regions');
  }
});

Router.route('/profile/:_id/edit', {
  name:   'profileEdit',
  waitOn: function() {
    return [
      Meteor.subscribe('profiles'),
      Meteor.subscribe('regions')
    ];
  },
  data: function() {
    return Profiles.findOne({_id: this.params._id});
  }
});

Router.route('/:slug', {
  name: 'profile',
  waitOn: function() {
    return Meteor.subscribe('profiles');
  },
  data: function() {
    return Profiles.findOne({slug: this.params.slug});
  }
});

Router.onBeforeAction('dataNotFound', {
  only: 'profile'
});

Router.onBeforeAction(requireLogin, {
  only: [
    'profileNew',
    'profileEdit'
  ]
});

