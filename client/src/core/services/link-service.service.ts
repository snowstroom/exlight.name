import {
  Injectable,
  RendererFactory2,
  ViewEncapsulation,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {},
    });
  }

  public addTag(tag: LinkDefinition): HTMLLinkElement {
    try {
      const link: HTMLLinkElement = this.renderer.createElement('link');
      const head = this.document.head;

      if (head === null) {
        throw new Error('<head> not found within DOCUMENT.');
      }

      Object.keys(tag).forEach((prop: string) => {
        return this.renderer.setAttribute(link, prop, tag[prop]);
      });

      this.renderer.appendChild(head, link);
      return link;
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  public deleteTag(link: HTMLLinkElement): void {
    if (link) {
      const head = this.document.head;
      this.renderer.removeChild(head, link);
    }
  }
}

export declare type LinkDefinition = {
  charset?: string;
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  rev?: string;
  sizes?: string;
  target?: string;
  type?: string;
} & {
  [prop: string]: string;
};
