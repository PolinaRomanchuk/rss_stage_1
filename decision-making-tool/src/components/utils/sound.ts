import music from '../../assets/sound/sound.mp3';

class Sound {
  private audio: HTMLAudioElement;
  private isMuted: boolean;

  constructor(path: string) {
    this.audio = new Audio(path);
    this.isMuted = JSON.parse(localStorage.getItem('isMuted') || 'true');
    this.audio.muted = this.isMuted;
  }

  public play() {
    if (!this.isMuted) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }

  public muteSound() {
    this.isMuted = true;
    this.audio.muted = true;
    localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
  }

  public unmuteSound() {
    this.isMuted = false;
    this.audio.muted = false;
    localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
  }

}

const sound = new Sound(music);
export default sound;
