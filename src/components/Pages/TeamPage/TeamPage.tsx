import React, { useEffect, useState } from 'react';
import TeamCard from './components/TeamCard';
import TeamStyles from "./TeamCardStyles";

function getUserData(url:string) {
    return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.json);
    })
    .catch((error) => alert(`Something went wrong! Error: ${error.statusText}`))
}

const TeamPage: React.FC = () => {
  const useStyles = TeamStyles();
  const [usersData, setUserData ] = useState([]);
  const url = "../../../assets/staticData/teamDescription.json";

  useEffect(() => {
    async function fetchData() {
      const userData = getUserData(url);
      userData.then((data) => {
        setUserData(data.team);
      })
    }
     fetchData();
  }, [])

  return (
    <div className={useStyles.teamCardsContainer}>
        {
            usersData.map((user) => {
                return <TeamCard key={user.id} userInfo={user} />
            })
        }
    </div>
   );
};

export default TeamPage;
