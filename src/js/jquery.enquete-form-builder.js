/*!
 * jQuery Enquete Form Builder Plug-In
 * http://tetsuwo.tumblr.com/
 *
 * Copyright 2012, Tetsuwo OISHI
 * Dual licensed under the MIT license.
 *
 * Date: 2012-10-15
 */

;(function($) {
    $.fn.enqueteFormBuilder = function(options, messages) {
        var
        $root         = $(this),
        settings      = {},
        itemCounter   = 0,
        optionCounter = 0,
        pointer       = 0;

        // extended setting object
        settings = $.extend({
            debug           : false,
            itemTitleChars  : 10,
            minItem         : 0,
            maxItem         : 10,
            minOption       : 0,
            maxOption       : 10,
            formNamePrefix  : 'enquete',
            classNamePrefix : 'jq-enquete-fb-'
        }, options);

        // extended message object
        messages = $.extend({
            title         : '質問文を入力してください。',
            deleteConfirm : '本当に削除しますか？'
        }, messages);

        /**
         * Debug
         *
         * @param  mixced
         * @return none
         */
        this.debug = function(a) {
            if (settings.debug) {
                console.log(a);
            }
        };

        /**
         * Get Configuration
         *
         * @return object
         */
        this.getConfig = function() {
            return settings;
        };

        /**
         * Set Pointer
         *
         * @param  int
         * @return int
         */
        this.setPointer = function(id) {
            self.debug('setPointer = ' + id);
            pointer = id;
            return self.getPointer();
        };

        /**
         * Get Pointer
         *
         * @return int
         */
        this.getPointer = function() {
            self.debug('getPointer = ' + pointer);
            return pointer;
        };

        /**
         * Validate Individual In Item
         *
         * @param  string
         * @param  string
         * @return bool
         */
        this.validateItem = function(itemId, dataName) {
            var $data = self.getItem(itemId)
                .find(self.getClassName('form-' + dataName, true));

            if (!$data || $data.val() == '') {
                self.setItem(itemId);
                $data.focus();
                alert(messages[dataName]);
                return false;
            }

            return true;
        };

        /**
         * Validate Item and Option
         *
         * @return bool
         */
        this.validateAll = function() {
            var isValid = true;

            self.getItems().each(function() {
                var itemId = $(this).attr('data-id');

                self.debug(1);

                if (!self.validateItem(itemId, 'title')) {
                    return isValid = false;
                }
            });

            return isValid;
        };

        /**
         * Load Default Data
         *
         * @param  object
         * @return none
         */
        this.loadDefaultData = function(data) {
            $.each(data, function(i) {
                self.addItem(true, this.id);
                self.applyItemContents(this.id, this);
            });
        };

        /**
         * Apply Item Title
         *
         * @param  string
         * @param  string
         * @return none
         */
        this.applyItemTitle = function(itemId, title) {
            self.getItem(itemId)
                .find(self.getClassName('title', true))
                .text(title.substr(0, settings.itemTitleChars));
        };

        /**
         * Apply Item Contents
         *
         * @param  string
         * @param  object
         * @return none
         */
        this.applyItemContents = function(itemId, data) {
            self.debug('applyItemContents');

            var $item = self.getItem(itemId);

            if (data.id) {
                $item.find('[name$="[id]"]').val(data.id);
            }

            if (data.title) {
                $item.find('[name$="[title]"]').val(data.title);
                self.applyItemTitle(itemId, data.title);
            }

            if (data.isRequired) {
                $item.find('[name$="[isRequired]"]').attr('checked', data.isRequired);
            }

            if (data.type) {
                $item.find('[name$="[type]"]').val(data.type);
            }

            if (typeof data.isNew === 'boolean') {
                $item.find('[name$="[isNew]"]').val(data.isNew ? '1' : '0');
            }

            if (typeof data.isDeleted === 'boolean') {
                $item.find('[name$="[isDeleted]"]').val(data.isDeleted ? '1' : '0');
            }

            if (data.note) {
                $item.find('[name$="[note]"]').val(data.note);
            }

            if (data.options && 0 < data.options.length) {
                self.applyOptions(itemId, data.options);
                self.toggleOption(itemId, data.type);
            }
        };

        /**
         * Apply Item Contents
         *
         * @param  string
         * @param  object
         * @return none
         */
        this.applyOptions = function(itemId, options) {
            self.debug('applyOptions');

            var
            $item   = self.getItem(itemId),
            $option = null;

            $.each(options, function(i) {
                self.addOption(itemId, true, this.id);

                $option = $item.find('[data-id="' + this.id + '"]');

                if (this.id) {
                    $option.find('[name$="[id]"]').val(this.id);
                }

                if (this.content) {
                    $option.find('[name$="[content]"]').val(this.content);
                }

                if (typeof this.isNew === 'boolean') {
                    $option.find('[name$="[isNew]"]').val(this.isNew ? '1' : '0');
                }

                if (typeof this.isDeleted === 'boolean') {
                    $option.find('[name$="[isDeleted]"]').val(this.isDeleted ? '1' : '0');
                }
            });
        };

        /**
         * Get Class Name
         *
         * @param  string
         * @param  bool
         * @return string
         */
        this.getClassName = function(val, dot) {
            return (dot ? '.' : '') + settings.classNamePrefix + val;
        };

        /**
         * Enable Item Form
         *
         * @param  string
         * @param  bool
         * @return string
         */
        this.enableItem = function(itemId, enabled) {
            self.getItem(itemId).find('input, select').attr('disabled', !enabled);
        };

        /**
         * Create Item No.
         *
         * @return int
         */
        this.createItemNumber = function() {
            return itemCounter;
        };

        /**
         * Create Item ID
         *
         * @return string
         */
        this.createItemId = function(num) {
            return 'new-item-' + num;
        };

        /**
         * Create Option No.
         *
         * @return int
         */
        this.createOptionNumber = function() {
            return optionCounter;
        };

        /**
         * Create Item ID
         *
         * @return string
         */
        this.createOptionId = function(num) {
            return 'new-option-' + num;
        };

        /**
         * Create Item Form Name
         *
         * @return string
         */
        this.createItemFormName = function(itemId) {
            return settings.formNamePrefix
                + '[' + itemId + ']';
        };

        /**
         * Replace Form Name
         *
         * @return string
         */
        this.replaceFormName = function($target, itemId, optionId) {
            var formNamePrefix = self.createItemFormName(itemId);

            $target.find('input, select').each(function() {
                $(this).attr('name',
                    $(this).attr('name')
                        .replace(/%baseName%/g, formNamePrefix)
                        .replace(/%optionId%/g, optionId)
                );
            });
        };

        /**
         * Add Item
         *
         * @param  bool
         * @param  string
         * @return none
         */
        this.addItem = function(specified, itemId) {
            self.debug('addItem');

            if (settings.maxItem && settings.maxItem <= self.getItems().length ) {
                return alert('質問は' + settings.maxItem + '個まで追加できます。');
            }

            var
            num    = self.createItemNumber(),
            itemId = specified === true ? itemId : self.createItemId(num);

            // copy item
            var $newItem = $root.find(self.getClassName('item-tmpl', true)).clone();
            $newItem
                .attr('data-id', itemId) // attach id
                .removeClass(self.getClassName('item-tmpl')) // removed tmpl class
                .addClass(self.getClassName('item')) // added item class
                .find('span').text(
                    $newItem.find('span').text()
                        .replace('%d', specified === true ? num : num + 1)
                );

            // append item menu
            $root.find(self.getClassName('items', true))
                .find('ul').eq(0).append($newItem);

            // copy content
            var $newContent = $root.find(self.getClassName('content-tmpl', true)).clone();
            $newContent
                .attr('data-id', itemId)
                .removeClass(self.getClassName('content-tmpl'))
                .addClass(self.getClassName('content'));

            // replace
            self.replaceFormName($newContent, itemId);

            // append item content
            $root.find(self.getClassName('contents', true))
                .find('ul').eq(0).append($newContent);

            // indicate
            self.setItem(itemId);
            self.enableItem(itemId, true);

            itemCounter++;
        };

        /**
         * Delete Item
         *
         * @return none
         */
        this.deleteItem = function(itemId) {
            self.debug('deleteItem');

            if (!confirm(messages.deleteConfirm)) {
                return false;
            }

            var $item = self.getItem(itemId);
            var $copy = $item.clone();
            $item.remove();

            $copy.removeClass(self.getClassName('item'));
            $copy.find('[name$="[isDeleted]"]').val(1);

            $root.find(self.getClassName('trashes', true)).append($copy);

            var $items = self.getItems();
            self.debug($items.eq(0));

            // if existing yet item, set its item
            if (0 < $items.length) {
                self.setItem($items.eq(0).attr('data-id'));
            }

            return false;
        };

        /**
         * Get All Items
         *
         * @param  string
         * @return object
         */
        this.getItems = function() {
            return $root.find(self.getClassName('item', true));
        };

        /**
         * Get Item
         *
         * @param  string
         * @return object
         */
        this.getItem = function(itemId) {
            return self.getItems().andSelf().find('[data-id=' + itemId + ']');
        };

        /**
         * Get Current Item
         *
         * @return object
         */
        this.getCurrentItem = function() {
            return self.getItem(pointer);
        };

        /**
         * Set Item
         *
         * @param  int
         * @return none
         */
        this.setItem = function(itemId) {
            // hide all & remove focus
            $root.find(self.getClassName('content', true)).hide();
            $root.find(self.getClassName('item-focus', true))
                .removeClass(self.getClassName('item-focus'));

            // show one
            var $target = self.getItem(itemId);
            $target.eq(0).addClass(self.getClassName('item-focus'));
            $target.show();

            self.setPointer(itemId);
        };

        /**
         * Get Current Position In All Items
         *
         * @param  int
         * @return int
         */
        this.getCurrentPositionInItems = function(itemId) {
            self.debug('getCurrentPositionInItems');

            var pos = 0;
            $root.find(self.getClassName('item', true)).each(function(i) {
                if ($(this).attr('data-id') == itemId) {
                    pos = i;
                    return false;
                }
            });

            self.debug('position = ' + pos);
            return pos;
        };

        /**
         * Move Up Item
         *
         * @param  int
         * @return none
         */
        this.moveUpItem = function(itemId) {
            self.debug('moveUpItem = ' + itemId);

            var position, $source, $destination;

            // preparing replace
            position     = self.getCurrentPositionInItems(itemId);
            $source      = self.getItems().eq(position);
            $destination = self.getItems().eq(position - 1);

            if (!position) {
                return false;
            }

            // replace go!
            $source.replaceWith($destination.clone());
            $destination.replaceWith($source.clone());
        };

        /**
         * Move Down Item
         *
         * @param  int
         * @return none
         */
        this.moveDownItem = function(itemId) {
            self.debug('moveDownItem = ' + itemId);

            var position, $source, $destination;

            // preparing replace
            position     = self.getCurrentPositionInItems(itemId);
            $source      = self.getItems().eq(position);
            $destination = self.getItems().eq(position + 1);

            if (!$destination.length) {
                return false;
            }

            // replace go!
            $source.replaceWith($destination.clone());
            $destination.replaceWith($source.clone());
        };

        /**
         * Get Options For Current Item
         *
         * @return object
         */
        this.getCurrentOptions = function() {
            return self.getCurrentItem().find(self.getClassName('option', true));
        };

        /**
         * Get Option
         *
         * @param  string
         * @return object
         */
        this.getOption = function(optionId) {
            return self.getCurrentOptions().andSelf().find('[data-id=' + optionId + ']');
        };

        /**
         * Add Option
         *
         * @param  bool
         * @param  string
         * @return none
         */
        this.addOption = function(itemId, specified, optionId) {
            self.debug('addOption');

            if (settings.maxOption && settings.maxOption <= self.getCurrentOptions().length ) {
                return alert('質問の選択肢は' + settings.maxOption + '個まで追加できます。');
            }

            var
            num      = self.createOptionNumber(),
            optionId = specified === true ? optionId : self.createOptionId(num);

            // copy item
            var $newOption = $root.find(self.getClassName('option-tmpl', true)).clone();
            $newOption
                .attr('data-id', optionId)
                .removeClass(self.getClassName('option-tmpl'))
                .addClass(self.getClassName('option'))
                .find('input').attr('disabled', false);

            // replace
            self.replaceFormName($newOption, itemId, optionId);

            // append option
            self.getCurrentItem()
                .find(self.getClassName('form-options', true))
                .find('ul').eq(0).append($newOption);

            optionCounter++;
        };

        /**
         * Delete Option
         *
         * @param  string
         * @return none
         */
        this.deleteOption = function(optionId) {
            self.debug('deleteOption');

            if (!confirm(messages.deleteConfirm)) {
                return false;
            }

            var $option = self.getOption(optionId);
            var $copy = $option.clone();
            $option.remove();

            $copy.removeClass(self.getClassName('form-option'));
            $copy.find('[name$="[isDeleted]"]').val(1);

            $root.find(self.getClassName('trashes', true)).append($copy);

            return false;
        };

        /**
         * Get Current Position In Options Of Each Item
         *
         * @param  int
         * @return int
         */
        this.getCurrentPositionInOptions = function(optionId) {
            self.debug('getCurrentPositionInOptions');

            var pos = 0;
            self.getCurrentItem().find(self.getClassName('option', true)).each(function(i) {
                if ($(this).attr('data-id') == optionId) {
                    pos = i;
                    return false;
                }
            });

            self.debug('position = ' + pos);
            return pos;
        };

        /**
         * Move Up Option
         *
         * @param  int
         * @return none
         */
        this.moveUpOption = function(optionId) {
            self.debug('moveUpOption = ' + optionId);

            var position, $source, $destination;

            // preparing replace
            position     = self.getCurrentPositionInOptions(optionId);
            $source      = self.getCurrentOptions().eq(position);
            $destination = self.getCurrentOptions().eq(position - 1);

            if (!position) {
                return false;
            }

            // replace go!
            $source.replaceWith($destination.clone());
            $destination.replaceWith($source.clone());
        };

        /**
         * Move Down Option
         *
         * @param  int
         * @return none
         */
        this.moveDownOption = function(optionId) {
            self.debug('moveDownOption = ' + optionId);

            var position, $source, $destination;

            // preparing replace
            position     = self.getCurrentPositionInOptions(optionId);
            $source      = self.getCurrentOptions().eq(position);
            $destination = self.getCurrentOptions().eq(position + 1);

            if (!$destination.length) {
                return false;
            }

            // replace go!
            $source.replaceWith($destination.clone());
            $destination.replaceWith($source.clone());
        };

        /**
         * Toggle Option
         *
         * @param  bool
         * @param  string
         * @return none
         */
        this.toggleOption = function(itemId, type) {
            self.debug('toggleOption');

            var
            $item    = self.getCurrentItem(),
            $options = $item.find(self.getClassName('form-options', true));

            switch(type.toUpperCase()) {
                case 'SELECT':
                case 'RADIO':
                case 'CHECKBOX':
                    if ($options.find('li').length < 1) {
                        self.addOption(itemId);
                    }

                    $options.show();
                    break;

                default:
                    $options.hide();
                    break;
            }
        };

        // settings
        this.debug(settings);

        // fix reserved-variable
        self = this;

        // default data
        if (settings.defaultData) {
            this.debug('settings.defaultData');
            this.loadDefaultData(settings.defaultData);
        }

        $(function() {
            var
            $items        = self.getItems(),
            $DocumentRoot = $($root, document);

            // if no item, add new item
            if ($items.length < 1) {
                self.addItem();
            }

            // add item event handler
            $root.find(self.getClassName('add-item', true)).click(function(e) {
                if (self.validateAll()) {
                    self.addItem();
                }
            });

            // add option event handler
            $DocumentRoot
                .off('click', self.getClassName('add-option', true))
                .on('click', self.getClassName('add-option', true), function() {
                    self.addOption($(this).parent().parent().attr('data-id'));
                });

            // click item
            $DocumentRoot
                .off('click', self.getClassName('item', true))
                .on('click', self.getClassName('item', true), function(e) {
                    if (self.validateAll()) {
                        self.setItem($(this).attr('data-id'));
                    }
                });

            // click move up item
            $DocumentRoot
                .off('click', self.getClassName('up-item', true))
                .on('click', self.getClassName('up-item', true), function(e) {
                    self.moveUpItem($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // click move down item
            $DocumentRoot
                .off('click', self.getClassName('down-item', true))
                .on('click', self.getClassName('down-item', true), function(e) {
                    self.moveDownItem($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // click delete item
            $DocumentRoot
                .off('click', self.getClassName('del-item', true))
                .on('click', self.getClassName('del-item', true), function(e) {
                    self.deleteItem($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // click move up option
            $DocumentRoot
                .off('click', self.getClassName('up-option', true))
                .on('click', self.getClassName('up-option', true), function(e) {
                    self.moveUpOption($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // click move down option
            $DocumentRoot
                .off('click', self.getClassName('down-option', true))
                .on('click', self.getClassName('down-option', true), function(e) {
                    self.moveDownOption($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // click delete option
            $DocumentRoot
                .off('click', self.getClassName('del-option', true))
                .on('click', self.getClassName('del-option', true), function(e) {
                    self.deleteOption($(this).parent().attr('data-id'));
                    e.stopPropagation();
                });

            // change form item title
            $DocumentRoot
                .off('change', self.getClassName('form-title', true))
                .on('change', self.getClassName('form-title', true), function() {
                    var
                    itemId = $(this).parent().parent().attr('data-id'),
                    title  = $(this).val();

                    if (!self.validateItem(itemId, 'title')) {
                        return false;
                    }

                    self.applyItemTitle(itemId, title);
                });

            // change form type
            $DocumentRoot
                .off('change', self.getClassName('form-type', true))
                .on('change', self.getClassName('form-type', true), function() {
                    var
                    id   = $(this).parent().parent().attr('data-id'),
                    type = $(this).val();

                    self.toggleOption(id, type);
                });
        });

        return this;
    };
})(jQuery);
