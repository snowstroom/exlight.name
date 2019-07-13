import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from '@common-module/common.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// PROVIDERS

// COMPONENTS
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';

@NgModule({
    imports: [
        ExlightCommonModule,
        CommonModule,
        BrowserModule,
        RouterModule,
        FontAwesomeModule
    ],
    declarations: [
        ProfileEditorComponent
    ],
    providers: [],
    exports: [
        ProfileEditorComponent
    ]
})
export class ExlightAccountModule { }
