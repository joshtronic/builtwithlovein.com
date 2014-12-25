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

    // TODO get slug working
    //profileAttributes.slug = URLify2(profileAttributes.slug);

    var region = Regions.findOne({
      _id: new Meteor.Collection.ObjectID(profileAttributes.region)
    });

    if (!region) {
      throw new Meteor.Error(500, 'Error: Invalid region.');
    }

    if (!profileAttributes.name.length || !profileAttributes.slug.length) {
      throw new Meteor.Error(500, 'Error: All fields are required.');
    }

    if (Profiles.find({slug: profileAttributes.slug}).count()) {
      throw new Meteor.Error(500, 'Error: Profile name is already in use.');
    }

    var user    = Meteor.user();
    var profile = _.extend(profileAttributes, {
      userId:  user._id,
      country: region.country,
      state:   region.state,
      city:    region.city,
      created: new Date()
    });

    var profileId = Profiles.insert(profile);

    return {
      _id: profileId
    };
  }
});

