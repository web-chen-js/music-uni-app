
import {baseUrl} from './config.js'
export  function topList(){
	return new Promise (function(resolve,reject){
		uni.request({
			url: `${baseUrl}/topList/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length  = 4;
				resolve(result) ;
			},
			fail: () => {},
			complete: () => {}
		});
	})
}


export function list(id){
	return uni.request({
		url: `${baseUrl}/top/list?id=${id}`,
		method: 'GET'
	});
}



export function songDetail(songId){
	return uni.request({
		url: `${baseUrl}/song/detail?ids=${songId}`,
		method: 'GET'
	});
}



export function songSimi(songId){
	return uni.request({
		url: `${baseUrl}/simi/song?id=${songId}`,
		method: 'GET'
	});
}


export function songComment(songId){
	return uni.request({
		url: `${baseUrl}/comment/music?id=${songId}`,
		method: 'GET'
	});
}

export function songLyric(songId){
	return uni.request({
		url: `${baseUrl}/lyric?id=${songId}`,
		method: 'GET'
	});
}


export function songUrl(songId){
	return uni.request({
		url: `${baseUrl}/song/url?id=${songId}`,
		method: 'GET'
	});
}

export function searchHot(){
	return uni.request({
		url: `${baseUrl}/search/hot/detail`,
		method: 'GET'
	});
}


export function searchWord(word){
	return uni.request({
		url: `${baseUrl}/search?keywords=${word}`,
		method: 'GET'
	});
}


export function searchSuggest(word){
	return uni.request({
		url: `${baseUrl}/search?keywords=${word}&type=mobile`,
		method: 'GET'
	});
}
