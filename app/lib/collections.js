Profiles = new Mongo.Collection('profiles');
Regions  = new Mongo.Collection('regions');

Profiles.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});
