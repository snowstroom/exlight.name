"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.categoriesApi = express_1.Router();
exports.categoriesApi.get('/article-categories', function (req, res, next) {
    console.log(req.body);
    res.end();
    next();
});
exports.categoriesApi.post('/article-category', function (req, res, next) {
    console.log(req.body);
    res.end();
    next();
});
exports.categoriesApi.delete('/article-category', function (req, res, next) {
    console.log(req.body);
    res.end();
    next();
});
//# sourceMappingURL=article-category.route.js.map