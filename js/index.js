const seconds = document.querySelector('.seconds')
const minutes = document.querySelector('.minutes')
const hours = document.querySelector('.hours')
const buttonStart = document.querySelector('.buttonStart')
const buttonStop = document.querySelector('.buttonStop')
const buttonReset = document.querySelector('.buttonReset')
const buttonPlusSeconds = document.querySelector('.buttonPlusSeconds')
const buttonPlusMinutes = document.querySelector('.buttonPlusMinutes')
const buttonPlusHours = document.querySelector('.buttonPlusHours')
const buttonMinusSeconds = document.querySelector('.buttonMinusSeconds')
const buttonMinusMinutes = document.querySelector('.buttonMinusMinutes')
const buttonMinusHours = document.querySelector('.buttonMinusHours')
const timeSet = document.querySelector('.time-set')
const cursorDot = document.querySelector('.cursor-dot')
const cursorOutline= document.querySelector('.cursor-outline')
const links = document.querySelectorAll('.link-item')
const timerEnd = document.querySelector('.timer-end')
const plusSec = document.querySelector('.plus-sec')
const buttons = document.querySelectorAll('.button')
const buttonclick = document.querySelector('.btnclick')
let interval;

let secondsValue = parseInt(seconds.innerText.replace(/[A-z]/gi, ''));
let minutesValue = parseInt(minutes.innerText.replace(/[A-z]/gi, ''));
let hoursValue = parseInt(hours.innerText.replace(/[A-z]/gi, ''));

document.addEventListener('mouseleave', () => {
    cursorOutline.animate({
        opacity: '0'
    }, {duration: 500, fill: 'forwards'})
    cursorDot.animate({
        opacity: '0'
    }, {duration: 500, fill: 'forwards'})
})

document.addEventListener('mouseenter', () => {
    cursorOutline.animate({
        opacity: '1'
    }, {duration: 1000, fill: 'forwards'})
    cursorDot.animate({
        opacity: '1'
    }, {duration: 1000, fill: 'forwards'})
})

function secondsAnim () {
    seconds.animate({
        color: '#5873cc',
    },{duration: 100, fill: 'forwards'})
    seconds.animate({
        color: '#000',
    },{duration: 1000, fill: 'forwards'})
}

function minutesAnim () {
    minutes.animate({
        color: '#5873cc',
    },{duration: 100, fill: 'forwards'})
    minutes.animate({
        color: '#000',
    },{duration: 1000, fill: 'forwards'})
}

function hoursAnim () {
    hours.animate({
        color: '#5873cc',
    },{duration: 100, fill: 'forwards'})
    hours.animate({
        color: '#000',
    },{duration: 1000, fill: 'forwards'})
}

function timerEndPlay () {
    timerEnd.play()
    timerEnd.currentTime = 0
}

function plusSecPlay () {
    plusSec.play()
    plusSec.currentTime = 0
}

function buttonPlay () {
    buttonclick.play()
    buttonclick.currentTime = 0
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttonPlay()
    })
})

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.animate({
            border: '2px solid #000',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px'
        }, {duration: 400, fill: 'forwards'})
        cursorDot.animate({
            opacity: '0',
        }, {duration:200, fill: 'forwards'})
    })

    link.addEventListener('mouseleave', () => {
        cursorOutline.animate({
            border: '2px solid #fff',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px'
        }, {duration: 200, fill: 'forwards'})
            cursorDot.animate({
            opacity: '1',
        }, {duration:200, fill: 'forwards'})
    })
})

document.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY

    cursorDot.style.top = `${y}px`
    cursorDot.style.left = `${x}px`

    cursorOutline.animate({
        top: `${y}px`,
        left: `${x}px`
    }, {duration: 1000, fill: 'forwards'})
})

function animateCursorClick () {
    cursorOutline.animate({
        width: '140px',
        height: '140px'
    }, {duration: 200, fill: 'forwards'})

    cursorOutline.animate({
        width: '80px',
        height: '80px'
    }, {duration: 600, fill: 'forwards'})
}

function animateCursorContext () {
    cursorOutline.animate({
        width: '40px',
        height: '40px'
    }, {duration: 200, fill: 'forwards'})

    cursorOutline.animate({
        width: '80px',
        height: '80px'
    }, {duration: 600, fill: 'forwards'})
}

function updateSeconds() {
    seconds.innerHTML = `${secondsValue} c`
}

function updateMinutes() {
    minutes.innerHTML = `${minutesValue} м`
}

function updateHours() {
    hours.innerHTML = `${hoursValue} ч`
}

function incrementSeconds() {
    ++secondsValue
    updateSeconds()

    if (secondsValue >= 60) {
        secondsValue = 0;
        updateSeconds()
        incrementMinutes() 
    }
}

function incrementMinutes() {
    ++minutesValue
    updateMinutes()

    if (minutesValue >= 60) {
        minutesValue = 0;
        updateMinutes()
        incrementHours()
    }
}

function incrementHours() {
    if (hoursValue < 23) {
        ++hoursValue
        updateHours()
    } 
}

function decrementSeconds() {
    if (secondsValue > 0) {
        --secondsValue
        updateSeconds()
    } else {
        if (minutesValue > 0) {
            --minutesValue
            updateMinutes()
            secondsValue = 59
            updateSeconds()
        } else {
            if (hoursValue > 0) {
                --hoursValue
                updateHours()
                minutesValue = 59
                updateMinutes()
                secondsValue = 59
                updateSeconds()
            }
        }
    }
    plusSecPlay()
}

function decrementMinutes() {
    if (minutesValue > 0) {
        --minutesValue
        updateMinutes()
    } else {
        if (hoursValue > 0) {
            --hoursValue
            updateHours()
            minutesValue = 59
            updateMinutes()
        }
    }
}

function decrementHours() {
    if (hoursValue > 0) {
        --hoursValue
        updateHours()
    } 
}

function timeSetAnimate () {
    timeSet.animate({
        transform: 'translateX(0%)',
        display: 'block' 
    }, {duration: 300, fill: 'forwards'})
    timeSet.animate({
        transform: 'translateX(200%)',
        display: 'none'
    }, {duration: 300, delay: 2000, fill: 'forwards'})
}

seconds.addEventListener('click', () => {
    secondsAnim()
    animateCursorClick()
    incrementSeconds()
    plusSecPlay()
})

seconds.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (secondsValue > 0 || minutesValue > 0 || hoursValue > 0) {
        secondsAnim()
        animateCursorContext()
        decrementSeconds()
        plusSecPlay()
    }
})

minutes.addEventListener('click', () => {
    minutesAnim()
    animateCursorClick()
    incrementMinutes()
    plusSecPlay()
})

minutes.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (minutesValue > 0 || hoursValue > 0) {
        minutesAnim()
        animateCursorContext()
        decrementMinutes()
        plusSecPlay()
    }
})

hours.addEventListener('click', () => {
    hoursAnim()
    animateCursorClick()
    incrementHours()
    plusSecPlay()
})

hours.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (hoursValue > 0) {
        hoursAnim()
        animateCursorContext()
        decrementHours()
        plusSecPlay()
    }
})

buttonPlusSeconds.addEventListener('click', incrementSeconds)
buttonPlusMinutes.addEventListener('click', incrementMinutes)
buttonPlusHours.addEventListener('click', incrementHours)
buttonMinusSeconds.addEventListener('click', decrementSeconds)
buttonMinusMinutes.addEventListener('click', decrementMinutes)
buttonMinusHours.addEventListener('click', decrementHours)

function startTimer() {
    if (secondsValue === 0 && minutesValue === 0 && hoursValue === 0) {
        if (!buttonStop.classList.contains('hidden')) {
            clearInterval(interval);
            buttonStop.classList.add('hidden');
            buttonStart.classList.remove('hidden');
            timerEndPlay()
            return;
        }
    }
    decrementSeconds();
}

buttonStart.addEventListener('click', () => {
    clearInterval(interval);
    if (secondsValue !== 0 || minutesValue !== 0 || hoursValue !== 0) {
        buttonStop.classList.toggle('hidden');
        buttonStart.classList.toggle('hidden');
        interval = setInterval(startTimer, 1000);
    } else {
        timeSetAnimate();
    }
});

buttonStop.addEventListener('click', () => {
    clearInterval(interval);
    buttonStop.classList.toggle('hidden');
    buttonStart.classList.toggle('hidden');
});

buttonReset.addEventListener('click', ()=> {
    secondsAnim()
    minutesAnim()
    hoursAnim()
    clearInterval(interval);
    buttonStop.classList.add('hidden')
    buttonStart.classList.remove('hidden')
    minutesValue = 0;
    hoursValue = 0;
    secondsValue = 0;
    updateSeconds();
    updateMinutes();
    updateHours();
})