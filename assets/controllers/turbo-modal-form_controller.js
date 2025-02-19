import { Controller } from '@hotwired/stimulus';
import { Modal } from 'bootstrap';

export default class extends Controller {
    static targets = ['modal'];
    modal = null;

    connect() {
        document.addEventListener('turbo:before-fetch-response', (event) => {
            if (!this.modal || !this.modal._isShown) {
                return;
            }
            const fetchResponse = event.detail.fetchResponse;
            if (fetchResponse.succeeded && fetchResponse.redirected) {
                event.preventDefault();
                Turbo.visit(fetchResponse.location);
            }
        });
    }

    async openModal(event) {
        // var uri = element.dataset.uri;
        // var title = element.dataset.title;

        this.modal = new Modal(this.modalTarget);
        this.modal.show();
    }
}