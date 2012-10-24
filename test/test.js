

var $enquete = jQuery('#enquete-form-test-1').enqueteFormBuilder({
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




/*
var enqueteItems2 = [
    {"id":"7","title":"\u6027\u5225","type":"radio","index":"1","note":"","isNew":false,"isRequired":true,"isDeleted":false,"options":[{"id":"5","isNew":false,"isDeleted":false,"content":"\u5973\u6027"},{"id":"4","isNew":false,"isDeleted":false,"content":"\u7537\u6027"}]},
    {"id":"8","title":"\u8077\u696d","type":"text","index":"2","note":"","isNew":false,"isRequired":true,"isDeleted":false,"options":[{"id":"6","isNew":false,"isDeleted":false,"content":"\u5927\u5de5"}]},
    {"id":"9","title":"12345","type":"checkbox","index":"3","note":"","isNew":false,"isRequired":false,"isDeleted":false,"options":[{"id":"7","isNew":false,"isDeleted":false,"content":"1"},{"id":"8","isNew":false,"isDeleted":false,"content":"2"},{"id":"9","isNew":false,"isDeleted":false,"content":"3"}]},
    {"id":"11","title":"\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa URL","type":"text","index":"4","note":"","isNew":false,"isRequired":false,"isDeleted":false,"options":[{"id":"13","isNew":false,"isDeleted":false,"content":"1"},{"id":"14","isNew":false,"isDeleted":false,"content":"2"},{"id":"15","isNew":false,"isDeleted":false,"content":"3"}]},
    {"id":"10","title":"\u4f4f\u6240","type":"text","index":"5","note":"","isNew":false,"isRequired":false,"isDeleted":false,
        "options":[
            {"id":"10","isNew":false,"isDeleted":false,"content":"1"},{"id":"11","isNew":false,"isDeleted":false,"content":"2"},{"id":"12","isNew":false,"isDeleted":false,"content":"3"}
        ]
    }
];

var $enquete2 = jQuery('#enquete-form-test-2').enqueteFormBuilder({
    debug: true,
    minItem: 3,
    maxItem: 10,
    defaultItems: enqueteItems2
});

describe('jQuery.enqueteFormBuilder({defaultData})', function() {

    var testdata = {
    };

    it('getConfg', function() {
        expect($enquete2.getConfig().debug).toBeTruthy();
        expect($enquete2.getConfig().minItem).toEqual(3);
        expect($enquete2.getConfig().maxItem).toEqual(10);
    });

    it('addItem', function() {
        expect($enquete2.getItems().length).toEqual(enqueteItems2.length);
    });

    it('moveUpItem', function() {
        var beforeValue = $enquete2.getContents().eq(2)
            .find($enquete2.getClassName('form-type', true))
            .find(':selected').val();

        $enquete2.getItems().eq(2)
            .find($enquete2.getClassName('up-item', true)).click();

        var afterValue = $enquete2.getContents().eq(1)
            .find($enquete2.getClassName('form-type', true))
            .find(':selected').val();

        expect(afterValue).toEqual(beforeValue);
    });

    it('moveDownItem', function() {
        var beforeValue = $enquete2.getContents().eq(0)
            .find($enquete2.getClassName('form-type', true))
            .find(':selected').val();

        $enquete2.getItems().eq(0)
            .find($enquete2.getClassName('down-item', true)).click();

        var afterValue = $enquete2.getContents().eq(1)
            .find($enquete2.getClassName('form-type', true))
            .find(':selected').val();

        expect(afterValue).toEqual(beforeValue);
    });
});
*/


