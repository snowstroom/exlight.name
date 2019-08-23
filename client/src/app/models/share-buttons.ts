import { IShareButton, IPageDescription } from '@app/services/app.service';
import { faVk, faTwitter, IconDefinition, faFacebook, faLinkedin, faTelegram } from '@fortawesome/fontawesome-free-brands';

export class VkShareButton implements IShareButton {
    public readonly icon: IconDefinition = faVk;
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://vk.com/share.php?url=${desc.url}&title=${desc.title}&image=${desc.img}`;
    }
}

export class TwitterButton implements IShareButton {
    public readonly icon: IconDefinition = faTwitter;
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://twitter.com/intent/tweet?text=${desc.description}&url=${desc.url}&hashtags=${desc.keywords.join(',')}`;
    }
}

export class FacebookButton implements IShareButton {
    public readonly icon: IconDefinition = faFacebook;
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://www.facebook.com/sharer/sharer.php?u=${desc.url}`;
    }
}

export class LinkedInButton implements IShareButton {
    public readonly icon: IconDefinition = faLinkedin;
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `https://www.linkedin.com/sharing/share-offsite/?url=${desc.url}`;
    }
}

export class TelegramButton implements IShareButton {
    public readonly icon: IconDefinition = faTelegram;
    public url: string;
    constructor(desc: IPageDescription) {
        this.update(desc);
    }

    public update(desc: IPageDescription): void {
        this.url = `tg://msg_url?url=${desc.url}`;
    }
}
