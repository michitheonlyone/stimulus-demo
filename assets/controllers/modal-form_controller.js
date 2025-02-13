import { Controller } from '@hotwired/stimulus';
import { Modal } from 'bootstrap';
import $ from 'jquery';

export default class extends Controller {

    static targets = ['modal', 'modalBody'];

    connect() {
        this.modal = new Modal(this.modalTarget);
    }
    
    openModal(event) {
        var element = event.target;
        // workaround for icons
        if (!event.target.dataset.uri) {
            element = event.target.parentElement;
        }
        var uri = element.dataset.uri;
        var title = element.dataset.title;

        $('.modal').find('.modal-title').text(title);
        
        $.get(uri, function(data) {
            $('.modal').find('.modal-body').html(data);
        });

        console.log(uri)

        this.modal.show();
    }

    async submitForm(event) {
        event.preventDefault();
        const $form = $(this.modalBodyTarget).find('form');

        if (!$form[0].checkValidity()) {
            $form[0].reportValidity()
            return;
        }

        try {
            await $.ajax({
                url: $form.prop('action'),
                method: $form.prop('method'),
                data: $form.serialize(),
            });
            this.modal.hide();
            this.dispatch('success');
        } catch (e) {
            this.modalBodyTarget.innerHTML = e.responseText;
        }
    }
}