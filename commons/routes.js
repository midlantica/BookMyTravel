Router.configure({
  notFoundTemplate: 'notFound', // template with name notFound
  loadingTemplate: 'loading' // template with name loading
});

Router.onBeforeAction('loading'); // before every action call show loading template

Router.route("/create-travel", {
  name: "createTravel",
  layoutTemplate: "createTravelLayout",
  template: "createTravel"
});

// path is / which is the landing page
Router.route("/", {
  name: "home",
  layoutTemplate: "homeLayout",
  template: "home",
  yieldRegions: {
      travelSearch: {to: "search"}
  }
});

Router.route("/book/:_id", {
  name: "book",
  layoutTemplate: "createTravelLayout",
  template: "bookTravel",
  waitOn: function(){
    Meteor.subscribe("BlockedSeats", this.params._id);
    Meteor.subscribe("Reservations", this.params._id);
  },
  data: function(){
    templateData = {
      _id: this.params._id,
      bus: BusServices.findOne({_id: this.params._id}),
      reservations: Reservations.find({bus: this.params._id}).fetch(),
      blockedSeats: BlockedSeats.find({bus: this.params._id}).fetch(),
    };
    return templateData;
  }
});
