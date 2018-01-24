import React, { Component } from 'react';
const OtherAchievements=(props)=>{
    const images=[];
    for(let i=1;i<5;i++){
        images.push(props.images[i]);
    }
        return(
            <div id="OtherAchievementsContainer">
                <div id="OtherAchievementsHeader">
                    2017 / Notable Achievements
                </div>
                <div id="placeholderForOtherAchievements">
                {
                    images.map((item, index) => 
                        <div className="AchievementCard" key={index+1}>
                            <div className="cardImageDiv">
                                <img src={require(`./images/${item}`)} className="cardImage" alt="achievement #2"/>
                            </div>
                            <div className="otherAchievementTitle">
                                {props.titles[index+1]}
                            </div>
                            <div className="otherAchievementDesc">
                                {props.descriptions[index+1]}
                            </div>                        
                        </div>)
                }
                </div>
            </div>
        )
    }
export default OtherAchievements;