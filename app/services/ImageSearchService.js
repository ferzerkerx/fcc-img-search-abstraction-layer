'use strict';



function ImageSearchService () {


    this.search = function (req, res) {
        var images = [{
            "url":"http://cdnstatic.visualizeus.com/thumbs/36/0b/funny,lolcat,cats,cat,lolcats,humor-360ba427d350494fb4e69b209a93a814_h.jpg",
            "snippet":"funny-pictures-cat-breaks-",
            "thumbnail":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT3LYyfkNxQWcG6wmB6M2FgUZpMXbjxXhc-g4CJ18luXAvDBdBNrzXAZQ8",
            "context":"http://vi.sualize.us/icanhascheezburger_files_wordpress_2008_06_funny_pictures_hug_moment_forever_love_lolcats_picture_n2v.html"
        }];


        res.json(images);
    };

}

module.exports = ImageSearchService;