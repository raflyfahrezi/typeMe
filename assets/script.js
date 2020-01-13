const text = 'Kegiatan belajar kini tidak hanya dilakukan di dalam kelas. Proses pembelajaran kini bisa dilakukan secara online. Sejumlah situs menyediakan program pembelajaran online, mulai dari yang berbayar hingga ada yang gratis. '
const text2 = 'Protein yang terkandung di dalam tempe ternyata lebih tinggi dibanding tahu. Menurut penelitian, tempe mengandung kadar protein sebesar 15,4 gram, sedangkan tahu hanya 10 gram saja. Hal itu disebabkan karena proses pembuatan tempe lebih sedikit dibanding dengan tahu. '
const text3 = "During the next five years, I started a company named Micro Service, another company named Pixar, and fell in love with an amazing woman who would become my wife. Pixar went on to create the world's first computer-animated feature film, Toy Story, and is now the most successful animation studio in the world. "
var splittedText
var pointer = 0
var reminder = 1
var globalMinutes = 0
var globalSeconds = 0
var interval
var stopBlink
var stopBlink2

const blinkEffects = () => {
    stopBlink = setInterval(() => {
        $(".blink").css("color", "#053f5e")
        setTimeout(() => {
            $(".blink").css("color", "white")
        }, 500);
    }, 1000);
}

const firstButton = () => {
    clearInterval(stopBlink)
    construct(text)
    $('.welcome').fadeOut('fast');
    setTimeout(() => {
        showBox()
    }, 1000);
}

const nextStage = () => {
    switch (reminder) {
        case 2:
                closeFinalResult()
                construct(text2)
                setTimeout(() => {
                    showBox()    
                }, 1000);
            break;
        case 3:
                closeFinalResult()
                construct(text3)
                setTimeout(() => {
                    showBox()
                }, 1000);
            break;
        default:
            break;
    }
}

const showBox = () => {
    $('.box').fadeIn('fast');
    $('.timer').fadeIn('fast');
    setTimeout(() => {
        startTimer()
    }, 1000);
}

const closeBox = () => {
    stopTimer()
    $('.box').fadeOut('fast')
    $('.timer').fadeOut('fast')
}

const showFinalResult = () => {
    setResult(getResult())
    $('.finish').fadeIn('fast')
    $('.nextStage').fadeIn('fast')
}

const closeFinalResult = () => {
    $('.finish').fadeOut('fast')
    $('.nextStage').fadeOut('fast')
}

const end = () => {
    setResult(getResult())
    $('.finish').fadeIn('fast')
}

const startTimer = () => {
    let minute = 0
    let second = 0
    interval = setInterval(() => {
        second += 1
        if (second == 60) {
            minute += 1
            second = 0
        }
        document.getElementById('timer').innerText = minute + ' minutes   ' + second + ' seconds'
        globalMinutes = minute
        globalSeconds = second
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval)
}

const getResult = () => {
    return document.getElementById('timer').innerText
}

const setResult = (params) => {
    document.getElementById('timeResult').innerText = params 
}

const construct = (params) => {
    splittedText = params
    splittedText = splittedText.split(' ')
    document.getElementById('textToType').innerHTML = params
}

const getText = () => {
    return document.getElementById('textToType').innerHTML  
}

const setText = (params) => {
    document.getElementById('textToType').innerHTML = params
}

const moveHelper = (params) => {
    let textTemporary = getText()
    textTemporary = textTemporary.replace(`${splittedText[params]}` + ` `, `${splittedText[params].bold()}` + ` `)
    setText(textTemporary)
}

const countWPM = (paramsMinutes, paramsSeconds) => {
    let minutes = paramsMinutes
    let seconds = paramsSeconds
    let countText = text.replace(/\s+/g, '').length

    minutes += (seconds / 60)  
    countText = '' + ((countText / 5)/ minutes)
    countText = countText.substr(0, 2)

    return countText + ' Word Per Minute (WPM)'
}

const setWPM = () => {
    document.getElementById('wpmResult').innerText = countWPM(globalMinutes, globalSeconds)
}

blinkEffects()

$('.typeHere').on('input', function (evt) {
    let value = evt.target.value

    if (value === splittedText[pointer]) {
        document.getElementById('typeHere').value = ""
        moveHelper(pointer)
        pointer = pointer + 1
        if (pointer == splittedText.length-1) {
            pointer = 0
            closeBox()
            reminder += 1
            setTimeout(() => {
                if (reminder === 4) {
                    setWPM()
                    end()
                } else {
                    setWPM()
                    showFinalResult()   
                }
            }, 500);
        }
    } 
})