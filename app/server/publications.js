Meteor.publish('regions', function() {
  return Regions.find();
});

Meteor.publish('profiles', function() {
  return Profiles.find();
});
