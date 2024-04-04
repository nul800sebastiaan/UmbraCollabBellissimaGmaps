import { LitElement, html, customElement, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

@customElement("gmaps-property-editor-ui")
export class GmapsPropertyEditorUIElement
    extends LitElement
    implements UmbPropertyEditorUiElement
{
    @property({ type: String })
    public value = "";

    marker?: any;

    async firstUpdated() {
        await import('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpkGr_Bf9gxIXWEoBVvMbVZMv7HCXWE3U&v=beta');
                
        let val = { 'lat': 55.406355270388346, 'lng': 10.389076778724018 }
        if(this.value) {
            val = JSON.parse(this.value);
        }

        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const map = new Map(this.shadowRoot?.getElementById('map') as HTMLElement, {
            center: { lat: val.lat, lng: val.lng },
            zoom: 14,
            mapId: '4504f8b37365c3d0',
        });

        this.marker = new AdvancedMarkerElement({
            map,
            position: { lat: val.lat, lng: val.lng },
            gmpDraggable: true
        });

        this.marker.addListener('dragend', this.dragend.bind(this));
    }

    dragend() {
        console.log('marker', this.marker.position);
        this.value = this.marker.position;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }
    
    render() {
        return html`
            <p>${this.value}</p>
            <div style="height:300px; width:100%;" id="map"></div>
        `;
    }
}

export default GmapsPropertyEditorUIElement;

declare global {
    interface HTMLElementTagNameMap {
        "gmaps-property-editor-ui": GmapsPropertyEditorUIElement;
    }
}