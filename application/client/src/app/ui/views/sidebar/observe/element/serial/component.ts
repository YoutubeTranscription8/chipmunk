import { Component, Input, ChangeDetectorRef, ElementRef, AfterContentInit } from '@angular/core';
import { Ilc, IlcInterface } from '@env/decorators/component';
import { ChangesDetector } from '@ui/env/extentions/changes';
import { SerialTransportSettings } from '@platform/types/observe';
import { Element } from '../element';
import { Mutable } from '@platform/types/unity/mutable';

@Component({
    selector: 'app-views-observed-serial',
    templateUrl: './template.html',
    styleUrls: ['./styles.less'],
})
@Ilc()
export class Item extends ChangesDetector implements AfterContentInit {
    @Input() element!: Element;

    public readonly serial: SerialTransportSettings | undefined;

    constructor(cdRef: ChangeDetectorRef, private _self: ElementRef) {
        super(cdRef);
    }

    public ngAfterContentInit(): void {
        const origin = this.element.source.source.origin;
        if (origin.Stream === undefined) {
            this.log().error(`Expected origin Source`);
            return;
        }
        if (origin.Stream[1].Serial === undefined) {
            this.log().error(`Expected origin Source would be Serial`);
            return;
        }
        (this as Mutable<Item>).serial = origin.Stream[1].Serial;
    }

    public isActive(): boolean {
        return this.element.source.observer !== undefined;
    }

    public restart(): void {
        this.element.provider.repeat(this.element.source.source).catch((err: Error) => {
            this.log().error(`Fail to restart Serial connection: ${err.message}`);
        });
    }

    public stop(): void {
        const observer = this.element.source.observer;
        if (observer === undefined) {
            return;
        }
        observer.abort().catch((err: Error) => {
            this.log().error(`Fail to abort Serial connection: ${err.message}`);
        });
    }
}
export interface Item extends IlcInterface {}