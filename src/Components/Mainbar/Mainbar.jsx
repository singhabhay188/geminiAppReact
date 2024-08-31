import React, { useEffect, useRef, useState } from 'react';
import './Mainbar.css';
import getRes from '../../Config/gemini';
import Loader from '../Loader/Loader';

export default function Mainbar() {
    const [prompt, setPrompt] = useState('');
    const [codeRunning, setCodeRunning] = useState(false);
    const [chatStarted, setChatStarted] = useState(true);
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null); // Ref for the last message

    function handleChange(e) {
        if (codeRunning) return;
        setPrompt(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (prompt === '' || codeRunning) return;

        setChatStarted(true);
        setCodeRunning(true);

        // Add user message
        setMessages(prevMessages => [
            ...prevMessages,
            { type: 'user', text: prompt }
        ]);

        // Add loader
        setMessages(prevMessages => [
            ...prevMessages,
            { type: 'gemini', text: <Loader /> }
        ]);

        // Fetch response
        const response = await getRes(prompt);

        // Remove loader and add response
        setMessages(prevMessages => {
            const updatedMessages = prevMessages.slice(0, -1); // Remove the last loader
            return [
                ...updatedMessages,
                { type: 'gemini', text: response }
            ];
        });

        setCodeRunning(false);
        setPrompt('');
    }

    // Scroll to last message when messages change
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='flex-1 flex flex-col h-screen overflow-hidden'>
            <div id="topBar" className='flex items-center justify-between p-4 bg-gray-100'>
                <p className='font-semibold text-xl text-gray-500'>Gemini</p>
                <div className='w-10 h-10 rounded-full overflow-hidden object-contain'>
                    <img
                        title='Abhay'
                        className='object-contain'
                        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewpersonaltraining-697509.jpg&fm=jpg"
                        alt="Profile"
                    />
                </div>
            </div>

            <div id='restPart' className='flex-1 max-w-screen-xl mx-auto w-full p-4 flex flex-col gap-5 overflow-y-auto'>
                <div id="chatScreen" className='flex-1 w-full'>
                    <div id="greet" className={`text-2xl lg:text-4xl font-semibold text-gray-400 py-6 px-3 ${chatStarted ? 'hidden' : ''}`}>
                        <span className='block'>Hello, Abhay.</span> How can I help you today?
                    </div>

                    <div id='cards' className={`${chatStarted ? 'hidden' : 'grid'}`}>
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <i className="ri-compass-line"></i>
                        </div>
                        <div className="card">
                            <p>Briefly summarize this concept of urban planning</p>
                            <i className="ri-lightbulb-flash-line"></i>
                        </div>
                        <div className="card">
                            <p>Brainstorm team bonding activities for our work retreat</p>
                            <i className="ri-discuss-line"></i>
                        </div>
                        <div className="card">
                            <p>Improve the readability of the following code</p>
                            <i className="ri-code-s-slash-line"></i>
                        </div>
                    </div>

                    <div id="chats" className='p-4 flex flex-col space-y-2'>
                        {messages.map((message, index) => (
                            <p
                                key={index}
                                className={`chatMessage ${message.type}`}
                                ref={index === messages.length - 1 ? lastMessageRef : null}
                            >
                                {message.text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div id='prompt-box' className='space-y-3 text-center text-gray-500 max-w-screen-xl w-full p-3 mx-auto bg-gray-200'>
                <div className="flex gap-2 overflow-hidden items-center">
                    <form onSubmit={handleSubmit} className='w-full'>
                        <input
                            type="text"
                            className="w-full outline-none border-2 border-gray-400 bg-white focus:border-gray-600 py-2 px-6 rounded-full resize-none text-black"
                            value={prompt}
                            onChange={handleChange}
                        />
                    </form>
                    <div className='space-x-3'>
                        <i className="ri-image-add-line"></i>
                        <i className="ri-mic-line"></i>
                        <i onClick={handleSubmit} className="ri-send-plane-2-line cursor-pointer"></i>
                    </div>
                </div>
                <p className='text-xs hidden max-sm:hidden'>
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                </p>
            </div>
        </div>
    );
}
