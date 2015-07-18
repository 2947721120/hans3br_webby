/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  //create the default coating pages to show
  app.pages = [
    {
      pageName: "CoatingLayer1", 
      pageTitle: "Drug Layering",
      productTitle: "Opadry 03K",
    },
    {
      pageName: "CoatingLayer2", 
      pageTitle: "Seal Coating",
      productTitle: "Opadry YS-1",
    },
    {
      pageName: "CoatingLayer3", 
      pageTitle: "Barrier Membrane",
      productTitle: "Surelease",
    }
  ];
  
  app.SUGLETS = [
    {label:'Suglet 16/18', diameter: 1100, min:1000, max:1180, density:1.5},
    {label:'Suglet 18/20', diameter: 900, min:850, max:1000, density:1.5},
    {label:'Suglet 20/25', diameter: 800, min:710, max:850, density: 1.5},
    {label:'Suglet 25/30', diameter: 665, min:600, max:710, density: 1.5},
    {label:'Suglet 30/35', diameter: 550, min:500, max:600, density:1.5},
    {label:'Suglet 45/60', diameter: 300, min:250, max:355, density:1.5},
    {label:'Suglet 60/80', diameter: 215, min:180, max:250, density: 1.5},
    {label:'Custom Size', diameter: 750, min:180, max:1200, density:1.5}
  ];  
  
  app.CAPSULES = [
    {label:'Size 000', volume:'1.37'},
    {label:'Size 00', volume:'0.95'},
    {label:'Size 0', volume:'0.68'},
    {label:'Size 1', volume:'0.50'},
    {label:'Size 2', volume:'0.37'},
    {label:'Size 3', volume:'0.30'},
    {label:'Size 4', volume:'0.21'},
    {label:'Size 5', volume:'0.13'},
    {label:'Custom Capsule', volume:'0.60'}
  ];
  
  app.IR_COATINGS = [
    {label:'Opadry 03A', density:'1.01'},
    {label:'Opadry 03K', density:'1.01'},
    {label:'Opadry YS-1', density:'1.01'},
    {label:'Opadry II 85F', density:'1.01'},
    {label:'Custom Binder', density:'1.01'}
  ];
                        
  app.ENTERIC_COATINGS = [
    {label:'Acryleze', density:'1.64'},
    {label:'Acryleze II', density:'1.64'},
    {label:'Opadry Enteric', density:'1.21'},
    {label:'Custom Enteric', density:'1.01'}
 ];
                         
  app.BARRIER_MEMBRANE_COATINGS = [
    {label:'Surelease', density:'1.01'},
    {label:'Ethocel', density:'1.21'},
    {label:'Custom Barrier Membrane', density:'1.01'}
  ];
  
  app.APPLICATIONS = ["Drug Layering", "Seal Coating", "Enteric Coating", "Barrier Membrane", "Custom Coating"];
  
  
  
  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };
  
  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    document.querySelector('dd-core-dashboard').diameter = 644;
    document.querySelector('dd-capsule-dashboard').capsuleVolumeMax = 0.7;
  });

  window.addEventListener('dd-open-suglet-dialog', function() {
    document.querySelector('#sugletDialog').toggle();
  });
  
  window.addEventListener('dd-open-coating-dialog', function(event) {
    // imports are loaded and elements have been registered
    var application = event.detail.application;
    if(application == 'Enteric Coating'){
      app.coatings = app.ENTERIC_COATINGS;
    } else if(application == 'Barrier Membrane'){
      app.coatings = app.BARRIER_MEMBRANE_COATINGS;
    } else {
      app.coatings = app.IR_COATINGS;
    }
    var dialog = document.querySelector('#coatingDialog');
    dialog.querySelector('iron-selector').selected = null;
    dialog.toggle();
  });
  
  window.addEventListener('dd-open-application-dialog', function() {
    var dialog = document.querySelector('#applicationDialog');
    dialog.querySelector('iron-selector').selected = null;
    dialog.toggle();
  });
  
  window.addEventListener('dd-open-capsule-dialog', function() {
    // imports are loaded and elements have been registered
    document.querySelector('#capsuleDialog').toggle();
  });
  
  window.addEventListener('dd-last-diameter-change', function() {
    var spheres = document.querySelectorAll('dd-sphere-card');
    for(var i=0; i<spheres.length; i++) {
      spheres[i]._updateGraphic();
    }
  });
  
  //event fired when the capsule dashboard changes the fill percent
  window.addEventListener('dd-capsule-change', function() {
    var capsuleCards = document.querySelectorAll('dd-capsule-card');
    for(var i=0; i<capsuleCards.length; i++) {
      capsuleCards[i].updateValues();
    }
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app._onMenuItemSelected = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    } 
    var pagePath = '/DosageDesigner/';
    if(this.currentPage != 'DosageDesigner'){
      pagePath = pagePath + this.currentPage;
      page(pagePath);
    } else {
      page(pagePath);
    }
  };
  
  app._sugletSelected = function(event) {
    var model = event.model.item;
    var core = document.querySelector('dd-core-dashboard');
    core.set('sugletName', model.label);
    core.set('maxDiameter', model.max);
    core.set('minDiameter', model.min);
    core.set('apparentDensity', model.density);
    core.set('diameter', model.diameter);
  };
  
  app._capsuleSelected = function(event) {
    var model = event.model.item;
    var capsule = document.querySelector('dd-capsule-dashboard');
    capsule.capsuleSize = model.label;
    capsule.capsuleVolumeMax = model.volume;
  };
  
  app._applicationSelected = function(event) {
    var selector = 'dd-coating-dashboard[page-name = ' + app.currentPage + ']';
    var page = document.querySelector(selector);
    page.coatingApplication = event.model.item;
  };
  
  app._coatingSelected = function(event) {
    var selector = 'dd-coating-dashboard[page-name = ' + app.currentPage + ']';
    var page = document.querySelector(selector);
    page.coatingFamily = event.model.item.label;
    page.filmDenstiy = event.model.item.density;
  };
  
  //store a coating layer index for create new pages
  app.coatingLayerNumber = app.pages.length;
  //function to add a page
  app._addPage = function() {
    //we store the layer index and always increment by one
    app.coatingLayerNumber++;
    //combine with CoatingLayer to create a page path
    var newPageName = 'CoatingLayer' + app.coatingLayerNumber;
    var temp = {
                  pageName: newPageName, 
                  pageTitle: "Coating Layer",
                  productTitle: "Opadry 03K"
                };
    //use polymer array api to push and notify of changes            
    app.push('pages', temp);
  };
  
  
  

})(document);
