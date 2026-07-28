/**
 * Synthesized Web Audio API Sound Engine
 * Zero external audio files required, zero latency, ultra-tactile micro-interactions.
 */

let audioCtx = null;
let isMuted = localStorage.getItem("site_sound_muted") === "true";

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play synthesized UI sound
 * @param {'click' | 'nav' | 'project' | 'send' | 'about' | 'toggle' | 'hover'} type 
 */
export function playSound(type = "click") {
  if (isMuted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (type) {
      case "send": {
        // "Send it!" Button: Uplifting 3-stage sending chime
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.04);
        gain1.gain.setValueAtTime(0.22, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(880, now + 0.03);
        osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain2.gain.setValueAtTime(0.26, now + 0.03);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.04);
        osc2.start(now + 0.03);
        osc2.stop(now + 0.08);
        break;
      }

      case "about": {
        // "About me" Button: Warm, welcoming dual-tone drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.025);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.055);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.055);
        break;
      }

      case "project": {
        // Works / Cases: Similar tactile click feel, but DISTINCT TONE UP (220Hz -> 580Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.04);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case "nav": {
        // Soft high-frequency glass tick for General Nav Links
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.025);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case "toggle": {
        // Dual-tone tick for Hamburger / Modals / Toggles
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(400, now);
        osc1.frequency.exponentialRampToValueAtTime(700, now + 0.03);

        gain1.gain.setValueAtTime(0.18, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.03);
        break;
      }

      case "hover": {
        // Ultra subtle micro hover tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1100, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.015);
        break;
      }

      case "click":
      default: {
        // Standard Tactile iOS-style haptic tap for Buttons (Tone Down: 240Hz -> 70Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.03);

        gain.gain.setValueAtTime(0.30, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }
    }
  } catch (err) {
    // Silent fail if AudioContext is unavailable
  }
}

/**
 * Toggle sound mute state
 */
export function toggleSoundMute() {
  isMuted = !isMuted;
  localStorage.setItem("site_sound_muted", isMuted ? "true" : "false");
  if (!isMuted) {
    playSound("nav");
  }
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}

/**
 * Global Event Listener Setup
 * Supports Desktop clicks & Mobile touch inputs (iOS Safari / Android) with 0ms touch latency.
 */
export function initSoundSystem() {
  const unlockAudio = () => {
    getAudioContext();
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });

  const handleInteraction = (e) => {
    getAudioContext();

    const target = e.target.closest("[data-sound], button, a, .project-card, .work-card, .hamburger");
    if (!target) return;

    // Deduplicate sounds when mobile triggers both pointerdown and click on the same element
    const now = Date.now();
    if (e.type === "pointerdown" || e.type === "touchstart") {
      target._soundPlayedTime = now;
    } else if (e.type === "click" && target._soundPlayedTime && now - target._soundPlayedTime < 450) {
      return;
    }

    // Explicit dataset attribute override
    if (target.dataset.sound) {
      playSound(target.dataset.sound);
      return;
    }

    const text = (target.textContent || "").toLowerCase().trim();
    const href = (target.getAttribute("href") || "").toLowerCase();

    // 1. All Navigation Links in Nav Bar / Drawer (Home, Work, About, Contact, etc.)
    if (
      target.classList.contains("drawer-link") ||
      target.classList.contains("nav-link") ||
      target.closest("nav")
    ) {
      playSound("nav");
      return;
    }

    // 2. Hamburger / Drawer Toggle
    if (target.classList.contains("hamburger") || target.closest(".hamburger")) {
      playSound("toggle");
      return;
    }

    // 3. "Send it!" Button
    if (
      text.includes("send it") ||
      target.type === "submit" ||
      target.classList.contains("contact-form__submit") ||
      target.closest(".contact-form__submit")
    ) {
      playSound("send");
      return;
    }

    // 4. Works / Cases / Project Cards in Page Body (Distinct Tone Up!)
    if (
      target.classList.contains("project-card") ||
      target.closest(".project-card") ||
      target.classList.contains("work-card") ||
      target.closest(".work-card") ||
      href.includes("/work/") ||
      text.includes("case study") ||
      text.includes("view work") ||
      text.includes("see project")
    ) {
      playSound("project");
      return;
    }

    // 5. Default Button / Link Click
    if (target.tagName === "BUTTON" || target.tagName === "A" || target.getAttribute("role") === "button") {
      playSound("click");
    }
  };

  document.addEventListener("pointerdown", handleInteraction, { capture: true, passive: true });
  document.addEventListener("click", handleInteraction, { capture: true });
}
