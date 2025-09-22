import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            onSent();
        }
    };

    const handleSendClick = () => {
        if (input.trim()) {
            onSent();
        }
    };
    
    return (
        <div className='main'>
            <div className='nav'>
                <p>Lumos</p>
                <img src={assets.user_icon} alt="User profile" />
            </div>
            <div className='main-container'>
                {!showResult ? 
                    <>
                        <div className='greet'>
                            <p><span>Hello, Rishita.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className='cards'>
                            <div className='card'>
                                <p>Suggest some beautiful places to visit this winter</p>
                                <img src={assets.compass_icon} alt="Compass icon" />
                            </div>
                            <div className='card'>
                                <p>Explain about space</p>
                                <img src={assets.bulb_icon} alt="Bulb icon" />
                            </div>
                            <div className='card'>
                                <p>Describe rain as if it were a person</p>
                                <img src={assets.message_icon} alt="Message icon" />
                            </div>
                            <div className='card'>
                                <p>Explain the following code to me</p>
                                <img src={assets.code_icon} alt="Code icon" />
                            </div>
                        </div>
                    </>
                    : 
                    <div className='result'>
                        <div className='result-title'>
                            <img src={assets.user_icon} alt="User profile" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="AI assistant icon" />
                            {loading ? 
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder="What's on your mind?" 
                            onKeyPress={handleKeyPress}
                        />
                        <img src={assets.gallery_icon} alt="Gallery icon" />
                        <img src={assets.mic_icon} alt="Microphone icon" />
                        {input && (
                            <img 
                                onClick={handleSendClick} 
                                src={assets.send_icon} 
                                alt="Send message" 
                                style={{ 
                                    cursor: 'pointer', 
                                    opacity: 1 
                                }}
                            />
                        )}
                    </div>
                    <p className='bottom-info'>
                        <span>
                        Learning everyday as an AI, mistakes are inevitable...</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main