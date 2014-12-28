Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound',
  trackPageView:    true,
  waitOn: function() {
    return [
      Meteor.subscribe('profiles'), 
      Meteor.subscribe('regions')
    ];
  },
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

Router.onBeforeAction('dataNotFound', {
  only: 'profile'
});

Router.onBeforeAction(requireLogin, {
  only: [
    'profileNew',
    'profileEdit'
  ]
});

Router.route('/', {
  name: 'globe'
});

Router.route('/profile/new', {
  name: 'profileNew'
});

Router.route('/profile/:_id/edit', {
  name: 'profileEdit',
  waitOn: function() {
    return Meteor.subscribe('userProfile');
  },
  data: function() {
    return Profiles.findOne({
      _id:    this.params._id,
      userId: Meteor.userId()
    });
  }
});

Router.route('/about', {
  name: 'about'
});

Router.route('/:slug', {
  name: 'profile',
  data: function() {
    return Profiles.findOne({slug: this.params.slug});
  }
});

