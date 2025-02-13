import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['ajaxReloadContent'];

    static values = {
        url: String,
    }

    async refreshContent(event) {
        const response = await fetch(this.urlValue);
        this.ajaxReloadContentTarget.innerHTML = await response.text();
    }
}