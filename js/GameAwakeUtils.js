var GameAwakeUtils = {};

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

function clone(objeto) {
	if (null == objeto || "object" != typeof objeto) return objeto;
	var copy = objeto.constructor();
	for (var attr in objeto) {
		if (objeto.hasOwnProperty(attr)) copy[attr] = objeto[attr];
	}
	return copy;
  }

function convertNome(nome) {
    return nome.normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll(" ","-")
}