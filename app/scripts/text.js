
//add all the text values for data binding
//app is defined at the data binding template

(function(document) {
    'use strict';

    var SUGLETS = [
                    {label:'Suglet 16/18', diameter: 1100, min:1000, max:1180, density:1.5},
                    {label:'Suglet 18/20', diameter: 900, min:850, max:1000, density:1.5},
                    {label:'Suglet 20/25', diameter: 800, min:710, max:850, density: 1.5},
                    {label:'Suglet 25/30', diameter: 665, min:600, max:710, density: 1.5},
                    {label:'Suglet 30/35', diameter: 550, min:500, max:600, density:1.5},
                    {label:'Suglet 45/60', diameter: 300, min:250, max:355, density:1.5},
                    {label:'Suglet 60/80', diameter: 215, min:180, max:250, density: 1.5},
                    {label:'Custom Size', diameter: 750, min:180, max:1200, density:1.5}
                ];
                
    var CAPSULES = [
                    {label:'Size 000', volume:'1.37'},
                    {label:'Size 00', volume:'0.95'},
                    {label:'Size 0', volume:'0.68'},
                    {label:'Size 1', volume:'0.50'},
                    {label:'Size 2', volume:'0.37'},
                    {label:'Size 3', volume:'0.30'},
                    {label:'Size 4', volume:'0.21'},
                    {label:'Size 5', volume:'0.13'},
                    {label:'Custom Size', volume:'0.60'}
                    ];
                    
    var DRUG_COATINGS = [
                          {label:'Opadry 03A', density:'1.01'},
                          {label:'Opadry 03K', density:'1.01'},
                          {label:'Opadry YS-1', density:'1.01'},
                          {label:'Opadry II 85F', density:'1.01'},
                          {label:'Custom Binder', density:'1.01'}
                        ];
                        
  var SEAL_COATINGS = [
                        {label:'Opadry 03A', density:'1.01'},
                        {label:'Opadry 03K', density:'1.01'},
                        {label:'Opadry YS-1', density:'1.01'},
                        {label:'Opadry II 85F', density:'1.01'},
                        {label:'Custom Coating', density:'1.01'}
                      ];
                      
  var ENTERIC_COATINGS = [
                            {label:'Acryleze', density:'1.64'},
                            {label:'Acryleze II', density:'1.64'},
                            {label:'Opadry Enteric', density:'1.21'},
                            {label:'Custom Enteric', density:'1.01'}
                         ];
                         
  var BARRIER_MEMBRANE_COATINGS = [
                                    {label:'Surelease', density:'1.01'},
                                    {label:'Ethocel', density:'1.21'},
                                    {label:'Custom Barrier Membrane', density:'1.01'}
                                  ];
                                  

});
  
  