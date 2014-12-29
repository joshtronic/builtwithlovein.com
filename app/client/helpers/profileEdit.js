Template.profileEdit.events({ 
  'submit form': function(e) {
    e.preventDefault();

    var currentId = this._id;

    var profile = {
      description: $(e.target).find('#description').val(),
      gravatar:    $(e.target).find('#gravatar').val(),
      name:        $(e.target).find('#name').val(),
      regionId:    $(e.target).find('#region').val(),
      slug:        $(e.target).find('#slug').val(),
      twitter:     $(e.target).find('#twitter').val(),
    };

    Meteor.call('profileUpdate', currentId, profile, function(err, result) {
      if (err) {
        return alert(err.reason);
      }

      Router.go('/' + result.slug);
    });
  }
});

