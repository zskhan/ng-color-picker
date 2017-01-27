import {Component, OnChanges, Directive, Input, Output, ViewContainerRef, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ColorPickerService} from './color-picker.service';
import {Rgba, Hsla, Hsva, SliderPosition, SliderDimension} from './classes';
import {NgModule, Compiler, ReflectiveInjector} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
    selector: '[colorPicker]',
    host: {
        '(input)': 'changeInput($event.target.value)',
        '(click)': 'onClick()'
    }
})
export class ColorPickerDirective implements OnInit, OnChanges {
    @Input('colorPicker') colorPicker: string;
    @Output('colorPickerChange') colorPickerChange = new EventEmitter<string>(true);
    @Input('cpToggle') cpToggle: boolean;
    @Output('cpToggleChange') cpToggleChange = new EventEmitter<boolean>(true);
    @Input('cpPosition') cpPosition: string = 'right';
    @Input('cpPositionOffset') cpPositionOffset: string = '0%';
    @Input('cpPositionRelativeToArrow') cpPositionRelativeToArrow: boolean = false;
    @Input('cpOutputFormat') cpOutputFormat: string = 'hex';
    @Input('cpPresetLabel') cpPresetLabel: string = 'Preset colors';
    @Input('cpPresetColors') cpPresetColors: Array<string>;
    @Input('cpCancelButton') cpCancelButton: boolean = false;
    @Input('cpCancelButtonClass') cpCancelButtonClass: string = 'cp-cancel-button-class';
    @Input('cpCancelButtonText') cpCancelButtonText: string = 'Cancel';
    @Input('cpOKButton') cpOKButton: boolean = false;
    @Input('cpOKButtonClass') cpOKButtonClass: string = 'cp-ok-button-class';
    @Input('cpOKButtonText') cpOKButtonText: string = 'OK';
    @Input('cpFallbackColor') cpFallbackColor: string = '#fff';
    @Input('cpHeight') cpHeight: string = 'auto';
    @Input('cpWidth') cpWidth: string = '230px';
    @Input('cpIgnoredElements') cpIgnoredElements: any = [];
    @Input('cpDialogDisplay') cpDialogDisplay: string = 'popup';
    @Input('cpSaveClickOutside') cpSaveClickOutside: boolean = true;
    @Input('cpAlphaChannel') cpAlphaChannel: string = 'hex6';

    private dialog: any;
    private created: boolean;
    private ignoreChanges: boolean = false;

    constructor(private compiler: Compiler, private vcRef: ViewContainerRef, private el: ElementRef, private service: ColorPickerService) {
        this.created = false;
    }

    ngOnChanges(changes: any): void {
        if (changes.cpToggle) {
            if (changes.cpToggle.currentValue) this.openDialog();
            if (!changes.cpToggle.currentValue && this.dialog) this.dialog.closeColorPicker();
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);

            }
            this.ignoreChanges = false;
        }
    }

    ngOnInit() {
        let hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva === null) hsva = this.service.stringToHsva(this.colorPicker, true);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8'));
    }

    onClick() {
        if (this.cpIgnoredElements.filter((item: any) => item === this.el.nativeElement).length === 0) {
            this.openDialog();
        }
    }

    openDialog() {
       console.log('hello world')
    }

    colorChanged(value: string, ignore: boolean = true) {
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value)
    }

    changeInput(value: string) {
        this.dialog.setColorFromString(value, true);
    }

    toggle(value: boolean) {
        this.cpToggleChange.emit(value);
    }
}

