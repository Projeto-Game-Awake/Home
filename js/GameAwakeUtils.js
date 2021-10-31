var GameAwakeUtils = {};

GameAwakeUtils.isMobile = function()
{
	'use strict';
	
	let device = false;
	
	function checkUserAgent (name)
	{
		if (navigator.userAgent.indexOf(name) != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if (checkUserAgent('Android'))
	{
		device	= true;
	}
	else if (checkUserAgent('iPhone') && !window.MSStream)
	{
		device	= true;
	}
	else if (checkUserAgent('Mac OS') || checkUserAgent('Macintosh'))
	{
		device = false;
	}
	else if (checkUserAgent('Windows'))
	{
		device = false;
	}

	return device;
}

function isMobile ()
{
	'use strict';
	
	let device = false;
	
	function checkUserAgent (name)
	{
		if (navigator.userAgent.indexOf(name) != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if (checkUserAgent('Android'))
	{
		device	= true;
	}
	else if (checkUserAgent('iPhone') && !window.MSStream)
	{
		device	= true;
	}
	else if (checkUserAgent('Mac OS') || checkUserAgent('Macintosh'))
	{
		device = false;
	}
	else if (checkUserAgent('Windows'))
	{
		device = false;
	}

	return device;
}

GameAwakeUtils.clone = function(objeto) {
	if (null == objeto || "object" != typeof objeto) return objeto;
	var copy = objeto.constructor();
	for (var attr in objeto) {
		if (objeto.hasOwnProperty(attr)) copy[attr] = objeto[attr];
	}
	return copy;
}
function clone(objeto) {
	if (null == objeto || "object" != typeof objeto) return objeto;
	var copy = objeto.constructor();
	for (var attr in objeto) {
		if (objeto.hasOwnProperty(attr)) copy[attr] = objeto[attr];
	}
	return copy;
}

GameAwakeUtils.convertNome = function convertNome(nome) {
    return nome.normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll(" ","-")
}

function convertNome(nome) {
    return nome.normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll(" ","-")
}

GameAwakeUtils.getJSONName = function(jogo) {
	if(jogo == null) {
		return 1;
	} else {
		return jogo;
	}
}

GameAwakeUtils.loadConfig = function(scene,jogo) {
	let json = scene.cache.json.get("jogo");
	if(json == null) {
		if(jogo == null) {
			alert("Parâmetro jogo não foi informado!");
		} else {
			alert("Jogo " + jogo + " não existe!");
		}
	}
	return json;
}