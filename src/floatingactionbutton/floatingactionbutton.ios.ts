import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Color, ImageSource, colorProperty } from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { FloatingActionButtonBase, expandedProperty, imageSourceProperty, srcProperty } from './floatingactionbutton-common';

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: MDCFloatingButton;

    getDefaultElevation(): number {
        return 6;
    }

    getDefaultDynamicElevationOffset() {
        return 6;
    }
    public _setNativeImage(nativeImage: UIImage) {
        // this.nativeViewProtected.setImageForState(nativeImage ? nativeImage.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate) : nativeImage, UIControlState.Normal);

        this.nativeViewProtected.setImageForState(nativeImage, UIControlState.Normal);
    }
    public createNativeView() {
        const result = MDCFloatingButton.floatingButtonWithShape(this.size === 'mini' ? MDCFloatingButtonShape.Mini : MDCFloatingButtonShape.Default);

        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = colorScheme;
        result.applySecondaryThemeWithScheme(scheme);
        // const colorScheme = themer.getAppColorScheme();
        // if (colorScheme) {
        //     MDCFloatingButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, result);
        // }
        return result;
    }
    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        let dynamicElevationOffset = this.dynamicElevationOffset;
        if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
            dynamicElevationOffset = this.getDefaultDynamicElevationOffset();
        }
        if (this.dynamicElevationOffset === undefined) {
            this.nativeViewProtected.setElevationForState(value + dynamicElevationOffset, UIControlState.Highlighted);
        }
    }

    [dynamicElevationOffsetProperty.setNative](value: number) {
        let elevation = this.elevation;
        if (typeof elevation === 'undefined' || elevation === null) {
            elevation = this.getDefaultElevation();
        }
        this.nativeViewProtected.setElevationForState(value + elevation, UIControlState.Highlighted);
    }
    [imageSourceProperty.setNative](value: ImageSource) {
        this._setNativeImage(value ? value.ios : null);
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    [colorProperty.setNative](value: Color) {
        this.nativeViewProtected.tintColor = value.ios;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = getRippleColor(color);
    }
    [textProperty.setNative](value: string) {
        this.nativeViewProtected.setTitleForState(value, UIControlState.Normal);
    }
    [expandedProperty.setNative](value: boolean) {
        this.nativeViewProtected.setModeAnimated(value ? MDCFloatingButtonMode.Expanded : MDCFloatingButtonMode.Normal, true);
    }
}
