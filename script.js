const MISCLICK = 3

const infoTitle = document.getElementById('info-title')
const infoReason = document.getElementById('info-reason')
const infoResult = document.getElementById('info-result')
const infoDescription = document.getElementById('info-description')

////////// DEGUB //////////
let logClickCoordinates = false


// for further access
const clickCircles = []
const clickPoint = []

// create clicking points
for (let it in data) {
    const clickPoint = document.createElement('div')
    clickPoint.style.left = data[it].x + '%'
    clickPoint.style.top = data[it].y * bg.offsetHeight / window.innerHeight + '%'
    clickPoint.className = 'clickPoint'
    document.body.append(clickPoint)
    clickPoint.src = data[it]

    clickCircles.push(clickPoint)

    clickPoint.addEventListener('mousedown', (e) => {
        spawnInfo(data[it])
    })

    const clickCircle = document.createElement('div')
    clickCircle.style.left = data[it].x + '%'
    clickCircle.style.top = data[it].y * bg.offsetHeight / window.innerHeight + '%'
    clickCircle.className = 'clickCircle'
    document.body.append(clickCircle)
    clickCircle.src = data[it]

    clickCircles.push(clickCircle)
}


// start pulse service
setInterval(() => {
    // reposition points if window size changes
    for (let that in clickPoint) {
        clickPoint[that].style.left = clickPoint[that].src.x + '%'
        clickPoint[that].style.top = clickPoint[that].src.y * bg.offsetHeight / window.innerHeight + '%'
    }

    for (let that in clickCircles) {
        const it = clickCircles[that]
        it.style.height = '0'
        it.style.width = '0'
        it.style.opacity = '1'
        it.style.transition = ''

        // reposition points if window size changes
        it.style.left = it.src.x + '%'
        it.style.top = it.src.y * bg.offsetHeight / window.innerHeight + '%'
    }

    setTimeout(() => {
        for (let that in clickCircles) {
            const it = clickCircles[that]
            it.style.height = '30px'
            it.style.width = '30px'
            it.style.opacity = '0'
            it.style.transition = 'all 1000ms ease'
        }
    })
}, 2000)


// remove info
bg.addEventListener('mousedown', (e) => {
    info.style.left = '-100%'
    info.style.top = '-100%'
    info.style.opacity = '0'

    const x = e.clientX / bg.offsetWidth * 100
    const y = (e.clientY + document.body.scrollTop) / bg.offsetHeight * 100

    if (logClickCoordinates)
        console.log(`x: ${x} %\ny: ${y} %`)
})


// open info
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
