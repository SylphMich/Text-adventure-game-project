const textElement = document.getElementById('text')
const optionsButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id ===textNodeIndex)
    textElement.innerText = textNode.text
    while (optionsButtonsElement.firstChild) {
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionsButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1, 
        text: "You are god but it's too much work so you want to go on a vacation.",
        options: [
            {
                text: 'You bust the door open',
                setState: {brokenDoor:true},
                nextText: 3
            },
            {
                text: 'You keep on working',
                nextText: 2
            }
        ]
    },
    {
        id:2,
        text:"You've chosen primordial boredom over great adventures!You're a doofus"
    },
    {
        id:3,
        text:"You've escaped your office but a legion of angels fly at you to stop you.",
        options:[
            {
                text:"Punch the angels",
                nextText:4
            },
            {
                text:"Throw the door at the anngels",
                requiredState:(currentState) =>currentState.brokenDoor,
                setState: {brokenDoor:false},
                nextText:4
            },
            {
                text:"Run",
                nextText:5
            }
        ]
    }
]

startGame()