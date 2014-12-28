Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound',
  trackPageView:    true,
  waitOn: function() {
    return [
      Meteor.subscribe('profiles'), 
      Meteor.subscribe('regions'),
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
  only: [
    'city',
    'country',
    'profile',
    'state',
  ],
});

Router.onBeforeAction(requireLogin, {
  only: [
    'profileNew',
    'profileEdit',
  ]
});

Router.route('/', {
  name: 'globe',
  data: function() {
    return {
      profiles: Profiles.find({}, {sort: {updated: -1}}),
    };
  },
});

Router.route('/profile/new', {
  name: 'profileNew',
});

Router.route('/profile/:_id/edit', {
  name: 'profileEdit',
  waitOn: function() {
    return Meteor.subscribe('userProfile');
  },
  data: function() {
    return Profiles.findOne({
      _id:    this.params._id,
      userId: Meteor.userId(),
    });
  },
});

Router.route('/about', {
  name: 'about',
});

/*
Router.router('/:country', {
  name: 'country',
  data: function() {
    console.log();
  },
});
*/

Router.route('/:country', {
  name: 'country',
  data: function() {
    var regionFind = {country: this.params.country};
    var region     = Regions.findOne(regionFind);

    if (region) {
      return {
        region:   region,
        profiles: Profiles.find(regionFind, {sort: {updated: -1}}),
      };
    }
  },
});

Router.route('/:slug', {
  name: 'profile',
  data: function() {
    return Profiles.findOne({slug: this.params.slug});
  },
//   action: function() {
//     Profiles.update(this.data()._id, {shit:"fuck"});
//     this.render();
//   },
});

Router.route('/:country/:state', {
  name: 'state',
  data: function() {
    var regionFind = {
      country: this.params.country,
      state:   this.params.state,
    };

    var region = Regions.findOne(regionFind);

    if (region) {
      return {
        region:   region,
        profiles: Profiles.find(regionFind, {sort: {updated: -1}}),
      };
    }
  },
});

Router.route('/:country/:state/:city', {
  name: 'city',
  data: function() {
    var regionFind = {
      country: this.params.country,
      state:   this.params.state,
      city:    this.params.city,
    };

    var region = Regions.findOne(regionFind);

    if (region) {
      return {
        region:   region,
        profiles: Profiles.find(regionFind, {sort: {updated: -1}}),
      };
    }
  },
});

