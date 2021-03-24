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
    // Round of 16
    roundOne: [
      {
        "teams": [
          {"id": "a1"},
          {"id": "b2"}
        ],
        "nextGame": "roundTwo_0_0"
      },
      {
        "teams": [
          {"id": "c1"},
          {"id": "d2"}
        ],
        "nextGame": "roundTwo_0_1"
      },
      {
        "teams": [
          {"id": "e1"},
          {"id": "f2"}
        ],
        "nextGame": "roundTwo_1_0"
      },
      {
        "teams": [
          {"id": "g1"},
          {"id": "h2"}
        ],
        "nextGame": "roundTwo_1_1"
      },
      {
        "teams": [
          {"id": "b1"},
          {"id": "a2"}
        ],
        "nextGame": "roundTwo_2_0"
      },
      {
        "teams": [
          {"id": "d1"},
          {"id": "c2"}
        ],
        "nextGame": "roundTwo_2_1"
      },
      {
        "teams": [
          {"id": "f1"},
          {"id": "e2"}
        ],
        "nextGame": "roundTwo_3_0"
      },
      {
        "teams": [
          {"id": "h1"},
          {"id": "g2"}
        ],
        "nextGame": "roundTwo_3_1"
      }
    ],
    // Quarter Finals
    roundTwo: [
      {
        "teams": [
          {"id": "roundOne_1"},
          {"id": "roundOne_2"}
        ],
        "nextGame": "roundThree_0_0"
      },
      {
        "teams": [
          {"id": "roundOne_3"},
          {"id": "roundOne_4"}
        ],
        "nextGame": "roundThree_0_1"
      },
      {
        "teams": [
          {"id": "roundOne_5"},
          {"id": "roundOne_6"}
        ],
        "nextGame": "roundThree_1_0"
      },
      {
        "teams": [
          {"id": "roundOne_7"},
          {"id": "roundOne_8"}
        ],
        "nextGame": "roundThree_1_1"
      },
    ],
    // Semi Finals
    roundThree: [
      {
        "teams": [
          {"id": "roundTwo_1"},
          {"id": "roundTwo_2"}
        ],
        "nextGame": "roundFour_0_0"
      },
      {
        "teams": [
          {"id": "roundTwo_3"},
          {"id": "roundTwo_4"}
        ],
        "nextGame": "roundFour_0_1"
      }
    ],
    // Final
    roundFour: [
      {
        "teams": [
          {"id": "roundThree_1"},
          {"id": "roundThree_2"}
        ],
        "nextGame": "final"
      },
    ]
  },
  mutations: {
    updateUserGroupData: (state, groupData) => {
      state.userGroupData = groupData;
    },
    updateRoundOne: (state) => {
      // add correct teams to roundOne
      state.roundOne.forEach((game) => {
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
    updateGame: (state, payload) => {
      state[payload.round][payload.gameIndex].teams[payload.nextTeamIndex].code = payload.code;
      state[payload.round][payload.gameIndex].teams[payload.nextTeamIndex].name = payload.name;
    }
  },
  actions: {
  },
  modules: {
  }
})