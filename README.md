# React Playground

This repo is a place for me to experiment with React and any related technologies. The main purpose is to find the bounds of React and get comfortable using it, so most of the code is fairly ugly (though still readable, I'd hope).

## Getting Started

Most of the demos can be viewed by running the .html file inside their folder.

For development, first install `node` and `npm`, and then run the following commands:

    npm install
    bower install
    grunt

That will run through some grunt tasks and run the watch task that monitors files for changes.

## GitHub Pages

This repo is also mirrored to GitHub Pages. The index page is yet to be worked on, but in the mean time you can find a list of interesting pages below:

##### Games
* [Hangman](http://mrbeardy.github.io/react-playground/playground/games/hangman) - Your run-of-the-mill hangman game.

##### Misc
* [Component Examples](playground/misc/component-examples) - This is examples of [re-usable UI components](plaground/common/components/) I was experimenting with.

## Roadmap

#### General
* Remove the live-reload scripts from the index.html pages and add support for a server. Only reason I'm not already using a server is because I've had performance troubles in the past with node.js servers, where the page seems to hang until I press refresh a bunch of times to kick it into action. Accessing the files through file:// also seems to be tons faster, because the browser isn't having to actually download anything, File I/O is much faster then Net traffic, even with a local server.

* Alternative to above: Move the live-reload scripts into a common/ script that only runs through live-reload stuff if you're running locally.

#### Playground
##### Games
* **Wheel of Fortune** - The Wheel of Fortune mechanics should be similar to the Hangman game, but should ideally have improved graphics, AI, and a win/lose state. One neat feature would also be to interface with a dictionary API for the categories.

##### Misc
* **Rating Component** - A UI component that takes an icon and max-score as props and produces a "star rating" widget that stores the value when clicked, and displays the icons differently depending on the value.