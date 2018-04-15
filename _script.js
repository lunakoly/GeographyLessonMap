const MISCLICK = 3

const infoTitle = document.getElementById('info-title')
const infoReason = document.getElementById('info-reason')
const infoResult = document.getElementById('info-result')
const infoDescription = document.getElementById('info-description')

////////// DEGUB //////////
let logClickCoordinates = true


bg.addEventListener('mousedown', (e) => {
    const x = e.clientX / bg.offsetWidth * 100
    const y = (e.clientY + document.body.scrollTop) / bg.offsetHeight * 100
    info.style.left = '-100%'
    info.style.top = '-100%'
    info.style.opacity = '0'

    if (logClickCoordinates)
        console.log(`x: ${x} %\ny: ${y} %`)

    for (let it in data) {
        if ((x - data[it].x) * (x - data[it].x) +
            (y - data[it].y) * (y - data[it].y) < MISCLICK) {
            spawnInfo(data[it])
        }
    }
})


function spawnInfo(region) {
    infoTitle.innerText = region.title
    infoReason.innerText = region.reason
    infoResult.innerText = region.result
    infoDescription.innerText = region.description

    let y = region.y / 100 * bg.offsetHeight
    let x = region.x / 100 * bg.offsetWidth

    if (y + info.offsetHeight > window.innerHeight)
        y = window.innerHeight - info.offsetHeight

    if (x + info.offsetWidth > window.innerWidth)
        x = window.innerWidth - info.offsetWidth

    info.style.top = y
    info.style.left = x

    info.style.opacity = '1'
}
