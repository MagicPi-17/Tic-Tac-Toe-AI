import { TicTacToe } from "./TicTacToe.js";
import { predict, loadModel } from "./model.js";



document.querySelector('.loading');



setTimeout(
    loadModel()
    .then(document.querySelector('.loading').style.display = 'none')
    ,2000);




const ticTacToe = new TicTacToe();
const buttons = document.querySelectorAll(".grid-item");

function updateboard(board) {
    for (let i = 0; i < 9; i++) {
        if (board[i] == 1) {
            buttons[i].className = "grid-item fa-solid fa-x";
        }
        else if (board[i] == -1) {
            buttons[i].className = "grid-item fa-solid fa-o";
        }
        else {
            buttons[i].className = "grid-item";
        }
    }
}

const options_element = document.querySelector(".options");
const options_elements = document.querySelectorAll(".option");
const cover = document.querySelector(".cover");

for (const option of options_elements) {
    option.addEventListener("click", () => {
        ticTacToe.restart();
        let player = option.getAttribute("value");
        if (player == -1) {
            // predict(ticTacToe.board)
            //     .then((result) => { makeMove(buttons[result]); })
            makeMove(buttons[Math.floor(Math.random() * 9)]);
            

        }
        options_element.children[0].style.display = "none";
        options_element.children[1].style.display = "none";
        cover.style.zIndex = -1;
        
        updateboard(ticTacToe.board);

    })
}


async function makeMove(button) {
    let isVaildMove = ticTacToe.makeMove(button);
    if(!isVaildMove) {return false}
    updateboard(ticTacToe.board);
    let state = ticTacToe.isWinner();
    console.log(state);
    if (state["winner"] != null) {
        cover.style.zIndex = 1;
        if (state["winner"] != "Draw") {
            state["moves"].forEach(move => {
                buttons[move].classList.add("win_color");
                options_element.children[0].style.display = "flex";
                options_element.children[1].style.display = "flex";
            })
        }
        options_element.children[0].style.display = "flex";
        options_element.children[1].style.display = "flex";
        return false;

    }
    return true;
}

for (const button of buttons) {
    button.addEventListener("click", () => {
        makeMove(button)
        .then((result) => {
            if(result) {
                predict(ticTacToe.board)
                    .then((result) => { makeMove(buttons[result]);})    
            }   
        })
            
    });
}

const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
    options_element.children[0].style.display = "flex";
    options_element.children[1].style.display = "flex";
    ticTacToe.restart();
    updateboard(ticTacToe.board);
    cover.style.zIndex = 1;

});
