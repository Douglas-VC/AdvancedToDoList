import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProfilesCollection } from '/imports/db/ProfilesCollection';

Meteor.methods({
  'profiles.insert'({ userId }) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ProfilesCollection.insert({
      userIdNumber: userId,
      name: '',
      email: '',
      birthday: '',
      gender: '',
      company: '',
      photo: ''
    });
  },

  'profiles.setProfileInfo'({ userIdNumber, name, email, birthday, gender, company, photo }) {
    check(userIdNumber, String);
    check(name, String);
    check(email, String);
    if(birthday) {
      check(Object.prototype.toString.call(birthday), "[object Date]");
    }
    check(gender, String);
    check(company, String);
    check(photo, String);

    console.log(name)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ProfilesCollection.update({userIdNumber: userIdNumber}, {
      $set: {
        name: name,
        email: email,
        birthday: birthday,
        gender: gender,
        company: company,
        photo: photo
      }
    });
  }
});