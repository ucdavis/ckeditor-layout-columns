(function ($) {
  'use strict';

  CKEDITOR.plugins.add('layout_columns', {
    requires: 'widget',

    // Register the icon used for the toolbar button. It must be the same
    // as the name of the widget.
    icons: 'layout_columns',
    hidpi: true,

    // Configure CKEditor DTD for custom drupal-entity element.
    // @see https://www.drupal.org/node/2448449#comment-9717735
    beforeInit: function (editor) {
      const dtd = CKEDITOR.dtd;

      dtd['layout-columns'] = {'div': 1};
      for (let tagName in dtd) {
        if (dtd[tagName].div) {
          dtd[tagName]['layout-columns'] = 1;
        }
      }
    },

    init: function (editor) {
      // Register the editing dialog.
      CKEDITOR.dialog.add('layout_columns', this.path + 'dialogs/layout_columns.js');

      // Add our plugin-specific CSS to style the widget within CKEditor.
      editor.addContentsCss(this.path + 'css/layout-columns.css');

      // Add toolbar button for this plugin.
      editor.ui.addButton('layout_columns', {
        label: 'Layout Columns',
        command: 'layout_columns',
        toolbar: 'insert,10',
        icon: this.path + 'icons/' + (CKEDITOR.env.hidpi ? 'hidpi/' : '') + 'layout_columns.png'
      });

      // Register the widget.
      editor.widgets.add('layout_columns', {
        // Create the HTML template
        template:
          '<layout-columns columns="1">' +
            '<div slot="column1"></div>' +
            '<div slot="column2"></div>' +
            '<div slot="column3"></div>' +
            '<div slot="column4"></div>' +
          '</layout-columns>',

        editables: {
          column1: {
            selector: '[slot="column1"]'
          },
          column2: {
            selector: '[slot="column2"]'
          },
          column3: {
            selector: '[slot="column3"]'
          },
          column4: {
            selector: '[slot="column4"]'
          }
        },

        // Prevent the editor from removing these elements
        allowedContent: 'layout-columns[!columns]; div(!slot)',

        // The minimum required for this to work
        requiredContent: 'layout-columns',

        // Convert any layout-columns element into this widget
        upcast: function (element) {
          return element.name === 'layout-columns';
        },

        // Set the widget dialog window name. This enables the automatic widget-dialog binding.
        // This dialog window will be opened when creating a new widget or editing an existing one.
        dialog: 'layout_columns',

        // When a widget is being initialized, we need to read the attributes
        // from DOM and set it by using the widget.setData() method.
        // More code which needs to be executed when DOM is available may go here.
        init: function () {
          // Get the columns from the columns attribute
          const columns = this.element.getAttribute('columns');
          if (columns) {
            this.setData('columns', columns);
          }

          // Get the Layout from the layout attribute
          const layout = this.element.getAttribute('layout');
          if (layout) {
            this.setData('layout', layout);
          }

          const gap = this.element.getAttribute('gap');
          if (gap) {
            this.setData('gap', gap);
          }

          const cwidth = this.element.getAttribute('cwidth');
          if (cwidth) {
            this.setData('cwidth', cwidth);
          }

          const vmargin = this.element.getAttribute('vmargin');
          if (vmargin) {
            this.setData('vmargin', vmargin);
          }

          const force = this.element.getAttribute('force');
          if (force && force === 'true') {
            this.setData('force', true);
          }

          const customClass = this.element.getAttribute('custom-class');
          if (customClass) {
            this.setData('customClass', customClass);
          }
        },

        // Listen on the widget#data event which is fired every time the widget data changes
        // and updates the widget's view.
        // Data may be changed by using the widget.setData() method
        data: function () {
          // Column count.
          this.element.setAttribute('columns', this.data.columns);

          // Layout type.
          if (typeof this.data.layout !== "undefined" && this.data.layout !== 'default') {
            this.element.setAttribute('layout', this.data.layout);
          } else {
            this.element.removeAttribute('layout');
          }

          // Gap spacing.
          if (typeof this.data.gap !== "undefined" && this.data.gap !== '3') {
            this.element.setAttribute('gap', this.data.gap);
          } else {
            this.element.removeAttribute('gap');
          }

          // Container width.
          if (typeof this.data.cwidth !== "undefined" && this.data.cwidth !== 'default') {
            this.element.setAttribute('cwidth', this.data.cwidth);
          } else {
            this.element.removeAttribute('cwidth');
          }

          // Vertical Margin.
          if (typeof this.data.vmargin !== "undefined" && this.data.vmargin !== '0') {
            this.element.setAttribute('vmargin', this.data.vmargin);
          } else {
            this.element.removeAttribute('vmargin');
          }

          // Force Columns.
          if (typeof this.data.force !== "undefined" && this.data.force !== false) {
            this.element.setAttribute('force', true);
          } else {
            this.element.removeAttribute('force');
          }

          // Custom Class.
          if (typeof this.data.customClass !== "undefined") {
            this.element.setAttribute('custom-class', this.data.customClass);
          } else {
            this.element.removeAttribute('custom-class');
          }
        }
      });
    }
  });
})(jQuery);
