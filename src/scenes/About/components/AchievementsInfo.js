import React, {Component} from 'react';
import trophy from './images/trophy.jpg';
import people from './images/people.jpg';
import './styles.AchievementsInfo.css';
const AchievementsInfo = ()=>{
        return(
            <div id="iconsDivHolder">
                            <div className="iconsDiv">
                                <div className="icon">
                                   <img src={people} className="imageIcon" alt=""/>
                                </div>
                                <div className="iconValue">
                                    56
                                </div>
                                <div className="iconDesc">
                                    People won an award
                                </div>
                            </div>
                            <div className="iconsDiv">
                                <div className="icon">
                                <img src={trophy} className="imageIcon" alt=""/>
                                </div>
                                <div className="iconValue">
                                    33
                                </div>
                                <div className="iconDesc">
                                    Awards received
                                </div>
                            </div>
                            <div className="iconsDiv">
                                <div className="icon">
                                    Icon Here
                                </div>
                                <div className="iconValue">
                                    Numbers Here
                                </div>
                                <div className="iconDesc">
                                    What are those numbers
                                </div>
                            </div>
             </div>
        )
    }

export default AchievementsInfo;