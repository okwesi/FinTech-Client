import React from 'react';
import AppHeader from '../../lib/components/AppHeader';

const Home = () => {
	return (
		<div
        style={{
            overflowX: 'hidden',
        }}
		>
        <AppHeader />
			<img
				src="https://images.ctfassets.net/6ndujxh3wgyb/6NwlZ5M6qNPq0oyUXcG0Zs/f136a24762389b14bccf9f8e80e7e357/the-future-of-fintech-header.jpg"
				alt="Google"
				style={{ width: '100%', height: '85vh', marginRight: '50px' }}
			/>
		</div>
	);
};

export default Home;
