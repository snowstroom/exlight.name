import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from '@common-module/common.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExlightCoreModule } from '@core/core.module';
// PROVIDERS

// COMPONENTS
import { ProfileEditorPage } from './pages/profile-editor/profile-editor.page';
import { AccountHeadComponent } from './components/account-head/account-head.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { AccountSettingsPage } from './pages/settings-editor/settings-editor.page';
import { AccountPageWrapperComponent } from './components/account-page-wrapper/account-page-wrapper.component';

@NgModule({
    imports: [
        ExlightCommonModule,
        ExlightCoreModule,
        CommonModule,
        BrowserModule,
        RouterModule,
        FontAwesomeModule
    ],
    declarations: [
        ProfileEditorPage,
        AccountSettingsPage,
        AccountPageWrapperComponent,
        AccountHeadComponent,
        AccountMenuComponent
    ],
    providers: [],
    exports: [
        ProfileEditorPage,
        AccountSettingsPage,
    ]
})
export class ExlightAccountModule { }
