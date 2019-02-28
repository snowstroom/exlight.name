import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  private artId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  public ngOnInit(): void {
    this.titleSrv.setTitle('Статья');
    this.activatedRoute.params.subscribe(params => {
      this.artId = +params['id']; // (+) converts string 'id' to a number
      console.warn(this.artId);
      // In a real app: dispatch action to load the details here.
   });
  }

}
