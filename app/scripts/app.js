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
      pageName: "DrugLayering", 
      pageTitle: "Drug Layering",
      productTitle: "Opadry 03K",
    },
    {
      pageName: "SealCoating", 
      pageTitle: "Seal Coating",
      productTitle: "Opadry YS-1",
    },
    {
      pageName: "BarrierMembrane", 
      pageTitle: "Barrier Membrane",
      productTitle: "Surelease",
    }
  ];
    
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
    // imports are loaded and elements have been registered
    document.querySelector('#sugletDialog').toggle();
  });
  
  window.addEventListener('dd-open-coating-dialog', function() {
    // imports are loaded and elements have been registered
    document.querySelector('#coatingDialog').toggle();
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
    console.log('capsule fill changed');
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
  
  //store a coating layer index for create new pages
  app.coatingLayerNumber = 0;
  
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
    //after adding a layer we update the values
    //updating only the core will fire the chain to update the other layers
    var core = document.querySelector('dd-core-dashboard');
    var coatings = document.querySelectorAll('dd-coating-dashboard');
    //set the intial coating layer using the 
    coatings[0].set('diameter', core.diameter);
    coatings[0].set('apparentDensity', core.apparentDensity);
    coatings[0].set('assay', core.assay);
  };

})(document);
