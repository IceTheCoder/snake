# snake
**Demo**: https://icethecoder.github.io/snake/

**Main site (work in progress)**: https://icethecoder.github.io/

<img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/html5.svg" height="100"><img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/javascript.svg" height="100">

![image](https://github.com/IceTheCoder/snake/assets/115871297/dafde691-a809-44a9-a2b4-dde266b1dd6b)
![image](https://github.com/IceTheCoder/snake/assets/115871297/5bdb323d-9bbe-469a-ab17-6a85900795a3)
![image](https://github.com/IceTheCoder/snake/assets/115871297/51069374-5e67-481d-830d-4e50ef027495)
![image](https://github.com/IceTheCoder/snake/assets/115871297/f0699834-84a9-4478-9c0c-ac03eb57a574)

A very basic snake game, made in JavaScript with the Phaser game engine, featuring:
* **Controls**: Use arrow keys to navigate the snake within a grid.
* **Screen Wrapping**: The snake wraps around the screen when it goes through the edges.
* **Fruits**: The snake eats fruits when its head collides with them.
* **Growth**: The snake's length increases by 1 square for each fruit eaten.
* **Game Over**: A game over screen displaying the player's score and a restart button.

## Future features
- [X] Make the snake controllable with WASD
- [X] Make a proper game over screen
- [X] Add score tracking
- [X] Add high score tracking
- [X] Make the snake controllable on mobile
- [ ] Improve graphics
- [ ] Changeable snake head, snake body and fruit colours
- [ ] Custom snake width
- [ ] Custom grid width and height
And much more...

## What I learned
- Basic configuration of the Phaser game engine (canvas, sprites, keyboard controls, grid).
- Manipulating JavaScript classes to generate multiple sprite clones, using arrays to place these clones, and dynamically changing their positions.
- How to approach a problem, come up with a solution and then codify that solution and test it.
- Working with multiple scenes in Phaser.
- Loading a specific scene when a condition is met.
- Basic scene UI elements, such as text and buttons.
- Changing the content of a Phaser text UI element based on a variable.
- Enabling/disabling HTML elements or Phaser scenes.
- Waiting until a condition occurs in JavaScript.
- Using local storage.

## Setup
To get a local copy up and running, follow these simple steps

### Preparation
- Install [Git Bash](https://git-scm.com/downloads)  or [GitHub Desktop](https://desktop.github.com/). We'll use Git Bash to clone the repo and contribute in this guide, but you can also use GitHub Desktop.
- Get [Visual Studio Code](https://code.visualstudio.com/). We'll use VSCode's Live Server extension to run a local server.

### Installation
- Open Git Bash and navigate to the directory you want to clone the repo in using the [`cd` (change directory) command](https://stackoverflow.com/questions/8961334/how-to-change-folder-with-git-bash): `cd path/to/your/directory`.
- Run the following command to clone the repo: `git clone https://github.com/IceTheCoder/snake.git`.

### Running
- Open the repo's folder in VSCode:
  * Open VSCode.
  * File > Open Folder.
  * Navigate to and select the repo's folder.
- Install the Live Server extension:
  * Go to Extensions tab on the left site (or use the keyboard shorcut CTRL + SHIFT + X).
  * Search for Live Server.
  * Click 'Install' on the first result.
 - Run index.html with Live Server:
  * Go back to the Explorer tab in VSCode (CTRL + SHIFT + E).
  * Right-click on `index.html` > Open with Live Server.
  * The live server will load in your default browser.

### Contributing
- First of all, navigate to the repo's directory on your machine with the `cd` command: `cd path/to/your/directory`
- Create a new branch: `git checkout -b <branch-name>`.
- After making changes, commit them: `git commit -am <commit-message>`.
- Push your changes: `git push --set-upstream origin <branch-name>`.
- On the GitHub website, make a pull request from your branch.
- I will evaluate your pull request and decide your contributions should make it into the repo.

#### Note: If you have any questions, message me on GitHub!

## License
- This repo is licensed under the MIT License. In short, you can use any code from this repo, provided you include the exact copy of this repo's MIT license in your project. Read more [here](https://github.com/IceTheCoder/snake/blob/main/LICENSE).
