import React, { ReactElement, useEffect, useState } from 'react'


export const LogoutBoard = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('token');
	localStorage.removeItem('profile');

	setTimeout(() => {
		window.location.href = "/login";
	}, 500)
	

	return (
		null
	)
}

export default LogoutBoard