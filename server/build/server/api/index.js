"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var article_category_route_1 = require("./article-category.route");
var article_route_1 = require("./article.route");
var carousel_items_route_1 = require("./carousel-items.route");
var music_route_1 = require("./music.route");
var photo_route_1 = require("./photo.route");
var video_route_1 = require("./video.route");
exports.routes = [
    article_category_route_1.categoriesApi,
    article_route_1.articleApi,
    carousel_items_route_1.carouselApi,
    music_route_1.musicApi,
    photo_route_1.photoApi,
    video_route_1.videoApi
];
//# sourceMappingURL=index.js.map