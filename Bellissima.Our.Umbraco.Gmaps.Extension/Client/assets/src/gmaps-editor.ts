import { LitElement, html, customElement, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";

@customElement("my-suggestions-property-editor-ui")
export class MySuggestionsPropertyEditorUIElement
    extends LitElement
    implements UmbPropertyEditorUiElement
{
    @property({ type: String })
    public value = "";

    render() {
        return html`
            <uui-input 
                    .value="${ this.value ?? "" }" 
                    @input="${this.onInput}"></uui-input>
        `;
    }
    
    onInput(evt:InputEvent) {
        const val = (evt?.target as HTMLInputElement).value;
        this.value = val;
        this.dispatchEvent(new CustomEvent('property-value-change'));
    }
}

export default MySuggestionsPropertyEditorUIElement;

declare global {
    interface HTMLElementTagNameMap {
        "my-suggestions-property-editor-ui": MySuggestionsPropertyEditorUIElement;
    }
}