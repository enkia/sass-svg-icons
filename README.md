# SASS Background SVG Icons

### Usage:

**Add the _icons.scss file to your scss folder and import:**

``git clone git@enki.darkfires.com:/opt/git/icons.git``

`@import "icons/dist/icons";`

**Add the icon background to your scss files:**

`get-icon(name, color1, color2, color3)`

Example:

```scss

.button {
  background: #def get-icon(caret-down, #09c) 96% / 10% no-repeat;
}
```



### To Add a new icon:

1. Run gulp within the icons folder by typing `gulp` in the icons folder.

2. Open Illustrator (sample icons.ai in source folder) and fill a new icon with a color other than black so that a fill color is defined. Right click an icon, choose Export, select SVG, choose the following options and save to the ‘source’ folder.

   * **Style:** Presentation Attributes
   * **Object IDs:** Minimal
   * **Decimal:** 3
   * **Minify:** checked

3. Open _icons.scss and paste the URL encoded SVG string that **gulp copied to your clipboard** into the icons map.

4. Search for and find 'fill' in the encoded string and replace `%23[hex color code]` with `#{$icon_color}`, `#{$icon_color2}`, `#{$icon_color3}`, and so on.

   ​

   ​