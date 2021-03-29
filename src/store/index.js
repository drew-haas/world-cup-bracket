import { createStore } from 'vuex'
import Vue from 'vue'

export default createStore({
  state: {
    userGroupData: [],
    userKnockoutData: [],
    ogGroupData: [
      {
        "group": "a",
        "teams": [
          {"code":"uy", "name": "Uruguay"},
          {"code":"ru", "name": "Russia"},
          {"code":"sa", "name": "Saudi Arabia"},
          {"code":"eg", "name": "Egypt"}
        ]
      },
      {
        "group": "b",
        "teams": [
          {"code":"es", "name": "Spain"},
          {"code":"pt", "name": "Portugal"},
          {"code":"ir", "name": "Iran"},
          {"code":"ma", "name": "Morocco"}
        ]
      },
      {
        "group":"c",
        "teams": [
          {"code":"fr", "name":"France"},
          {"code":"dk", "name": "Denmark"},
          {"code":"pe", "name": "Peru"},
          {"code":"au","name":"Australia"}
        ]
      },
      {
        "group":"d",
        "teams": [
          {"code":"hr","name":"Croatia"},
          {"code":"ar","name":"Argentina"},
          {"code":"ng","name":"Nigeria"},
          {"code":"is","name":"Iceland"}
        ]
      },
      {
        "group":"e",
        "teams": [
          {"code":"br","name":"Brazil"},
          {"code":"ch","name":"Switzerland"},
          {"code":"rs","name":"Serbia"},
          {"code":"cr","name":"Costa Rica"}
        ]
      },
      {
        "group":"f",
        "teams": [
          {"code":"se","name":"Sweden"},
          {"code":"mx","name":"Mexico"},
          {"code":"kr","name":"South Korea"},
          {"code":"de","name":"Germany"}
        ]
      },
      {
        "group":"g",
        "teams": [
          {"code":"be","name":"Belgium"},
          {"code":"gb","name":"England"},
          {"code":"tn","name":"Tunisia"},
          {"code":"pa","name":"Panama"}
        ]
      },
      {
        "group":"h",
        "teams": [
          {"code":"co","name":"Colombia"},
          {"code":"jp","name":"Japan"},
          {"code":"sn","name":"Senegal"},
          {"code":"pl","name":"Poland"}
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
    updateUserGroupData: (state, groupData) => {
      state.userGroupData = groupData;
    },
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

            team.name = teamData.name;
            team.code = teamData.code;
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
    // * payload.teamCode
    // =====================
    removeTeamFromGame: (state,payload) => {
      // remove team
      let game = state.games.filter(game => game.gameId === payload.gameId);

      // If the team code doesn't match we don't want to remove
      // if (game[0].teams[payload.teamIndex].code != payload.teamCode) {
      //   return;
      // }

      game[0].teams[payload.teamIndex].code = "";
      game[0].teams[payload.teamIndex].name = "";

      // remove winner or loser from teams
      game[0].teams.forEach((team) => {
        team.isWinner = false;
        team.isLoser  = false;
      })
    }
  },
  actions: {
  },
  modules: {
  }
})