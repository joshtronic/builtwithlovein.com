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
  if (this.userId) {
    return Profiles.find({userId: this.userId});
  }
});

