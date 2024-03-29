import { createStore } from 'vuex'
// import Vue from 'vue'

export default createStore({
  state: {
    signedin: false,
    user: [],
    pointsPossible: 920,
    userGroupData: [],
    groupDataSaved: false,
    gameDataSaved: false,
    ogGroupData: [
      {
        "group": "a",
        "teams": [
          {"code": "qa", "name": "Qatar"},
          {"code": "ec", "name": "Ecuador"},
          {"code": "sn", "name": "Senegal"},
          {"code": "nl", "name": "Netherlands"},
        ]
      },
      {
        "group": "b",
        "teams": [
          {"code": "gb", "name": "England"},
          {"code": "ir", "name": "Iran"},
          {"code": "us", "name": "United States"},
          {"code": "wls", "name": "Wales"}
        ]
      },
      {
        "group":"c",
        "teams": [
          {"code": "ar", "name": "Argentina"},
          {"code": "sa", "name": "Saudi Arabia"},
          {"code": "mx", "name": "Mexico"},
          {"code": "pl", "name": "Poland"}
        ]
      },
      {
        "group":"d",
        "teams": [
          {"code": "fr", "name": "France"},
          {"code": "au", "name": "Australia"},
          {"code": "dk", "name": "Denmark"},
          {"code": "tn", "name": "Tunisia"}
        ]
      },
      {
        "group":"e",
        "teams": [
          {"code": "es", "name": "Spain"},
          {"code": "cr", "name": "Costa Rica"},
          {"code": "de", "name": "Germany"},
          {"code": "jp", "name": "Japan"}
        ]
      },
      {
        "group":"f",
        "teams": [
          {"code": "be", "name": "Belgium"},
          {"code": "ca", "name": "Canada"},
          {"code": "ma", "name": "Morocco"},
          {"code": "hr", "name": "Croatia"}
        ]
      },
      {
        "group":"g",
        "teams": [
          {"code": "br", "name": "Brazil"},
          {"code": "rs", "name": "Serbia"},
          {"code": "ch", "name": "Switzerland"},
          {"code": "cm", "name": "Cameroon"}
        ]
      },
      {
        "group":"h",
        "teams": [
          {"code": "pt", "name": "Portugal"},
          {"code": "gh", "name": "Ghana"},
          {"code": "uy", "name": "Uruguay"},
          {"code": "kr", "name": "South Korea"}
        ]
      }
    ],
    games: [
      {
        "round": 1,
        "gameId": "roundOne_0",
        "nextGame": "roundTwo_0_0",
        "teams": [
          {"id": "a1"},
          {"id": "b2"}
        ]
      },
      {
        "round": 1,
        "gameId": "roundOne_1",
        "nextGame": "roundTwo_0_1",
        "teams": [
          {"id": "c1"},
          {"id": "d2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_2",
        "nextGame": "roundTwo_1_0",
        "teams": [
          {"id": "e1"},
          {"id": "f2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_3",
        "nextGame": "roundTwo_1_1",
        "teams": [
          {"id": "g1"},
          {"id": "h2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_4",
        "nextGame": "roundTwo_2_0",
        "teams": [
          {"id": "b1"},
          {"id": "a2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_5",
        "nextGame": "roundTwo_2_1",
        "teams": [
          {"id": "d1"},
          {"id": "c2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_6",
        "nextGame": "roundTwo_3_0",
        "teams": [
          {"id": "f1"},
          {"id": "e2"}
        ],
      },
      {
        "round": 1,
        "gameId": "roundOne_7",
        "nextGame": "roundTwo_3_1",
        "teams": [
          {"id": "h1"},
          {"id": "g2"}
        ],
      },
      {
        "round": 2,
        "gameId": "roundTwo_0",
        "nextGame": "roundThree_0_0",
        "teams": [
          {"id": "roundOne_0"},
          {"id": "roundOne_1"}
        ],
      },
      {
        "round": 2,
        "gameId": "roundTwo_1",
        "nextGame": "roundThree_0_1",
        "teams": [
          {"id": "roundOne_2"},
          {"id": "roundOne_3"}
        ],
      },
      {
        "round": 2,
        "gameId": "roundTwo_2",
        "nextGame": "roundThree_1_0",
        "teams": [
          {"id": "roundOne_4"},
          {"id": "roundOne_5"}
        ],
      },
      {
        "round": 2,
        "gameId": "roundTwo_3",
        "nextGame": "roundThree_1_1",
        "teams": [
          {"id": "roundOne_6"},
          {"id": "roundOne_7"}
        ],
      },
      {
        "round": 3,
        "gameId": "roundThree_0",
        "nextGame": "roundFour_0_0",
        "teams": [
          {"id": "roundTwo_0"},
          {"id": "roundTwo_1"}
        ],
      },
      {
        "round": 3,
        "gameId": "roundThree_1",
        "nextGame": "roundFour_0_1",
        "teams": [
          {"id": "roundTwo_2"},
          {"id": "roundTwo_3"}
        ],
      },
      {
        "round": 4,
        "gameId": "roundFour_0",
        "nextGame": "final",
        "teams": [
          {"id": "roundThree_0"},
          {"id": "roundThree_1"}
        ],
      },
    ],
  },
  mutations: {
    // Update all groups with groupData passed in
    updateUserGroupData: (state, groupData) => {
      state.userGroupData = groupData;
    },

    // Reset all groupData to the default
    resetUserGroupData: (state) => {
      state.userGroupData = JSON.parse(JSON.stringify(state.ogGroupData));
    },

    // Update all games with gameData passed in
    updateGames: (state, gameData) => {
      state.games = gameData;
    },

    // Update all round one games and chain of games if something changes
    updateRoundOne: (state) => {
      // add correct teams to roundOne
      let roundOneGames = state.games.filter(game => game.round === 1);

      roundOneGames.forEach((game) => {
        game.teams.forEach(team => {
          let tSlice = team.id.slice('');
          let groupLetter = tSlice[0];
          let groupOrder  = tSlice[1] - 1;

          let teamGroup = state.userGroupData.filter(group => group.group === groupLetter);
          let teamData = teamGroup[0].teams[groupOrder];

          // check to see if we need to update the game first -- if we do set it to no winner or loser. if not do nothing.
          if (!(team.code == teamData.code)) {
            team.name = teamData.name;
            team.code = teamData.code;
            game.teams[0].isWinner = false;
            game.teams[1].isWinner = false;
            game.teams[0].isLoser = false;
            game.teams[1].isLoser = false;

            // clear chain of games
            // remove current/old winner from chain of games and add team to next game
            // Remove Team from all games
            let gameChain = getChainOfGames(game.nextGame, state.games);

            gameChain.forEach(game => {
                let gameArray = game.split('_');
                let gameId = gameArray[0] + '_' + gameArray[1];
                let teamIndex = gameArray[2];

                // Remove Team from Game
                // remove team
                let nextGame = state.games.filter(game => game.gameId == gameId);
                nextGame[0].teams[teamIndex].code = "";
                nextGame[0].teams[teamIndex].name = "";

                // remove winner or loser from teams
                nextGame[0].teams.forEach((team) => {
                  team.isWinner = false;
                  team.isLoser  = false;
                })
            })
          }
        })
      })
    },

    // =====================
    // addTeamToGame
    // required params:
    // * payload.round
    // * payload.gameIndex
    // * payload.teamIndex
    // * payload.code
    // * payload.name
    // =====================
    addTeamToGame: (state, payload) => {
      let game = state.games.filter(game => game.gameId === payload.round + '_' + payload.gameIndex);
      game[0].teams[payload.teamIndex].code = payload.code;
      game[0].teams[payload.teamIndex].name = payload.name;
    },

    // =====================
    // removeTeamFromGame
    // required params:
    // * payload.gameId
    // * payload.teamIndex
    // =====================
    removeTeamFromGame: (state, payload) => {
      // remove team
      let game = state.games.filter(game => game.gameId === payload.gameId);

      game[0].teams[payload.teamIndex].code = "";
      game[0].teams[payload.teamIndex].name = "";

      // remove winner or loser from teams
      game[0].teams.forEach((team) => {
        team.isWinner = false;
        team.isLoser  = false;
      })
    },

    // =====================
    // removeTeamFromGame
    // required params:
    // * payload.gameId
    // =====================
    removeTeamsFromGame: (state, payload) => {
      // remove teams and reset game
      let game = state.games.filter(game => game.gameId === payload.gameId);

      game[0].teams.forEach(team => {
        team.code = "";
        team.name = "";
        team.isWinner = false;
        team.isLoser  = false;
      })
    },

    // Change signedin state with passed in boolean
    updateSignin: (state, bool) => {
      state.signedin = bool;
    },

    // Change signedin state with passed in boolean
    updateUser: (state, userInformation) => {
      state.user = userInformation;
    },

    updateGameDataSaved: (state, bool) => {
      state.gameDataSaved = bool;
    },

    updateGroupDataSaved: (state, bool) => {
      state.groupDataSaved = bool;
    }
  },
  actions: {
  },
  modules: {
  }
})

// Get Chain of Games for team
function getChainOfGames(nextGame, allGames) {
  let gameChain = [nextGame];

  while (nextGame != "final") {
      let s = nextGame.split('_');
      let currentGameId = s[0] + '_' + s[1];
      let currentGame = allGames.filter(game => game.gameId === currentGameId);

      nextGame = currentGame[0].nextGame;

      if (nextGame != "final") {
          gameChain.push(nextGame);
      }
  }

  return gameChain;
}