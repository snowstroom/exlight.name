import { NgModule } from '@angular/core';
import { ACCOUNT_ROUTES } from './routes';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from '@common-module/common.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExlightCoreModule } from '@core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// PROVIDERS

// COMPONENTS
import { ProfileEditorPage } from './pages/profile-editor/profile-editor.page';
import { AccountHeadComponent } from './components/account-head/account-head.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { AccountSettingsPage } from './pages/settings-editor/settings-editor.page';
import { AccountPageWrapperComponent } from './components/account-page-wrapper/account-page-wrapper.component';
import { ArticlesPage } from './pages/articles/articles.page';
import { CreateArticlePage } from './pages/create-article/create-article.page';

@NgModule({
    imports: [
        ExlightCommonModule,
        ExlightCoreModule,
        CommonModule,
        BrowserModule,
        RouterModule,
        FontAwesomeModule,
        AngularEditorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    declarations: [
        ProfileEditorPage,
        AccountSettingsPage,
        ArticlesPage,
        CreateArticlePage,
        AccountPageWrapperComponent,
        AccountHeadComponent,
        AccountMenuComponent
    ],
    providers: [],
    exports: [
        ProfileEditorPage,
        AccountSettingsPage,
        RouterModule
    ]
})
export class ExlightAccountModule {}
