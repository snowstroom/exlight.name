import { IShareButton, IPageDescription } from '@app/services/app.service';

export class VkShareButton implements IShareButton {
    public readonly icon = 'la-vk';
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://vk.com/share.php?url=${desc.url}&title=${desc.title}&image=${desc.img}`;
    }
}

export class TwitterButton implements IShareButton {
    public readonly icon = 'la-twitter-square';
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://twitter.com/intent/tweet?text=${desc.description}&url=${desc.url}&hashtags=${desc.keywords.join(',')}`;
    }
}

export class FacebookButton implements IShareButton {
    public readonly icon = 'la-facebook-official';
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://www.facebook.com/sharer/sharer.php?u=${desc.url}`;
    }
}

export class LinkedInButton implements IShareButton {
    public readonly icon = 'la-linkedin-square';
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://www.linkedin.com/sharing/share-offsite/?url=${desc.url}`;
    }
}

export class TelegramButton implements IShareButton {
    public readonly icon = 'la-telegram';
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `tg://msg_url?url=${desc.url}`;
    }
}
