Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/',            {name: 'home'});
Router.route('/profile/new', {name: 'profileNew'});
