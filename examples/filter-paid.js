const {getProfileAt} = require('..')

async function filterByPaid (names) {
  const list = await Promise.all(names.map(n => getProfileAt(n)))
  return list
    .filter(({demo}) => !demo)
    .map(({name}) => name)
}

filterByPaid(['Notch', 'KrisJelbring'])
  .then(console.log)
