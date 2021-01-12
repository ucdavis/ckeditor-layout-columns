// Dialog window for Layout Columns

CKEDITOR.dialog.add('layout_columns', function (editor) {
  'use strict';

  function columnChange() {
    const dialog = this.getDialog();
    const columns = this.getValue();

    const twoColLayout = dialog.getContentElement( 'layout', 'twoColLayout' )
    const twoColLayoutDom = twoColLayout.getElement().getParent().getParent();
    const threeColLayout = dialog.getContentElement( 'layout', 'threeColLayout' )
    const threeColLayoutDom = threeColLayout.getElement().getParent().getParent();

    // Reset the default selected option.
    twoColLayout.reset();
    threeColLayout.reset();

    // Show and hide layout options depending on the number of columns selected.
    if (columns === '2') {
      twoColLayoutDom.show();
      threeColLayoutDom.hide();
    } else if (columns === '3') {
      threeColLayoutDom.show();
      twoColLayoutDom.hide();
    } else {
      twoColLayoutDom.hide();
      threeColLayoutDom.hide();
    }
  }

  return {
    title: 'Column Settings',
    minWidth: 400,
    minHeight: 100,
    contents: [
      {
        id: 'layout',
        label: 'Layout',
        elements: [
          {
            id: 'columns',
            type: 'radio',
            label: 'Number of Columns',
            items: [
              ['One', 1],
              ['Two', 2],
              ['Three', 3],
              ['Four', 4]
            ],

            onChange: columnChange,
            // When setting up this field, set its value to the "columns" value from widget data.
            // Note: columns values used in the widget need to be the same as those defined in the "items" array above.
            setup: function (widget) {
              this.setValue(widget.data.columns);
            },

            // When committing (saving) this field, set its value to the widget data.
            commit: function (widget) {
              widget.setData('columns', this.getValue());

              // Set the default layout if the count is 1 or 4
              if (widget.data.columns !== '2' && widget.data.columns !== '3') {
                widget.setData('layout', 'default');
              }
            }
          },
          {
            id: 'twoColLayout',
            type: 'select',
            label: 'Layout',
            default: 'default',
            items: [
              ['Evenly Spaced', 'default'],
              ['33-67', '33-67'],
              ['67-33', '67-33'],
              ['25-75', '25-75'],
              ['75-25', '75-25'],
            ],

            // When setting up this field, set its value to the "layout" value from widget data.
            // Note: layout values used in the widget need to be the same as those defined in the "items" array above.
            setup: function (widget) {
              if (typeof widget.data.layout !== "undefined" && widget.data.columns === '2') {
                this.setValue(widget.data.layout);
              }
            },

            // When committing (saving) this field, set its value to the widget data.
            commit: function (widget) {
              if (widget.data.columns === '2') {
                widget.setData('layout', this.getValue());
              }
            }
          },
          {
            id: 'threeColLayout',
            type: 'select',
            label: 'Layout',
            default: 'default',
            items: [
              ['Evenly Spaced', 'default'],
              ['25-50-25', '25-50-25'],
              ['25-25-50', '25-25-50'],
              ['50-25-25', '50-25-25'],
            ],

            // When setting up this field, set its value to the "layout" value from widget data.
            // Note: layout values used in the widget need to be the same as those defined in the "items" array above.
            setup: function (widget) {
              if (typeof widget.data.layout !== "undefined" && widget.data.columns === '3') {
                this.setValue(widget.data.layout);
              }
            },

            // When committing (saving) this field, set its value to the widget data.
            commit: function (widget) {
              if (widget.data.columns === '3') {
                widget.setData('layout', this.getValue());
              }
            }
          }
        ]
      },
      {
        id: 'spacing',
        label: 'Spacing',
        elements: [
          {
            id: 'gap',
            type: 'select',
            label: 'Gap size between columns',
            default: '3',
            items: [
              ['None', 0],
              ['Tiny', 1],
              ['Small', 2],
              ['Normal', 3],
              ['Medium', 4],
              ['Large', 5],
              ['Huge', 6]
            ],

            setup: function (widget) {
              if (typeof widget.data.gap !== "undefined") {
                this.setValue(widget.data.gap);
              }
            },

            // When committing (saving) this field.
            commit: function (widget) {
              widget.setData('gap', this.getValue());
            }
          },
          {
            id: 'cwidth',
            type: 'select',
            label: 'Container Widths',
            default: 'default',
            items: [
              ['Default', 'default'],
              ['Shrink', 'shrink'],
              ['Overflow', 'overflow'],
              ['Edge to Edge (Do not use on pages with sidebars)', 'full'],
            ],

            setup: function (widget) {
              if (typeof widget.data.cwidth !== "undefined") {
                this.setValue(widget.data.cwidth);
              }
            },

            // When committing (saving) this field.
            commit: function (widget) {
              widget.setData('cwidth', this.getValue());
            }
          },
          {
            id: 'vmargin',
            type: 'select',
            label: 'Vertical Margins - above and below the outside',
            default: '0',
            items: [
              ['None', 0],
              ['Tiny', 1],
              ['Small', 2],
              ['Normal', 3],
              ['Medium', 4],
              ['Large', 5],
              ['Huge', 6]
            ],

            setup: function (widget) {
              if (typeof widget.data.vmargin !== "undefined") {
                this.setValue(widget.data.vmargin);
              }
            },

            // When committing (saving) this field.
            commit: function (widget) {
              widget.setData('vmargin', this.getValue());
            }
          },
        ]
      },
      {
        id: 'advanced',
        label: 'Advanced',
        elements: [
          {
            id: 'force',
            type: 'checkbox',
            label: 'Force the columns to never collapse to single columns',

            setup: function (widget) {
              if (typeof widget.data.force !== "undefined") {
                this.setValue(widget.data.force);
              }
            },

            // When committing (saving) this field.
            commit: function (widget) {
              widget.setData('force', this.getValue());
            }
          },
          {
            id: 'customClass',
            type: 'text',
            label: 'Custom CSS Class',

            validate: function() {
              const className = this.getValue()
              if (className && className.charAt(0) === '.') {
                alert('Please remove the period "." from the beginning of the class name.')
                return false;
              }
            },

            setup: function (widget) {
              if (typeof widget.data.customClass !== "undefined") {
                this.setValue(widget.data.customClass);
              }
            },

            // When committing (saving) this field.
            commit: function (widget) {
              widget.setData('customClass', this.getValue());
            }
          }
        ]
      }
    ]
  };
});
