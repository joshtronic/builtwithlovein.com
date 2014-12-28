Template.profile.helpers({
  isOwner: function() {
    return this.userId === Meteor.userId();
  },
});

