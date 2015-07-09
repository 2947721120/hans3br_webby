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

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('dd-open-page', function() {
    console.log('You shall open.... a page');
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app._closeDrawer = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };
  // Close drawer after menu item is selected if drawerPanel is narrow
  app._openDdPage = function(event) {//fall function to close drawer if open
    app._closeDrawer();
    //page is defined in routing.html. 
    //the function there will update the route to show the right page
    page('/DosageDesigner');
  };
  
  // Open the core subsrate page if chip or menu item selected
  app._openCorePage = function(event) {
    //fall function to close drawer if open
    app._closeDrawer();
    //page is defined in routing.html. 
    //the function there will update the route to show the right page
    page('/DosageDesigner/CoreSubstrate');
  };
  
  // Open the capsule  page if chip or menu item selected
  app._openCapsulePage = function(event) {
    //fall function to close drawer if open
    app._closeDrawer();
    //page is defined in routing.html. 
    //the function there will update the route to show the right page
    page('/DosageDesigner/Capsule');
  };
  
  // When chip or menu item is selected we open the coating page
  app._openCoatingPage = function(event) {
    //fall function to close drawer if open
    app._closeDrawer();
    //first we get the item number and parse out the spaces
    var path = event.model.item.replace(/\s+/g, '');
    //combine to create the path to change page too
    var coatingPath = '/DosageDesigner/' + path;
    //page is defined in routing.html. 
    //the function there will update the route to show the right page
    page(coatingPath);
    event.stopPropagation();
  };

})(document);
