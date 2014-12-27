Profiles = new Mongo.Collection('profiles');

Profiles.allow({
  insert: function(userId, profile) {
    return !!userId;
  }/*,
  update: function(userId, profile) {
    return ownsDocument(userId, profile);
  }
  */
});

/*
Profiles.deny({
  update: function(userId, profile, fields) {
    return (_.without(fields, 'name', 'slug', 'region').length > 0);
  }
});
*/

Meteor.methods({
  profileInsert: function(profileAttributes) {
    check(Meteor.userId(), String);

    check(profileAttributes, {
      name:     String,
      slug:     String,
      regionId: String
    });

    // TODO get slug working
    //profileAttributes.slug = URLify2(profileAttributes.slug);

    var region = Regions.findOne({
      _id: new Meteor.Collection.ObjectID(profileAttributes.regionId)
    });

    if (!region) {
      throw new Meteor.Error(500, 'Error: Invalid region.');
    } else if (!profileAttributes.name.length || !profileAttributes.slug.length) {
      throw new Meteor.Error(500, 'Error: All fields are required.');
    } else if (Profiles.find({slug: profileAttributes.slug}).count()) {
      throw new Meteor.Error(500, 'Error: Profile name is already in use.');
    }

    var profile = _.extend(profileAttributes, {
      userId:   Meteor.userId(),
      country:  region.country,
      state:    region.state,
      city:     region.city,
      created:  new Date()
    });

    var profileId = Profiles.insert(profile);

    return {slug: profile.slug};
  },
  profileUpdate: function(profileId, profileAttributes) {
    check(Meteor.userId(), String);

    check(profileAttributes, {
      name:     String,
      slug:     String,
      regionId: String
    });

    // TODO get slug working
    //profileAttributes.slug = URLify2(profileAttributes.slug);

    var region = Regions.findOne({
      _id: new Meteor.Collection.ObjectID(profileAttributes.regionId)
    });

    if (!region) {
      throw new Meteor.Error(500, 'Error: Invalid region.');
    } else if (!profileAttributes.name.length || !profileAttributes.slug.length) {
      throw new Meteor.Error(500, 'Error: All fields are required.');
    }

    var existingProfile = Profiles.findOne(profileId);

    if (!existingProfile) {
      throw new Meteor.Error(500, 'Error: Invalid profile ID.');
    // } else if (existingProfile.userId !== Meteor.userId()) {
    //   throw new Meteor.Error(500, 'Error: You cannot edit other user’s profiles.');
    }

    var slugProfile = Profiles.findOne({slug: profileAttributes.slug});

    if (slugProfile && slugProfile._id !== profileId) {
      throw new Meteor.Error(500, 'Error: Profile name is already in use.');
    }

    var profile = _.extend(profileAttributes, {
      userId:   Meteor.userId(),
      country:  region.country,
      state:    region.state,
      city:     region.city,
      updated:  new Date()
    });

    Profiles.update(profileId, {$set: profile}, function(err) {
      throw new Meteor.Error(500, profileId);
      if (err) {
        throw new Meteor.Error(500, 'Error: ' + error.reason);
      }
    });

    return {slug: profile.slug};
  }
});

