Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'home'});

Router.route('/profile/new', {name: 'profileNew'});

Router.route('/profile/create', {name: 'profileCreate'});

Router.route('/:_country', {
  name: 'countryPage',
  data: function() {
    return Profiles.find({
      country: this.params._country
    });
  }
});

Router.route('/:_country/:_state', {
  name: 'statePage',
  data: function() {
    return Profiles.find({
      country: this.params._country,
      state:   this.params._state
    });
  }
});

Router.route('/:_country/:_state/:_city', {
  name: 'cityPage',
  data: function() {
    return Profiles.find({
      country: this.params._country,
      state:   this.params._state,
      city:    this.params._city
    });
  }
});

Router.route('/:_country/:_state/:_city/:_slug', {
  name: 'profilePage',
  data: function() {
    return Profiles.findOne({
      country: this.params._country,
      state:   this.params._state,
      city:    this.params._city,
      slug:    this.params._slug
    });
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'profilePage'});
Router.onBeforeAction(requireLogin, {only: 'postCreate'});
