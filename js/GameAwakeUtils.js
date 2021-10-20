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