Handlebars.registerHelper('regions', function() {
  return Regions.find();
});

Handlebars.registerHelper('hasProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}}).count();
});

Handlebars.registerHelper('userProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}});
});

Handlebars.registerHelper('gravatar', function(gravatarHash, name) {
  return 'http://www.gravatar.com/avatar/' + gravatarHash + '?s=400&r=pg&d=retro';
});

Handlebars.registerHelper('uppercaseFirst', function(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
});
