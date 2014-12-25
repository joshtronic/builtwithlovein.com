Template.profileNew.helpers({
  regions: function() {
    return Regions.find({});
  },
});

Template.profileNew.events({ 
  'submit form': function(e) {
    e.preventDefault();

    var profile = {
      name:   $(e.target).find('#name').val(),
      slug:   $(e.target).find('#slug').val(),
      region: $(e.target).find('#region').val()
    };

    Meteor.call('profileInsert', post, function(err, result) {
      if (err) {
        return alert(err.reason);
      }

      // TODO go to profile /name
      Router.go('globe', {_id: result._id});
    });
  }
});

