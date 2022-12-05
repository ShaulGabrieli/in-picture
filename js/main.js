'use strict'

var gQuests = createQuests()
var gCurrQuestIdx = 0

function onInit() {
    renderQuest()
}

function createQuest() {
    var quest = {
        id: IdxId++,
        opts: [],
        correctOptIndex: 0,
    }
    return quest
}

function createQuests() {
    var quest1 = { id: 1, opts: ["It's Animals", "It's people"], correctOptIndex: 1 }
    var quest2 = { id: 2, opts: ["It's Woman", "It's Skull"], correctOptIndex: 0 }
    var quest3 = { id: 3, opts: ['Waterburger', 'What a burger'], correctOptIndex: 0 }
    var quest4 = { id: 4, opts: ['To break free', 'To ride my bicycle'], correctOptIndex: 0 }
    return [quest1, quest2, quest3, quest4]
}

function renderQuest() {
    var strHTML = ''
    const answers = gQuests[gCurrQuestIdx].opts
    strHTML = `<img src="photos/${gQuests[gCurrQuestIdx].id}.jpg" alt="" />
        <div class="flex-container">
            <div onclick="checkAnswer(this)" data=0 class="answer">${answers[0]}</div>`
    if (gCurrQuestIdx !== 3) {
        strHTML += `<div onclick="checkAnswer(this)" data=1 class="answer">${answers[1]}</div>
        </div>`
    } else {
        strHTML += `<div onclick="checkAnswer(this)" data=0 class="answer">${answers[1]}</div>
        </div>`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function checkAnswer(elAnswer) {
    const corretAnswerId = gQuests[gCurrQuestIdx].correctOptIndex
    const clickedlAnswer = +elAnswer.getAttribute('data')
    console.log('correct ans', corretAnswerId)
    console.log('clicked ans', clickedlAnswer)
    if (corretAnswerId === clickedlAnswer) {
        PlaySound('rightanswer-95219')
        play()
    } else {
        PlaySound('error-2-36058')
        const elBody = document.querySelector('body')
        const elHeader = document.querySelector('h1')
        elBody.style.backgroundImage = 'none'
        elHeader.style.backgroundColor = 'red'
        setTimeout(() => {
            const elBody = document.querySelector('body')
            const elHeader = document.querySelector('h1')
            elBody.style.backgroundImage = "url('./photos/back.jpg')"
            elHeader.style.backgroundColor = 'white'
        }, 100)
    }
}

function play() {
    gCurrQuestIdx++
    console.log('ddd', gCurrQuestIdx)
    // renderQuest()
    gCurrQuestIdx !== 4 ? renderQuest() : victory()
    if (gCurrQuestIdx === 3) {
        setTimeout(onOpenModal, 1000)
    }
}

function victory() {
    PlaySound('success-fanfare-trumpets-6185')
    var strHTML = ''
    strHTML = `<img src="photos/victory.jpg" />
        <div class="flex-container">
            <div onclick="playAgain()" class="answer">Play Again!</div>`
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function playAgain() {
    gCurrQuestIdx = 0
    renderQuest()
}

function onCloseModal() {
    var modal = document.querySelector('.modal')
    modal.style.display = 'none'
}

function onOpenModal() {
    var modal = document.querySelector('.modal')
    modal.style.display = 'inline-block'
    setTimeout(onCloseModal, 3000)
}

function PlaySound(sound) {
    var audio = new Audio('./sounds/' + sound + '.mp3')
    audio.play()
}
