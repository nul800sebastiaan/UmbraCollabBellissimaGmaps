import { property as l, customElement as m, LitElement as d, html as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as h } from "@umbraco-cms/backoffice/property-editor";
var v = Object.defineProperty, u = Object.getOwnPropertyDescriptor, n = (t, r, s, a) => {
  for (var e = a > 1 ? void 0 : a ? u(r, s) : r, o = t.length - 1, p; o >= 0; o--)
    (p = t[o]) && (e = (a ? p(r, s, e) : p(e)) || e);
  return a && e && v(r, s, e), e;
};
let i = class extends d {
  constructor() {
    super(...arguments), this.value = "";
  }
  async firstUpdated() {
    await import("https://maps.googleapis.com/maps/api/js?key=AIzaSyBpkGr_Bf9gxIXWEoBVvMbVZMv7HCXWE3U&v=beta");
    let t = { lat: 55.406355270388346, lng: 10.389076778724018 };
    this.value && (t = JSON.parse(this.value));
    const { Map: r } = await google.maps.importLibrary("maps"), { AdvancedMarkerElement: s } = await google.maps.importLibrary("marker"), a = new r(this.shadowRoot.getElementById("map"), {
      center: { lat: t.lat, lng: t.lng },
      zoom: 14,
      mapId: "4504f8b37365c3d0"
    });
    this.marker = new s({
      map: a,
      position: { lat: t.lat, lng: t.lng },
      gmpDraggable: !0
    }), this.marker.addListener("dragend", this.dragend.bind(this));
  }
  dragend() {
    console.log("marker", this.marker.position), this.value = this.marker.position, this.dispatchEvent(new h());
  }
  render() {
    return g`
            <p>${this.value}</p>
            <div style="height:300px; width:100%;" id="map"></div>
        `;
  }
};
n([
  l({ type: String })
], i.prototype, "value", 2);
i = n([
  m("gmaps-property-editor-ui")
], i);
const f = i;
export {
  i as GmapsPropertyEditorUIElement,
  f as default
};
//# sourceMappingURL=Our.Umbraco.Gmaps.js.map
