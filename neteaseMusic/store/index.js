
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
	state : {
		topList : [],
		nextId : ''
	},
	mutations : {
		INIT_CHANGE(state,payload){
			state.topList = payload;
		},
		NEST_ID(state,payload){
			for (let i = 0;i<state.topList.length;i++){
				if(state.topList[i].id = payload){
					state.nextId = state.topList[i+1].id
				}
			}
		}
	}
});