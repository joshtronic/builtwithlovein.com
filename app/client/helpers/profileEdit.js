Template.profileEdit.events({ 
  'submit form': function(e) {
    e.preventDefault();

    var currentId = this._id;

    var profile = {
      name:     $(e.target).find('#name').val(),
      slug:     $(e.target).find('#slug').val(),
      regionId: $(e.target).find('#region').val()
    };

    Meteor.call('profileUpdate', currentId, profile, function(err, result) {
      if (err) {
        return alert(err.reason);
      }

      Router.go('profile', {slug: result.slug});
    });
  }
});

