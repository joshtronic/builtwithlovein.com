if (Regions.find().count() === 0) {
  Regions.insert({
    _id:     new Meteor.Collection.ObjectID(),
    name:    'Tampa, FL, USA',
    country: 'us',
    state:   'fl',
    city:    'tampa'
  });
}

