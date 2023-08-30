import { TicTacToe } from "./TicTacToe.js";
import { predict, loadModel } from "./model.js";

const options = document.querySelector(".options");
const main = document.querySelector(".main");
const cover = document.querySelector(".cover");
const restartBtn = document.querySelector("#restart");

loadModel().then(() => {
    document.querySelector('.loading').style.display = 'none';
    options.style.display = "flex";

})




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


for (const option of options.childNodes) {
    option.addEventListener("click", () => {
        ticTacToe.restart();
        let player = option.getAttribute("value");
        if (player == -1) {
            // predict(ticTacToe.board)
            //     .then((result) => { makeMove(buttons[result]); })
            makeMove(buttons[Math.floor(Math.random() * 9)]);
            

        }
        options.style.display = "none";
        cover.style.zIndex = -1;
        main.style.display = "grid";
        restartBtn.style.display = "block";
        
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
        if (state["winner"] != "Draw") {
            state["moves"].forEach(move => {
                buttons[move].classList.add("win_color");

            })
        }
        cover.style.zIndex = 1;
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

restartBtn.addEventListener("click", () => {
    options.style.display = "flex";
    restartBtn.style.display = "none";
    main.style.display = "none";
    
    ticTacToe.restart();
    updateboard(ticTacToe.board);

});
