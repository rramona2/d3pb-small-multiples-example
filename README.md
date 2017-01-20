# small multiples with d3-playbooks

This example demonstrates how to use [`d3-playbooks`](https://github.com/simonwoerpel/d3-playbooks) to render small multiples (e.g. bar charts) from a single [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1dzbZkuUNCQ5OblONIygIXPVfK0UcizlaHS7p6Kg9MMo/edit#gid=0) source.

See example: https://simonwoerpel.github.io/d3pb-small-multiples-example

## Load data only once

`d3-playbooks` accepts either data as urls to load asynchrously via the `dataUrl` attribute during initialization [(see documentation)](https://github.com/simonwoerpel/d3-playbooks) or `data` attribute directly where data is already present. Another feature of `d3-playbooks` is to define defaults for your chart(s) before render specific ones.

Wrapping these feautures into the async data loading callbacks is a way to render multiple charts without loading async data multiple times:

[(See full source)](https://github.com/simonwoerpel/d3pb-small-multiples-example/blob/master/superbugs.js)

[this script](https://github.com/simonwoerpel/load-spreadsheets-js) is used to get data from Google Spreadsheets.

```javascript
loadSpreadsheet('<key>', 1, data => {
  // set global defaults for each chart
  d3.playbooks.barChart.defaults({
    data,
    // more defaults like width / colors go here...
  })

  // render charts
  const chart1 = d3.playbooks.barChart({...}).render()
  const chart2 = d3.playbooks.barChart({...}).render()
  // ...

})
```

For further information, have a look at the documentation of [`d3-playbooks`](https://github.com/simonwoerpel/d3-playbooks).
