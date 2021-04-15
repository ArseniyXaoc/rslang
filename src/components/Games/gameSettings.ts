const asd = (n) => console.log(n);
const DESCRIPTION_RU = (name: string) => `Тренировка ${name} развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.`;
const DESCRIPTION_ENG = (name: string) => `The ${name} workout develops vocabulary. The more words you know, the more experience points you get.`;
export const GAME : any = {
  ru: {
    AUDIOCALL: {
      NAME: "Аудиовызов",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
    SPRINT: {
      NAME: "Спринт",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
    SAVANNA: {
      NAME: "Саванна",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
    HANGMAN: {
      NAME: "Виселица",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
  },
  en: {
    AUDIOCALL: {
      NAME: "Audiocall",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
    SPRINT: {
      NAME: "Sprint",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
    SAVANNA: {
      NAME: "Savannah",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
    HANGMAN: {
      NAME: "Hangman",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
  },
};

export const SELECT_SAVANNAH = "Savannah";
export const SELECT_AUDIOCALL = "Audiocall";
export const SELECT_SPRINT = "Sprint";
export const SELECT_HANGMAN = "Hangman";
