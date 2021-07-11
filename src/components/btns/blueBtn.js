import React from 'react';

import './index.sass';

const BlueBtn = ({text, func}) => {
	return <div onClick={() => func()} className="btn">{text}</div>
}

export default BlueBtn;