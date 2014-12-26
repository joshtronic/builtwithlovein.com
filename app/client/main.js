Handlebars.registerHelper('regions', function() {
  return Regions.find({});
});

Handlebars.registerHelper('hasProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}}).count();
});

Handlebars.registerHelper('userProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}});
});

Handlebars.registerHelper('isUser', function(userId) {
  return true;
});
