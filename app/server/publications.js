Meteor.publish('regions', function() {
  return Regions.find();
});

Meteor.publish('profiles', function() {
  return Profiles.find({}, {
    fields: {
      gravatarEmail: false
    }
  });
});

Meteor.publish('userProfile', function() {
  return Profiles.find({});
});

