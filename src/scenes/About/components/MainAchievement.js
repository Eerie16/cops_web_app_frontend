import React, { Component } from 'react';
const MainAchievement =(props)=>{
    
   
        return(
            <div id="focusedAchievement">
                        <div id="mainPicDiv" >
                            <img src={require(`./images/${props.image}`)} 
                                id="centerPic" alt="Latest Achievement"/>
                            <div className="arrow1"/>
                            <div className="arrow2"/>
                        </div>
                        <div id="backgroundForMainAchievement">
                            <div id="contentOfMainAchievement">
                                <div id="mainAchievementTitle">
                                    {props.title}
                                </div>
                                <div id="mainAchievementContent">
                            {props.description}
                                </div>
                             </div>
                        </div>
            </div>
        ) 
}

export default MainAchievement;