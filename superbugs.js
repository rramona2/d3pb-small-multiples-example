// transpile to es5:
// install babel, babel-preset-2015 and (optionally) uglifyjs, then:
// `babel superbugs.js | uglifyjs -c -m > superbugs.min.js`

// load geojson and csvdata asynchrously, but only once
// https://github.com/simonwoerpel/load-spreadsheets-js
loadSpreadsheet('1dzbZkuUNCQ5OblONIygIXPVfK0UcizlaHS7p6Kg9MMo', 1, d => {
  const data = d

  // set defaults for each map, including geojson & csvdata
  d3.playbooks.barChart.defaults({
    data,
    width: 500,
    height: 250,
    color: '#800026',
    cssNamespace: 'superbugs-chart',
    responsiveSvg: true,
    xCol: 'id',
    yLabel: 'Resistance in %',
    getYDomain: () => [0, 80],
    yTicks: 4,
    yTransform: d => Number(d) || 0,
    margin: {
      top: 10,
      left: 20,
      bottom: 30,
      right: 0
    },
    drawExtra: C => {
      // fix xAxis tick rotation
      C.renderedXAxis.selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-1em')
        .attr('dy', '-.5em')
        .attr('transform', 'rotate(-90)')
    }
  })

  // function to render chart based on column name
  const renderChart = yCol => {

    // get metadata (see below)
    const meta = META_DATA[yCol]

    // add some infos around the chart
    const wrapper = d3.select('.main')
      .append('div')
        .attr('class', 'superbugs-chart__container')
        .attr('id', yCol)  // to render chart into this actual element
    const title = wrapper.append('div')
        .attr('class', 'superbugs-chart__title')
    title.append('h3').text(meta.title)
    // title.append('p').attr('class', 'subtitle').text(meta.subtitle)
    // title.append('p').attr('class', 'desc').text(meta.text)
    title.append('p').append('a').attr('href', meta.url).text('more info')

    // infobox
    wrapper.append('div').attr('id', 'infobox--' + yCol)

    // render actual chart
    const chart = d3.playbooks.barChart({yCol, elementId: yCol}).render().infobox({
      element: '#infobox--' + yCol,
      template: `<p><strong>{name}:</strong> {${yCol}} %</p>`
    })

    const infoDiv = wrapper.append('div').attr('class', 'superbugs-chart__info')

    // if (meta.euData) title.append('p').attr('class', 'eudata').text('EU: ' + meta.euData + ' %')

    infoDiv.append('p').attr('class', 'source').text('Source: ' + meta.source)

    return chart
  }

  // render chart for each column
  Object.keys(META_DATA).map(c => renderChart(c))

})


// metadata for each map
const META_DATA = {
  ecoli1: {
    title: 'E. coli – Cephalosporins',
    subtitle: 'Escherichia coli vs cephalosporins',
    text: 'Resistance to 3rd generation cephalosporins in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    euData: 12,
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-e-coli-cephalosporins/'
  },
  ecoli2: {
    title: 'E. coli – Fluoroquinolones',
    subtitle: 'Escherichia coli vs fluoroquinolones ',
    text: 'Resistance to fluoroquinolones in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    euData: 22.4,
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-e-coli-fluoroquinol/'
  },
  kp1: {
    title: 'Klebsiella pneumoniae – Cephalosporins',
    subtitle: 'Klebsiella pneumoniae vs cephalosporins',
    text: 'Resistance to 3rd generation cephalosporins in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    euData: 28,
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-klebsiella-cephalosporins/'
  },
  kp2: {
    title: 'Klebsiella pneumoniae – Carbapenems',
    subtitle: 'Klebsiella pneumoniae vs carbapenems',
    text: 'Resistance to carbapenems in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    euData: 7.3,
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-klebsiella-carbapenems/'
  },
  mrsa: {
    title: 'MRSA',
    subtitle: 'Staphylococcus aureus vs methicillin',
    text: 'MRSA in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    euData: 17.4,
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-mrsa/'
  },
  sp: {
    title: 'Streptococcus pneumoniae – Penicillin',
    subtitle: 'Streptococcus pneumoniae vs penicillin',
    text: 'Resistance to penicillin in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'ECDC Surveillance report 2014, except Poland (2013)',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-streptococcus-pneumoniae-penicillin/'
  },
  nts: {
    title: 'Salmonella – Fluoroquinolones',
    subtitle: 'Salmonella vs fluoroquinolones',
    text: 'Resistance to fluoroquinolones in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'WHO Surveillance report 2014',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-salmonella-fluoroquinolones/'
  },
  shigella: {
    title: 'Shigella – Fluoroquinolones',
    subtitle: 'Shigella vs fluoroquinolones',
    text: 'Resistance to fluoroquinolones in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'WHO Surveillance report 2014',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-shigella-fluoroquinolones/'
  },
  neisseria: {
    title: 'Neisseria gonorrhoea – Cephalosporins',
    subtitle: 'Neisseria gonorrhoea vs cephalosporins',
    text: 'Resistance to 3rd generation cephalosporins in percent. Of all infections with this bacterium, this percentage was resistant to this antibiotic.',
    source: 'WHO Surveillance report 2014',
    url: 'https://correctiv.org/en/investigations/superbugs/atlas/superbug-atlas-neisseria-gonorrhoea-cephalosporins/'
  }
}
