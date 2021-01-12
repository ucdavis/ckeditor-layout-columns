# CKEditor Layout Columns

layout_columns is a CKEditor 4 plugin for the CKEditor WYSIWYG.

It allows choosing 1-4 columns with other settings such as a custom class. Data is saved as a custom
html element `<layout-columns>`.

```html
<layout-columns columns="2" layout="33-67" custom-class="test-this" cwidth="full" force="true" gap="4" vmargin="1">
    <div slot="column1"></div>
    <div slot="column2"></div>
    <div slot="column3"></div>
    <div slot="column4"></div>
</layout-columns>
```

It is assumed that this custom element will be converted into the desired HTML
via a web component or output processing filter. 
