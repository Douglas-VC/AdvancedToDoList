import { Meteor } from 'meteor/meteor';
import { ProfilesCollection } from '/imports/db/ProfilesCollection';

Meteor.publish('profiles', function () {
  return ProfilesCollection.find({ userIdNumber: this.userId });
});