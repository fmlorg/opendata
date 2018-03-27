//
// Copyright (C) 2017-2018 Ken'ichi Fukamachi <fukachan@fml.org>
//               http://www.fml.org/
//  All rights reserved. This program is free software; you can
//  redistribute it and/or modify it under the 2-Clause BSD License.
//
// XXX This code runs based on Leaflet.js 
// XXX where "L" is the predefined global variable in using "Leaflet.js".
//

// initialized the base map with the center ...
var map   = L.map('map').setView([43.108043, 141.298608], 12);

// add copyright
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
map.addLayer(tiles);

// paste data as points (point style)
var config = configInit();
for (var key in config) {
     data = config[key].data;
    color = config[key].color;
    console.log("level = " + key + " => " + color);
    if (data != undefined) {
	L.geoJSON(data, {
	    pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, gjMarker(color));
	    }
	}).addTo(map);
    }
}


//
// utilities
//
function colorRGB (color) {
    switch (color) {
    case         "red": return "#FF0000";
    case        "pink": return "#EF8F9C";
    case      "orange": return "#FFB74C";
    case      "yellow": return "#FFFF00";
    case "yellowgreen": return "#FFFF00";
    case       "green": return "#00FF41";
    case        "blue": return "#0C00CC";
    case      "purple": return "#C400CC";
    }
}

function gjMarker (color) {
    var rgb = colorRGB(color);
    return {
	radius:            5,
	fillColor:       rgb,
	color:        "#000",
	weight:            1,
	opacity:           4,
	fillOpacity:     0.5
    };
}

//  gjDataLevel[0-6] variables are defined in "data-bicycle-risk.js".
function configInit () {
    return [
	{
	    data: gjDataLevel0,
	    color: "red",
	},
	{
	    data: gjDataLevel1,
	    color: "pink",
	},
	{
	    data: gjDataLevel2,
	    color: "orange",
	},
	{
	    data: gjDataLevel3,
	    color: "yellow",
	},
	{
	    data: gjDataLevel4,
	    color: "green",
	},
	{
	    data: gjDataLevel5,
	    color: "blue",
	},
    ];
}
