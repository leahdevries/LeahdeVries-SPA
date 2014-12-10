
// -----------------------------
// Wait for DOM Load
// -----------------------------

jQuery(function($) {

  // -----------------------------
  // An array of projects
  // -----------------------------

  var projects = [
    { 
      id: '0',
      title: 'Project 1',
      thumbnail: '/assets/images/logo_black.png',
      thumbnailAlt: 'Photo',
      description: 'example 1',
      classes: 'photos art'
    },
    { 
      id: '1',
      title: 'Project 2',
      thumbnail: '/assets/images/logo_black.png',
      thumbnailAlt: 'Photo 2',
      description: 'example 2',
      classes: 'photos'
    },
    { 
      id: '2',
      title: 'Project 3',
      thumbnail: '/assets/images/logo_black.png',
      thumbnailAlt: 'Photo 3',
      description: 'example 3',
      classes: 'art'
    }
  ];

  // -----------------------------
  // Side Nav
  // -----------------------------

  $( '#simple-menu' ).sidr({
    side: 'right'
  });


  // -----------------------------
  // Router
  // -----------------------------

  var Router = Backbone.Router.extend({

    // Our Routes
    routes: {
      '' : 'home',
      'work': 'work',
      'about': 'about',
      'project/:id': 'project',
      'contact': 'contact'
    },

    // Home Route
    home: function() {
      console.log('Navigating to Home Page');
      App.views['home'].render();
    },

    // WORK Route
    work: function() {
      console.log('Navigating to Work Page');
      App.views['work'].render();
    },

     // ABOUT Route
    about: function() {
      console.log('Navigating to About Page');
      App.views['about'].render();
    },

     // Project
    project: function(id) {
      console.log('Navigating to a Project Page:', id);
      App.views['project'].render(id);
    },

    // Contact Route
    contact: function() {
      console.log('Navigating to Contact Page');
      App.views['contact'].render();
    }

  });

  // -----------------------------
  // Application
  // -----------------------------

  var Application = function() {

    // Add router
    this.router = new Router();

    // Setup views
    this.views = {
      home: new HomeView(),
      work: new WorkView(),
      about: new AboutView(),
      project: new ProjectView(),
      contact: new ContactView(),
    };

  };

  // -----------------------------
  // Home View
  // -----------------------------

  var HomeView = Backbone.View.extend({

    // Our Container Element
    el: $('.main'),

    // Our template ID
    template: '#home',

    // Initialize View
    initialize: function() {

      // Setup our template and start our model
      this.template = Handlebars.compile($(this.template).html());
      this.model = new Backbone.Model({});

      // Some page data
      this.model.set({
        content: '<h1>Home Page</h1>',
        portfolioItems: [
        {name: 'Microsoft Project', image: '../images/logo_black.png'},
        {name: 'Google Project', image: 'someimage.jpg'}
        ]
      });

    },

    // Our Render Function
    render: function() {

      // Get data and render our template
      var data = this.model.toJSON();
      var html = this.template(data);

      // Set update the containers HTML
      $(this.el).html(html);
    }

  });

  // -----------------------------
  // Work View
  // -----------------------------

  var WorkView = Backbone.View.extend({

    // Our Container Element
    el: $('.main'),

    // Our template ID
    template: '#work',

    // Initialize View
    initialize: function() {

      // Setup our template and start our model
      this.template = Handlebars.compile($(this.template).html());
      this.model = new Backbone.Model({});

      // Some page data
      this.model.set({
        projects: projects
      });

    },

    // Our Render Function
    render: function() {

      // Get data and render our template
      var data = this.model.toJSON();
      var html = this.template(data);

      // Set update the containers HTML
      $(this.el).html(html);

      // Add jQuery Isotope
      var $container = $('.page.work');
      
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      
      // Bind to our navigation items, the filtering of projects
      $('.projectCategories a').click(function(){
          
          // Remove the current class from the old link
          $('.projectCategories .current').removeClass('current');
          
          // Add the current class to the link the user clicked
          $(this).addClass('current');
          
          // Find the selector/filter from the link clicked
          var selector = $(this).attr('data-class');

          // Filter our isotope gallery based on the data-class of the link clicked
          $container.isotope({
            filter: selector,
            animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
            }
          });
          return false;
      }); 

    }

  });

  // -----------------------------
  // About View
  // -----------------------------

  var AboutView = Backbone.View.extend({

    // Our Container Element
    el: $('.main'),

    // Our template ID
    template: '#about',

    // Initialize View
    initialize: function() {

      // Setup our template and start our model
      this.template = Handlebars.compile($(this.template).html());
      this.model = new Backbone.Model({});

      // Some page data
      this.model.set({
        // content: '<h1>About Page</h1>'
      });

    },

    // Our Render Function
    render: function() {

      // Get data and render our template
      var data = this.model.toJSON();
      var html = this.template(data);

      // Set update the containers HTML
      $(this.el).html(html);
    }

  });

   // -----------------------------
  // Project View
  // -----------------------------

  var ProjectView = Backbone.View.extend({

    // Our Container Element
    el: $('.main'),

    // Our template ID
    template: '#project',

    // Initialize View
    initialize: function() {

      // Setup our template and start our model
      this.template = Handlebars.compile($(this.template).html());
      this.model = new Backbone.Model({});

    },

    // Our Render Function
    render: function(id) {

      // Some page data
      this.model.set(projects[id]);

      // Get data and render our template
      var data = this.model.toJSON();
      var html = this.template(data);

      // Set update the containers HTML
      $(this.el).html(html);
    }

  });

  // -----------------------------
  // Contact View
  // -----------------------------

  var ContactView = Backbone.View.extend({

    // Our Container Element
    el: $('.main'),

    // Our template ID
    template: '#contact',

    // Initialize View
    initialize: function() {

      // Setup our template and start our model
      this.template = Handlebars.compile($(this.template).html());
      this.model = new Backbone.Model({});

      // Some page data
      this.model.set({
        content: '<h1>Contact Page</h1>'
      });

    },

    // Our Render Function
    render: function() {

      // Get data and render our template
      var data = this.model.toJSON();
      var html = this.template(data);

      // Set update the containers HTML
      $(this.el).html(html);
    
      // Send our contact form
      $('.submit').on('click', function(e) {
        
        e.preventDefault();

        // Get our information
        var text = $('.text').val();
        var subject = $('.submit').val();
        var email = $('.email').val();

        // Prompt a mailto dialog box with prepoluated data
        document.location = 'mailto:yourEmail@you.com?subject=' + escape(subject) + '&body=' + escape(text.selection) + '/r/nFrom:' + email;

      });

    }

  });

  // -----------------------------
  // Start Application
  // -----------------------------

  var App = new Application();

  // Start Backbone History
  Backbone.history.start({ pushState: true });

  // -----------------------------
  // Navigation Links
  // -----------------------------

  $(document).delegate('a', 'click', function(e) {
    e.preventDefault();
    App.router.navigate($(this).attr('href'), { trigger: true });

  });


});