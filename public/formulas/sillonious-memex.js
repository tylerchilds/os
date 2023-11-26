// i channel my runic knowledge to commune with the ancestors and establish contact with the animals
import { doingBusinessAs } from './sillonious-brand.js'

const protocol = 'https://'
const locale = 'en_US'

const $ = module('sillonious-memex', {
  diskette: 0
})

const tiles = [
  {
    name: 'enter',
    label: '/sillonious-memex/tiles/enter/label.txt',
    styles: {
      'grid-area': 'enter',
      'place-self': 'start'
    }
  },
  {
    name: 'escape',
    label: '/sillonious-memex/tiles/escape/label.txt',
    styles: {
      'grid-area': 'escape',
      'place-self': 'end'
    }
  },
  {
    name: 'carousel',
    label: '/sillonious-memex/tiles/carousel/label.txt',
  },
  {
    name: 'shift',
    label: '/sillonious-memex/tiles/shift/label.txt',
    styles: {
      'grid-area': 'shift',
      'place-self': 'end'
    }
  },
  {
    name: 'tab',
    label: '/sillonious-memex/tiles/tab/label.txt',
    styles: {
      'grid-area': 'tab',
      'place-self': 'start'
    }
  }
]

const tileMap = tiles.reduce((map, tile) => {
  map[tile.name] = tile
  fetch(`/strings/${locale}/${tile.label}`)
    .then(res => res.text())
    .then(label => {
      $.teach({ [tile.label]: label })
    })
  return map
}, {})

$.draw((target) => {
  const { diskette } = $.learn()
  const bin = diskettes(target)
  const game = bin[diskette]

  const screen = doingBusinessAs[game]
    ? `<sillonious-brand host="${game}" preview="true"></sillonious-brand>`
    : `<iframe src="${protocol}${game}" title="${game}"></iframe>`

  target.innerHTML =`
    <button name="${tileMap.shift.name}">
      ${t(tileMap.shift.label)}
    <button name="${tileMap.enter.name}">
      ${t(tileMap.enter.label)}
    </button>
    <button name="${tileMap.tab.name}">
      ${t(tileMap.tab.label)}
    </button>
    <button name="${tileMap.escape.name}">
      ${t(tileMap.escape.label)}
    </button>
    </button>
    <div name="carousel">
      ${screen}
    </div>
  `
})

$.when('click', '[name="escape"]', () => {
  alert('minimize')
})

$.when('click', '[name="enter"]', () => {
  alert('maximize')
})

$.when('click', '[name="tab"]', (event) => {
  let { diskette } = $.learn()
  const count = diskettes(event.target).length
  diskette = (diskette + 1) % count
  $.teach({ diskette })
})

$.when('click', '[name="shift"]', () => {
  alert('enhance')
})

$.style(`
  & {
    display: grid;
    margin: 1rem 0;
    background: black;
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 1fr 1fr;
    max-height: 100vh;
    overflow: hidden;
    grid-template-areas:
      "${tileMap.shift.name} ${tileMap.enter.name}"
      "${tileMap.carousel.name} ${tileMap.carousel.name}"
      "${tileMap.tab.name} ${tileMap.escape.name}";
  }

  ${layout(tiles)}
`)

function layout(tiles) {
  return tiles.map((tile) => `
    & [name="${tile.name}"] {
      grid-area: ${tile.name};
      ${bonusStyles(tile)}
    }
  `).join('')
}

function bonusStyles(tile) {
  return tiles.styles
    ? Object.keys(tile.styles).map(key => {
      debugger
      return `${key}: ${tile.styles[key]};`
    }).join('\n')
    : ''
}

function diskettes(target) {
  return target.closest($.link).getAttribute('bin').split('+')
}

function t(key) {
  return $.learn()[key]
}