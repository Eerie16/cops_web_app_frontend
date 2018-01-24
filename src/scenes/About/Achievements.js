import React,{Component} from 'react';
import './components/styles.Achievements.css';
import AchievementsInfo from './components/AchievementsInfo.js';
import MainAchievement from './components/MainAchievement.js';
import OtherAchievements from './components/OtherAchievements.js';
import data from './components/data/achievements.json';
import './components/styles.AchievementsInfo.css'
import './components/styles.OtherAchievements.css'



class Achievements extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          achievementTitles:[],
          achievementDescriptions:[],
          achievementImages:[],
        };
      }
 
    componentWillMount = ()=>{
        let titles=[];
        let descriptions=[];
        let images=[];
        for(let i=0;i<5;i++){
            titles.push(data[i].title);
            descriptions.push(data[i].description);
            images.push(data[i].image);
        }
        this.setState({
            achievementTitles:titles,
            achievementDescriptions:descriptions,
            achievementImages:images,
        })
    }
    render(){
        return(
            <div id="container">
                <div id="wrapper">
                    <div id="headerDiv">
                        <div id="titleDiv">
                            <div id="titleOfPage">
                                2017
                            </div>
                            <div id="titleSupport">
                                Year 2017 in Achievements
                            </div>
                        </div>
                        <AchievementsInfo/>
                    </div>
                    <MainAchievement 
                        title={this.state.achievementTitles[0]}
                        description={this.state.achievementDescriptions[0]}
                        image={this.state.achievementImages[0]}/>
                    <OtherAchievements
                        titles={this.state.achievementTitles}
                        images={this.state.achievementImages}
                        descriptions={this.state.achievementDescriptions}
                        
                        />
                </div>
            </div>
        )
    }

}
export default Achievements;