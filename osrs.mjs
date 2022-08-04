#! /usr/bin/env node
import open from 'open'
import fetch from 'node-fetch'
import yargs from 'yargs'

const CATEGORIES = [
  "Overall",
  "Attack",
  "Defense",
  "Strength",
  "Hitpoints",
  "Ranged",
  'Prayer',
  'Magic',
  'Cooking',
  'Woodcutting',
  'Fletching',
  'Fishing',
  'Firemaking',
  'Crafting',
  'Smithing',
  'Mining',
  'Herblore',
  'Agility',
  'Thieving',
  'Slayer',
  'Farming',
  'Runecrafting',
  'Hunter',
  'Construction',
]

const {argv} = yargs(process.argv);

const username = process.argv[2];
let rawData = null;
let sortedData = null;
let counter = 0;

if(!username) {
  console.log("Please enter a valid OSRS username.")
  process.exit(1);
}

if(argv.browser) {
  open(`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${username}`)
} else {
  const res = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`);
  rawData = await res.text();
  sortedData = rawData.split(/[\n,]+/);

  console.log("Skill - Rank - Level - XP");
  for(let i = 0; i < 72; i += 3) {
    console.log(`${CATEGORIES[counter]} | ${sortedData[i]} | ${sortedData[i+1]} | ${sortedData[i+2]}`);
    counter++;
  }
}


