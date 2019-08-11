$(document).ready(function () {

            var word = "";
            var wordGuess = [];
            var wrongGuess = [];
            var guessBomb = 0;
            var winCount = 1;
            var guess = "";

            function wordw() {
                var randomWords = ["rick", "michonne", "carl", "lucille", "negan", "walker", "hershel"];
                var raNum = Math.floor(Math.random() * 6);
                return randomWords[raNum];
            }

            function wordStart() {
                var wordLength = word.length;
                var wordL_ = "";
                var count = wordLength;

                while(count > 0) {
                    wordGuess.push(" _ ");
                    count -= 1;
                }
            }

            function winCountFunc() {
                var num = 0;
                var lettUsed = "";
                var count = word.length;

                while (count > 0) {
                    if (lettUsed.includes(word[count - 1])) {

                    } else {
                        num = +1;
                        lettUsed += word[count - 1];
                    }
                    count -= 1;
                }
                return num;
            }

            function start() {
                word = wordw();
                winCount = winCountFunc();

                guessBomb = word.length;
            }

            start();

            console.log(word);
            document.getElementById('mainGame').style.display='block';
            document.getElementById('Startbtn').style.display='none'

            document.getElementById("question").innerHTML = "Enter your first guess";

           wordStart();

            document.getElementById('RRguess').style.display = 'block';
           document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
           document.getElementById("wrongGuess").innerHTML = "Wrong Guesses: " + wrongGuess;
           document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessBomb;

           var x = document.getElementById("guess").maxLength;

        

        document.enterGuess() {
            var lett = document.getElementById("guess").value;
            document.getElementById("guess").value = "";

            if (lett.length === 1){
                var rightOnot = isRightOnot(lett);
                if (rightOnot == true) {
                    NewCW(lett);
                }
                else {
                    if(!wrongGuess.includes(lett)) {
                        console.log("hi");
                        wrongGuess.push(lett);
                    }
                    guessBomb -= 1;
                }
            }

            else if (lett.length < 1) {

            }

            else {
                guessBomb -= 1;
            }

            if (guessBomb <= 0) {
                gameLose()
            }

            if (winCount <= 0) {
                gameWin()
            }

            document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
            document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
            document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessBomb;

        }

        function isRightOnot(a) {
            var n = word.includes(a);
            return n;
        }

        function NewCW(letter) {
            var count = 0;
            winCount -= 1;

            while (count <= word.length -1) {
                if (letter === word[count]) {
                    if(wordGuess[count] === letter) {

                    }
                    else {

                    }

                    wordGuess[count] = letter;
                    count += 1;
                }

                else {
                    count += 1;
                }
            }
        }

        function gameLose() {
            document.getElementById('mainGame').style.display='none';
            document.getElementById('RRguess').style.display='none';
            document.getElementById('youLose').style.display='block';
            document.getElementById("correctWordWas").innerHTML = "The correct word was: " + word;

        }

        function gameWin() {
            document.getElementById('mainGame').style.display='none';
            document.getElementById('RRguess').style.display='none';
            document.getElementById('youWin').style.display='block';
        }

        function restart() {
            document.getElementById('mainGame').style.display='none';
            document.getElementById('RRguess').style.display='none';
            document.getElementById('youLose').style.display='none';
            document.getElementById('youWin').style.display='none';

            word = "";
            wordGuess = [];
            wrongGuess = [];
            guessBomb = 0;
            winCount = 1;
            guess = "";

            

        }



            // const maximuGuess = 10;
            // var gamePause = false;

            // var guessedLetters = [];
            // var guessingWord = [];
            // var wordMatches

            // var word = words[Math.floor(Math.random() * words.length)];

            // var answerArray = [];
            // for (var i = 0; i < word.length; i++) {
            //     answerArray[i] = "_";
            // }

            // var remainingLetters = word.length; 

            // while (remainingLetters > 0) {
            //     $("#AnswerArea").text(answerArray.join(" "));

            //     var guess = $("#Guessed").bind('keypress',guess
            //     // prompt("Guess a letter, or click Cancel to stop playing.");
            //     if (guess === null) {
            //         break;
            //     }


            //     else {
            //         for (var j = 0; j < word.length; j++) {
            //             if (word[j] === guess) {
            //                 answerArray[j] = guess;
            //                 remainingLetters--;
            //             }
            //         }
            //     }
            // }

            // $("#AnswerArea").append(answerArray);

            //Win! Display rick, fightscene display:none
            // alert("Good job! The answer was " + word);


            // document.getElementById("fightscene").src = "assets/images/rickbloody.jpg";

        });