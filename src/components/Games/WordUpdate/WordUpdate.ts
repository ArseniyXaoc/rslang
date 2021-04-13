import API_URL from "../../Constants/constants";

const URL = API_URL;

function WordUpdate(user: { id: string, token: string }, word: string, answer: boolean, game: string) {
  function testUpdate(method: any, data: any) {
    fetch(`${URL}users/${user.id}/words/${word}`, {
      method,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("запись", data);
      })
      .catch((error) => {
        console.log("Error124", error);
      });
  }

  function checkAnswer(data, answer) {
    const answers = {
      rightAnswers: answer ? 1 : 0,
      wrongAnswers: answer ? 0 : 1,
    };
    if (data.optional.rightAnswers !== undefined) {
      answers.rightAnswers = answer ? data.optional.rightAnswers + 1 : data.optional.rightAnswers;
      answers.wrongAnswers = answer ? data.optional.wrongAnswers : data.optional.wrongAnswers + 1;
    }
    return answers;
  }

  fetch(`${URL}users/${user.id}/words/${word}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ansewrs = checkAnswer(data, answer);
      if (data.difficulty || data.optional.studying) {
        const wordData = {
          difficulty: game === "TEXTBOOK" ? data.difficulty : "false",
          optional: {
            studying: "true",
            deleted: "false",
          },
        };
        Object.assign(wordData.optional, ansewrs);
        console.log(wordData);
        testUpdate("PUT", wordData);
      }
    })
    .catch(() => {
      const data = {
        difficulty: "false",
        optional: {
          studying: "true",
          deleted: "false",
          rightAnswers: 1,
          wrongAnswers: 1,
        },
      };
      testUpdate("POST", data);
    });
}
export default WordUpdate;
