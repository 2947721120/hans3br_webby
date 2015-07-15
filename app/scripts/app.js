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
      pageName: "FunctionalCoating", 
      pageTitle: "Functional Coating",
      productTitle: "Acryleze II",
    }
  ];
  //store a coating layer index for create new pages
  app.coatingLayerNumber = 0;
    
  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('dd-open-suglet-dialog', function() {
    // imports are loaded and elements have been registered
    document.querySelector('#sugletDialog').toggle();
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
  }

})(document);
