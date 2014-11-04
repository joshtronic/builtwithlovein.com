Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'home'});

Router.route('/profile/new', {name: 'profileNew'});

Router.route('/profile/create', {name: 'profileCreate'});

Router.route('/:country', {
  name: 'countryPage',
  data: function() {
    return Profiles.find({
      country: this.params.country
    });
  }
});

Router.route('/:country/:state', {
  name: 'statePage',
  data: function() {
    return Profiles.find({
      country: this.params.country,
      state:   this.params.state
    });
  }
});

Router.route('/:country/:state/:city', {
  name: 'cityPage',
  data: function() {
    return Profiles.find({
      country: this.params.country,
      state:   this.params.state,
      city:    this.params.city
    });
  }
});

Router.route('/:country/:state/:city/:slug', {
  name: 'profilePage',
  data: function() {
    return Profiles.findOne({
      country: this.params.country,
      state:   this.params.state,
      city:    this.params.city,
      slug:    this.params.slug
    });
  }
});

var requireLogin = function() {
  console.log('hai');
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

// Router.onBeforeAction('dataNotFound', {only: 'profilePage'});
Router.onBeforeAction(requireLogin, {only: 'profileNew'});
Router.onBeforeAction(requireLogin, {only: 'profileCreate'});
