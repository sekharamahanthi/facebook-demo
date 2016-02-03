Post_messages = new Mongo.Collection("post_messages");
if (Meteor.isClient) {
  Template.body.helpers({
    display_posts: function () {
      return Post_messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    var message = event.target.message.value;
    // Insert a task into the collection
    Post_messages.insert({
      message: message,
      createdAt: new Date() // current time
    });
    // Clear form
    event.target.message.value = "";
    }
  });

  Template.posts.events({
  "click .delete": function () {
    Post_messages.remove(this._id);
  }
  });
}
