(function(){
//  var sites = JSON.parse($('#data_sites').text());
  function isOpen(section){
    return window.location.hash === '#'+section;
  }

  _.each(sites.section, function(section){
    section.open = ko.observable(isOpen(section.name));
    section.onOpen = function (){
      this.open(!this.open());
      if(this.open())
        window.location.hash = this.name;
    }

    _.each(section.site, function(site){
      site.name = site.url.
        replace(/^https?:\/\/(www\.)?(.*)$/, "$2").
        replace(/\/?$/, "");
      site.about = site.about || null;
    });
  });

  ko.applyBindings(sites, $('article')[0]);
})();
