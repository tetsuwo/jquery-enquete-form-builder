$enquete = jQuery('#enquete-form').enqueteFormBuilder({
    debug: true,
    minItem: 1,
    maxItem: 20
});

describe('jQuery.enqueteFormBuilder', function() {

    var testdata = {
    };

    it('getConfg', function() {
        expect($enquete.getConfig().debug).toBeTruthy();
        expect($enquete.getConfig().minItem).toEqual(1);
        expect($enquete.getConfig().maxItem).toEqual(20);
    });

    it('addItem', function() {
        $enquete.getContents().eq(0)
            .find($enquete.getClassName('form-title', true)).val('AUTO-1').change();
        expect($enquete.getItems().length).toEqual(1);

        $enquete.addItem(true, 'test-1');
        $enquete.getItem('test-1')
            .find($enquete.getClassName('form-title', true)).val('TEST-1').change();
        expect($enquete.getItems().length).toEqual(2);

        $enquete.addItem(true, 'test-2');
        $enquete.getItem('test-2')
            .find($enquete.getClassName('form-title', true)).val('TEST-2').change();
        expect($enquete.getItems().length).toEqual(3);

        $enquete.addItem(true, 'test-3');
        $enquete.getItem('test-3')
            .find($enquete.getClassName('form-title', true)).val('TEST-3').change();
        expect($enquete.getItems().length).toEqual(4);

        $enquete.addItem(true, 'test-4');
        $enquete.getItem('test-4')
            .find($enquete.getClassName('form-title', true)).val('TEST-4').change();
        expect($enquete.getItems().length).toEqual(5);
    });

    it('moveUpItem', function() {
        var $target = $enquete.getContents().eq(2);
        $target
            .find($enquete.getClassName('form-type', true))
            .val('checkbox').change();

        $enquete.getItems().eq(2)
            .find($enquete.getClassName('up-item', true)).click();

        var afterValue = $enquete.getContents().eq(1)
            .find($enquete.getClassName('form-type', true))
            .find(':selected').val();

        expect(afterValue).toEqual('checkbox');
    });

    it('moveDownItem', function() {
        var $target = $enquete.getContents().eq(2);

        $target
            .find($enquete.getClassName('form-type', true))
            .val('radio').change();

        $enquete.getItems().eq(1)
            .find($enquete.getClassName('down-item', true)).click();

        var afterValue = $enquete.getContents().eq(1)
            .find($enquete.getClassName('form-type', true))
            .find(':selected').val();

        expect(afterValue).toEqual('radio');
    });

    it('deleteItem', function() {
        $enquete.deleteItem('new-item-0');
        expect($enquete.getItems().length).toEqual(4);
    });

});
