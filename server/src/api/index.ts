import { categoriesApi } from './article-category.route';
import { articleApi } from './article.route';
import { carouselApi } from './carousel-items.route';
import { musicApi } from './music.route';
import { photoApi } from './photo.route';
import { videoApi } from './video.route';

export const routes = [
    categoriesApi,
    articleApi,
    carouselApi,
    musicApi,
    photoApi,
    videoApi
];
