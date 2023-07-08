import React from 'react';
import { createRoot } from 'react-dom/client';
import { FashionChatBot } from './components/FashionChatBot/FashionChatBot';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
    return (
        <div
            style={{
                width: '450px',
                height: '90vh',
                margin: '0 auto'
            }}
        >
            <FashionChatBot />
        </div>
    );
};

root.render(<App />);
