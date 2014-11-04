Template.profileNew.events({
  'submit form': function(e)
  {
    e.preventDefault();

    var profile = {
      display: $(e.target).find('[name=display]').val(),
      country: 'us',
      state: 'fl',
      city: 'tampa',
      slug: $(e.target).find('[name=slug]').val(),
      description: $(e.target).find('[name=description]').val()
    };

    profile._id = Profiles.insert(profile);
    Router.go('profilePage', profile);
  }
});
