# Portfolio Website

Start local server: `py -m http.server` (python3)

To open up port to entire local network add `--bind 0.0.0.0`

The body `background` property is `#000` intentionally, not `#FFF`, do not get confuzzled!!!

## Implementation details

The background is first set to black, but then three seperate SVG images are layed one after the other vertically to add the other bands of color.

The slanted header boxes are done using the `transform: skew(*)` CSS property to get the angled shape. Much better than the previously used `clip-path` method.
