import React from "react";
import TeamCard from "./components/TeamCard";
import TeamStyles from "./TeamCardStyles";
import teamDescription from "../../../assets/staticData/teamDescription.json";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import juliaImg from "../../../assets/images/team/julia.jpg";
import ilyaImg from "../../../assets/images/team/ilya.jpg";
import kateImg from "../../../assets/images/team/kate.jpg";
import arseniyImg from "../../../assets/images/team/arseniy.jpg";
import maksimImg from "../../../assets/images/team/maksim.jpg";

type Props = {
  lang: string
}

const TeamPage: React.FC<Props> = ({lang}) => {
  const useStyles = TeamStyles();
  const teamImg = {
    ilya: ilyaImg,
    julia: juliaImg,
    kate: kateImg,
    arseniy: arseniyImg,
    maksim: maksimImg
  }

  return (
    <div className={useStyles.teamPageContainer}>
      <div className={useStyles.teamCardsContainer}>
          {
              teamDescription.team[lang].map((user) => <TeamCard key={user.id} userInfo={user} teamImg={teamImg} />)
          }
      </div>
    </div>
  );
};

const mapStateToProps = (state:RootState) => ({
  lang: state.settingsReducer.lang.lang
});

export default connect(mapStateToProps)(TeamPage);
