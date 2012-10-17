$enquete = jQuery('#enquete-form').enqueteFormBuilder({
    debug: true,
    minItem: 1,
    maxItem: 20
});

describe('jQuery.enqueteFormBuilder', function() {

    var testdata = {
    };

    it('default configuration', function() {
        expect($enquete.getConfig().debug).toBeTruthy();
        expect($enquete.getConfig().minItem).toEqual(1);
        expect($enquete.getConfig().maxItem).toEqual(20);
    });

    it('add item', function() {
        expect($enquete.getItems().length).toEqual(1);
        $enquete.addItem(true, 'test-1');
        expect($enquete.getItems().length).toEqual(2);
        $enquete.addItem(true, 'test-2');
        $enquete.addItem(true, 'test-3');
        expect($enquete.getItems().length).toEqual(4);
    });

    it('delete item', function() {
        $enquete.deleteItem('test-1');
        expect($enquete.getItems().length).toEqual(3);
    });

});
