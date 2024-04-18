import { LitElement, html, customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import {UmbPropertyEditorConfigCollection, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

@customElement("gmaps-property-editor-ui")
export class GmapsPropertyEditorUIElement
    extends LitElement
    implements UmbPropertyEditorUiElement
{
    @property({ type: String })
    public value: MapValue = { lat: 52.379189, lng: 4.899431, zoom: 17, mapType: "Satellite" }; // will never be used .. 

    marker?: any;
    
    @state()
    private _apiKey?: string;
    
    private _mapType?: string;
    
    @state()
    private _zoomLevel?: number;
    
    @state()
    private _latitude?: number;
    
    @state()
    private _longitude?: number;
    
    public set config(config: UmbPropertyEditorConfigCollection | undefined) {
        this._apiKey = config?.getValueByAlias<string>("apikey");
        this._mapType = config?.getValueByAlias<string>("maptype") || "roadmap";
        this._zoomLevel = config?.getValueByAlias<number>("zoom") || 17;
        
        const location = config?.getValueByAlias<number>("location")
        const lat = location?.toString().split(",")[0].trim();
        const lng = location?.toString().split(",")[1].trim();
        this._latitude = Number(lat)  || 52.379189;
        this._longitude = Number(lng) || 4.899431;

        if(!this.value) {
            this.value = { lat: this._latitude, "lng": this._longitude, zoom: this._zoomLevel, mapType: this._mapType };
        }        
    }
    
    async firstUpdated() {
        await import("https://maps.googleapis.com/maps/api/js?key=" + this._apiKey + "&v=beta");
        
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        const map = new Map(this.shadowRoot?.getElementById("map") as HTMLElement, {
            center: { lat: this.value.lat, lng: this.value.lng },
            zoom: this.value.zoom,
            mapId: "4504f8b37365c3d0"
        });

        this.marker = new AdvancedMarkerElement({
            map,
            position: { lat: this.value.lat, lng: this.value.lng },
            gmpDraggable: true
        });

        this.marker.addListener("dragend", this.dragend.bind(this));
        
        map.addListener("zoom_changed", () => {
            let zoomLevel = map.getZoom();
            console.log("zoom", zoomLevel);
            this.value = { ...this.value, zoom: zoomLevel };
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        });
    }

    dragend() {
        console.log("marker", this.marker.position);
        this.value = { ...this.value, lat: this.marker.position.lat, lng: this.marker.position.lng};
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }
    
    render() {
        return html`
            <div style="height:500px; width:100%;" id="map"></div>
        `;
    }
}

type MapValue = {
    lat: number;
    lng: number;
    zoom: number;
    mapType: string;
};

export default GmapsPropertyEditorUIElement;

declare global {
    interface HTMLElementTagNameMap {
        "gmaps-property-editor-ui": GmapsPropertyEditorUIElement;
    }
    interface Window { 
        "google": any;
    }
}