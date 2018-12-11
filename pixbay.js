const request = require('request');
var key = '10624132-9decbc4310605f0a746386ac8';

var getImages = (query) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://pixabay.com/api/?key=' + key + '&q=' + encodeURIComponent(query),
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Pixabay');
            } else if (body.total <= 0) {
                reject('Results not found');
            } else {
                resolve(
                    body.hits
                );
            }
        });
    });
}

var parseImages = (results) => {
	var parsed = "";
	for(var i=0; i<results.length; i++) {
		parsed += `<img src='${results[i].previewURL}' />`
	}
	return parsed;
}

module.exports = {
	getImages,
	parseImages
};