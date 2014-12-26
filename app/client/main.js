Handlebars.registerHelper('hasProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}}).count();
});

Handlebars.registerHelper('userProfiles', function(userId) {
  return Profiles.find({userId: userId}, {sort:{name: 1}});
});
