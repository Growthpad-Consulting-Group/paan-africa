// Moved out of the component so content can be edited without touching UI code.

/** YouTube videos shown in "Voices from the Network". `id` is the YouTube video id. */
export type NetworkVoice = { id: string; title: string };

export const networkVoices: NetworkVoice[] = [
  { id: "hVyO0Rtzql8", title: "PAAN Network Voice 1" },
  { id: "efXMBeAW6Tc", title: "PAAN Network Voice 2" },
  { id: "zJd1akSivAw", title: "PAAN Network Voice 3" },
];
