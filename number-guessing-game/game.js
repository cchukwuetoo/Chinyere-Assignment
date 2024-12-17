const readline = require('readline');

class NumberGuessingGame {
    constructor(minRange = 1, maxRange = 100) {
        this.minRange = minRange;
        this.maxRange = maxRange;
        this.secretNumber = this.generateRandomNumber();
        this.attempts = 0;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

      // Generate a random number within the specified range
  
    generateRandomNumber() {
        return Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
    }

    // Display welcome message and game instructions
    displayWelcomeMessage() {
        console.log(`Welcome to the Number Guessing Game!`);
        console.log(`Try to guess the secret number between ${this.minRange} and ${this.maxRange}`);
        console.log(`You will recieve hints if your guess is too high or too low.`);
    }

    // Validate user input
    validateInput(input) {
        const number = parseInt(input);
        if (isNaN(number)) {
            return { valid: false, message: ' Please enter a valid number!' };
        }
        if (number < this.minRange || number > this.maxRange) {
            return { 
                valid: false, 
                message: ` Number must be between ${this.minRange} and ${this.maxRange}!` 
            };
        }
        return { valid: true, number };
    }

    // Main game logic
    playGame() {
        this.displayWelcomeMessage();
        this.askGuess();
    }

    askGuess() {
        this.rl.question('Enter your guess: ', (input) => {
            const validationResult = this.validateInput(input);

            if (!validationResult.valid) {
                console.log(validationResult.message);
                this.askGuess();
                return;
            }

            const guess = validationResult.number;
            this.attempts++;

            if (guess === this.secretNumber) {
                this.handleWin();
            } else if (guess < this.secretNumber) {
                console.log(' Too low! Try a higher number.');
                this.askGuess();
            } else {
                console.log(' Too high! Try a lower number.');
                this.askGuess();
            }
        });
    }

    handleWin() {
        console.log(`
🎉 CONGRATULATIONS! 🎉
You guessed the number ${this.secretNumber} in ${this.attempts} attempts!

Your performance:
- ${this.attempts <= 5 ? '🏆 Excellent!' : this.attempts <= 10 ? '👍 Good job!' : '💪 You did it!'}
`);
        this.askToReplay();
    }

    askToReplay() {
        this.rl.question('Would you like to play again? (yes/no): ', (answer) => {
            const normalizedAnswer = answer.toLowerCase().trim();
            
            if (normalizedAnswer === 'yes' || normalizedAnswer === 'y') {
                console.clear();
                const newGame = new NumberGuessingGame(this.minRange, this.maxRange);
                newGame.playGame();
                this.rl.close();
            } else {
                console.log('Thanks for playing! Goodbye! 👋');
                this.rl.close();
            }
        });
    }
}

// Start the game
const game = new NumberGuessingGame(1, 50);
game.playGame();