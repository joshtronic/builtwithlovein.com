Template.profileNew.events({ 
  'submit form': function(e) {
    e.preventDefault();

    var profile = {
      name:     $(e.target).find('#name').val(),
      slug:     $(e.target).find('#slug').val(),
      regionId: $(e.target).find('#region').val()
    };

    Meteor.call('profileInsert', profile, function(err, result) {
      if (err) {
        return alert(err.reason);
      }

      Router.go('/' + result.slug);
    });
  }
});

