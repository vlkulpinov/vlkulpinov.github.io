This project is according to Google Summer of Code, OSM "Add POI webapp"

===Add POI webapp===
This project uses:
  1. Open Street Map REST API (for notes)
  2. Leaflet.js for map visualization and working with geopoints
  3. typeahead.js for suggest
  4. Photon for geosearch
  5. MapBox for tiles

The workflow is simple:
  1. Provide fields for user to write some information about organization name, address (+ map), telephone number and website.
  2. After user clicks submit button application tries to create note on OSM Map through POST query

===Future improvements===
Actually this project is very simple and code is not clear (for speed up purposes). But it provide end-to-end workflow that can be improved

1. Improve UI to be clearful and understandable
2. Push user to write as much as possible information about organization. We can show some tips like "correct geopoint and address will increase number of customers for X%" and so on.
3. Provide export tool (from certain number of web-application to OSM) to help writting as much as possible information.
4. Auto-verification of inserted organizations, checking if organization has already exists.

===About author===
I'm Vladimir Kulpinov, 4 years' study bachelor from Moscow State University. I interested in Computer Vision, Machine Learning, my thesis is "Background Subtraction task using Convolutional Networks". Maps is my passion, I used to work at Yandex company (Maps department) and got a lot of programming skills
