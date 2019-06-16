import { Component } from '@angular/core';
import { ApplicationService } from '@app/services/app.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage {

  constructor(
    private appSrv: ApplicationService,
    private router: Router
  ) {
    this.appSrv.setPageInfo({
      title: 'О сайте, контакты',
      description: 'Контакты. Информация о сайте и о владельце сайта. Блог разработчика\
      о творчестве, разработке и др.',
      keywords: ['eXlight', 'only_exlight', 'Контакты', 'Керничный Андрей'],
      img: '/assets/site-preview.png',
      url: this.router.url
    });
  }

}
