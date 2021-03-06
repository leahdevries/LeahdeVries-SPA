
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
      title: 'web app /',
      thumbnail: '/assets/images/carbonTracker-thumb.jpg',
      thumbnailAlt: 'Photo',
      classes: 'photos art',
      content: 'The Canadian Open Data Experience (CODE) is the first nationwide Open Data Hackathon in Canada. An intense 48-hour coding sprint where innovators from coast to coast compete to build the best app utilizing federal government data from the Canadian Open Data Portal. Working in a team of four, we came up with an efficient way to track the carbon emissions from your vehicle. We created this app to help people understand the impact that their vehicles have on the environment & as a tool to use when purchasing or renting a vehicle.'
    },
    { 
      id: '1',
      title: 'wordpress theme /',
      thumbnail: '/assets/images/wp-thumb.jpg',
      thumbnailAlt: 'Photo 2',
      classes: 'photos'
    },
    { 
      id: '2',
      title: 'infographic /',
      thumbnail: '/assets/images/CCD-thumb.jpg',
      thumbnailAlt: 'Photo 3',
      classes: 'art'
    },
    { 
      id: '3',
      title: 'web app /',
      thumbnail: '/assets/images/carbonTracker-thumb.jpg',
      thumbnailAlt: 'Photo 3',
      classes: 'ui'
    },
    { 
      id: '4',
      title: 'wordpress theme /',
      thumbnail: '/assets/images/wp-thumb.jpg',
      thumbnailAlt: 'Photo 4',
      classes: 'photos'
    },
    { 
      id: '5',
      title: 'infographic /',
      thumbnail: '/assets/images/CCD-thumb.jpg',
      thumbnailAlt: 'Photo 5',
      classes: 'ui art'
    }
  ];

      var featuredProjects = [
    { 
      id: '0',
      title: 'web app',
      thumbnail: '/assets/images/carbonTracker-thumb.jpg',
      thumbnailAlt: 'Photo',
      classes: 'photos art'
    },
    { 
      id: '1',
      title: 'wordpress theme',
      thumbnail: '/assets/images/wp-thumb.jpg',
      thumbnailAlt: 'Photo 2',
      classes: 'photos'
    },
    { 
      id: '2',
      title: 'infographic',
      thumbnail: '/assets/images/CCD-thumb.jpg',
      thumbnailAlt: 'Photo 3',
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
        projects: featuredProjects
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
        content: '<h1>Contact Me</h1>'
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
        document.location = 'mailto:devries.leah@gmail.com?subject=' + escape(subject) + '&body=' + escape(text.selection) + '/r/nFrom:' + email;

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