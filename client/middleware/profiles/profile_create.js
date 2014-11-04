Template.profileCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var profile = {
      display: $(e.target).find('[name=display]').val()
    };

    profile._id = Profiles.insert(profile);
    Router.go('profilePage', profile);
  }
});
