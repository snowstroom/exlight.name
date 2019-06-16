import { Provider } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HummerConfig extends HammerGestureConfig {
    public overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 20 }, // override default settings
        'pinch': { enable: false },
        'rotate': { enable: false }
    };
}

export const HUMMER_PROVIDER: Provider = {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HummerConfig
};
