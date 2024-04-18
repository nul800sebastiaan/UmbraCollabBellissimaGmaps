import { LitElement, html, customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import {UmbPropertyEditorConfigCollection, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

@customElement("gmaps-property-editor-ui")
export class GmapsPropertyEditorUIElement
    extends LitElement
    implements UmbPropertyEditorUiElement
{
    @property({ type: String })
    public value = {};

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
        
        let location = config?.getValueByAlias<number>("location")
        var lat = location?.toString().split(",")[0].trim();
        var lng = location?.toString().split(",")[1].trim();
        this._latitude = Number(lat)  || 52.379189;
        this._longitude = Number(lng) || 4.899431;
        
        
    }
    
    async firstUpdated() {
        await import("https://maps.googleapis.com/maps/api/js?key=" + this._apiKey + "&v=beta");
         
        let val = { "lat": this._latitude, "lng": this._longitude, zoom: this._zoomLevel, maptype: this._mapType }
        
        if(this.value) {
            val = { "lat": this.value.lat, "lng": this.value.lng, zoom: this.value.zoom, maptype: this.value.maptype }
        }
        console.log(val);
        
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const map = new Map(this.shadowRoot?.getElementById("map") as HTMLElement, {
            center: { lat: val.lat, lng: val.lng },
            zoom: 14,
            mapId: "4504f8b37365c3d0"
        });

        this.marker = new AdvancedMarkerElement({
            map,
            position: { lat: val.lat, lng: val.lng },
            gmpDraggable: true
        });

        this.marker.addListener("dragend", this.dragend.bind(this));
        map.addListener("zoom_changed", () => {
            let zoomLevel = map.getZoom();
            this._zoomLevel = zoomLevel;
            console.log("zoom", zoomLevel);
            // save to value
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        });
    }

    dragend() {
        console.log("marker", this.marker.position);
        this._latitude = this.marker.position.lat;
        console.log("lat", this._latitude)
        this._longitude = this.marker.position.lng;
        console.log("lng", this._longitude)
        // save to value
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }
    
    render() {
        return html`
            <p>${JSON.stringify(this.value)}</p>
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