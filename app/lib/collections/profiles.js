Profiles = new Mongo.Collection('profiles');

Meteor.methods({
  profileInsert: function(profileAttributes) {
    // Validates the posted ata
    if (profileAttributes.name.length === 0) {
      throw new Meteor.Error(400, 'Error: Profile name is required.');
    } else if (profileAttributes.slug.length === 0) {
      throw new Meteor.Error(400, 'Error: Slug is required.');
    } else if (profileAttributes.slug.length < 3) {
      throw new Meteor.Error(400, 'Error: Slugs must be at least 3 characters.');
    } else if (!profileAttributes.slug.match(/^[a-z0-9_]+$/i)) {
      throw new Meteor.Error(400, 'Error: Slug can only contain letters, numbers and _ (underscores).');
    } else if (profileAttributes.regionId.length === 0) {
      throw new Meteor.Error(400, 'Error: Region is required.');
    }

    // Looks up the region by ID and validates it
    var region = Regions.findOne({
      _id: new Meteor.Collection.ObjectID(profileAttributes.regionId)
    });

    if (!region) {
      throw new Meteor.Error(400, 'Error: Invalid region.');
    } else if (Profiles.find({slug: profileAttributes.slug}).count()) {
      throw new Meteor.Error(400, 'Error: Slug is already in use.');
    }

    // Forces lowercase on the slug
    profileAttributes.slug = profileAttributes.slug.toLowerCase();

    // Assembles the document
    var profile = {
      city:     region.city,
      country:  region.country,
      created:  new Date(),
      name:     profileAttributes.name,
      slug:     profileAttributes.slug,
      state:    region.state,
      regionId: profileAttributes.regionId,
      userId:   Meteor.userId(),
    };

    // Inserts the document
    Profiles.insert(profile);

    // Returns the slug for redirection
    return {slug: profile.slug};
  },
  profileUpdate: function(profileId, profileAttributes) {
    // Validates the profile and ownership
    var existingProfile = Profiles.findOne(profileId);

    if (!existingProfile) {
      throw new Meteor.Error(400, 'Error: Invalid profile ID.');
    } else if (existingProfile.userId !== Meteor.userId()) {
      throw new Meteor.Error(400, 'Error: You cannot edit other user’s profiles.');
    }

    // Validates the posted data
    if (profileAttributes.name.length === 0) {
      throw new Meteor.Error(400, 'Error: Profile name is required.');
    } else if (profileAttributes.slug.length === 0) {
      throw new Meteor.Error(400, 'Error: Slug is required.');
    } else if (profileAttributes.slug.length < 3) {
      throw new Meteor.Error(400, 'Error: Slugs must be at least 3 characters.');
    } else if (!profileAttributes.slug.match(/^[a-z0-9_]+$/i)) {
      throw new Meteor.Error(400, 'Error: Slug can only contain letters, numbers and _ (underscores).');
    } else if (profileAttributes.regionId.length === 0) {
      throw new Meteor.Error(400, 'Error: Region is required.');
    }

    // Looks up the region by passed ID and validates it
    var region = Regions.findOne({
      _id: new Meteor.Collection.ObjectID(profileAttributes.regionId)
    });

    if (!region) {
      throw new Meteor.Error(400, 'Error: Invalid region.');
    }

    // Forces lowercase on the slug
    profileAttributes.slug = profileAttributes.slug.toLowerCase();

    // Checks if a profile already exists with that slug
    var slugProfile = Profiles.findOne({slug: profileAttributes.slug});

    if (slugProfile && slugProfile._id !== profileId) {
      throw new Meteor.Error(400, 'Error: Slug is already in use.');
    }

    // Assembles the document
    var profile = {
      city:        region.city,
      country:     region.country,
      created:     new Date(),
      description: profileAttributes.description,
      name:        profileAttributes.name,
      regionId:    profileAttributes.regionId,
      slug:        profileAttributes.slug,
      state:       region.state,
      twitter:     profileAttributes.twitter,
    };

    // Updates the document
    Profiles.update(profileId, {$set: profile});

    // Returns the slug for redirection
    return {slug: profile.slug};
  }
});

