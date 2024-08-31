import React, { useState } from 'react'
import './Sidebar.css'

export default function Sidebar() {

    let [expanded,setExpanded] = useState(false);

    function handleMenuClick(){
        setExpanded(!expanded);
    }

  return (
    <div className='h-full bg-slate-200 p-4 flex gap-5 flex-col justify-between w-max max-w-[200px]'>
        <div className='flex gap-6 flex-col'>
            <i className="ri-menu-line cursor-pointer" onClick={handleMenuClick}></i>

            <button className='bg-slate-300 px-3 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-slate-400'><i className="ri-add-line"></i>{expanded?' New Chat':''}</button>

            <div className={`recentChats space-y-4 ${expanded ? '' : 'hidden'}`}>
                <p className='font-semibold text-xl'> Recent</p>

                <div className="past flex items-center gap-2 overflow-hidden p-2 rounded-full hover:bg-slate-100">
                    <i className="ri-message-2-line"></i>
                    <p className='w-full whitespace-nowrap'>When this Earth was Created</p>
                </div>

                <div className="past flex items-center gap-2 max-w-[200px] overflow-hidden p-2 rounded-full hover:bg-slate-100">
                    <i className="ri-message-2-line"></i>
                    <p className='w-full whitespace-nowrap'>When this Earth was Created</p>
                </div>
                
            </div>
        </div>

        <div className="settings space-y-3">
            <p className={`flex items-center gap-2 ${expanded ? '' : 'justify-center'}`}><i className="ri-question-line"></i>{expanded ? ' Help' : null}</p>
            <p className={`flex items-center gap-2 ${expanded ? '' : 'justify-center'}`}><i className="ri-history-line"></i>{expanded ? ' Activity' : null}</p>
            <p className={`flex items-center gap-2 ${expanded ? '' : 'justify-center'}`}><i className="ri-settings-3-line"></i>{expanded ? ' Settings' : null}</p>
        </div>
    </div>
  )
}