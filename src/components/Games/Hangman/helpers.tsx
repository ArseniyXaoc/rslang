export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false)
  }, 2000)
}

export function checkWin(correct, wrong, word, errors) {
  let status = 'win';

  word.split('').forEach(letter => {
    if (!correct.includes(letter)) {
      status = '';
    }
  });

  if (wrong.length === errors) status = 'lose';
  return status;
}

export function playSounds(track) {
  let audio = new Audio(track);
  audio.play();
  audio.volume = 0.5;
}
