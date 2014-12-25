Meteor.publish('regions', function() {
  return Regions.find({});
});

Meteor.publish('users', function() {
  return Users.find({});
});

Meteor.publish('profiles', function() {
  return Profiles.find({});
});
