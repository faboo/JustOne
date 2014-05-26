(function(){
//  var sites = JSON.parse($('#data_sites').text());
  function isOpen(section){
    return window.location.hash === '#'+section;
  }
  var newestSize = 5;
  var newest = [];

  _.each(sites.section, function(section){
    section.open = ko.observable(isOpen(section.name));
    section.onOpen = function (){
      this.open(!this.open());
      if(this.open())
        window.location.hash = this.name;
    }

    _.each(section.site, function(site){
      site.name = site.name || site.url.
        replace(/^https?:\/\/(www\.)?(.*)$/, "$2").
        replace(/\/?$/, "");
      site.about = site.about || null;
	  site.time = site.time || null;
	  site.section = section.name;

	  if(site.time){
		  newest.push(site);
	  }
    });
  });

  sites.newest = _.chain(newest).sort(function(site){
	  return -parseInt(site.time, 10);
  }).take(newestSize).value();

  ko.applyBindings(sites, $('body')[0]);
})();
