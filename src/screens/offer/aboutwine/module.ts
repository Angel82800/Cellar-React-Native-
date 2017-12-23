'use strict';

export function getWineryAbout(data)	{
	let wineryAbout = data.wineryAbout;
	return wineryAbout === undefined ? "" : wineryAbout;
}
