import { property as l, customElement as a, LitElement as v, html as m } from "@umbraco-cms/backoffice/external/lit";
var c = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (e, r, s, u) => {
  for (var t = u > 1 ? void 0 : u ? g(r, s) : r, o = e.length - 1, p; o >= 0; o--)
    (p = e[o]) && (t = (u ? p(r, s, t) : p(t)) || t);
  return u && t && c(r, s, t), t;
};
let n = class extends v {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return m`
            <uui-input 
                    .value="${this.value ?? ""}" 
                    @input="${this.onInput}"></uui-input>
        `;
  }
  onInput(e) {
    const r = (e == null ? void 0 : e.target).value;
    this.value = r, this.dispatchEvent(new CustomEvent("property-value-change"));
  }
};
i([
  l({ type: String })
], n.prototype, "value", 2);
n = i([
  a("my-suggestions-property-editor-ui")
], n);
const h = n;
export {
  n as MySuggestionsPropertyEditorUIElement,
  h as default
};
//# sourceMappingURL=Our.Umbraco.Gmaps.js.map
