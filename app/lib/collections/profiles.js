Profiles = new Mongo.Collection('profiles');

Profiles.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

Meteor.methods({
  profileInsert: function(profileAttributes) {
    check(Meteor.userId(), String);

    check(profileAttributes, {
      name:   String,
      slug:   String,
      region: String
    });

    var user    = Meteor.user();
    var profile = _.extend(postAttributes, {
      userId:  user._id,
      created: new Date()
    });

    var profileId = Profiles.insert(profile);

    return {
      _id: profileId
    };
  }
});

