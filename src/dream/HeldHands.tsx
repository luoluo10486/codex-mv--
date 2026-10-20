import { STORY_OUTFIT } from "./StoryCharacters";

type HeldHandsProps = {
  x?: number;
  y?: number;
  s?: number;
  gap?: number;
  ring?: boolean;
};

// Layer palms first, then the curled fingers and the resting thumb.
export const HeldHands = ({ x = 0, y = 0, s = 1, gap = 0, ring = false }: HeldHandsProps) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
    <g transform={`translate(${-gap} 0)`}>
      <path d="M-850 66L-216-54L-184 65L-850 253Z" fill={STORY_OUTFIT.blouse} stroke="#e8dace" strokeWidth="3" />
      <path d="M-244-48L-168-61L-141 60L-216 82Z" fill="#fffaf4" stroke="#dfcfc5" strokeWidth="3" />
      <path d="M-225-33L-203 61" fill="none" stroke="#ecdfd5" strokeWidth="3" />
      <circle cx="-178" cy="38" r="4" fill="#d9b9bc" />
      <path d="M-167-43L-114-56C-87-75-66-68-44-53L30-7C49 5 55 26 46 47L26 82C16 101-5 104-26 91L-87 52L-144 61Z" fill="#f2c6ac" stroke="#d4a996" strokeWidth="3" />
      <path d="M-125-30Q-107-32-91-22" fill="none" stroke="#e5b59f" strokeWidth="3" />
    </g>
    <g transform={`translate(${gap} 0)`}>
      <path d="M850-12L218-91L181 32L850 170Z" fill={STORY_OUTFIT.blouse} stroke="#e8dace" strokeWidth="3" />
      <path d="M244-88L170-105L137 26L211 45Z" fill="#fffaf4" stroke="#dfcfc5" strokeWidth="3" />
      <path d="M225-72L203 25" fill="none" stroke="#ecdfd5" strokeWidth="3" />
      <circle cx="178" cy="5" r="4" fill="#d9b9bc" />
      <path d="M172-87L118-98C96-102 79-92 60-75L13-30C-4-13-12 1-8 19L12 57C22 75 40 83 60 73L101 44L142 27Z" fill="#ffdfc8" stroke="#d4a996" strokeWidth="3" />
      <path d="M111-72Q94-66 84-54" fill="none" stroke="#edc5b0" strokeWidth="3" />
    </g>
    <g transform={`translate(${-gap} 0)`}>
      <path d="M-16 6C-6-3 7 0 17 9L55 42C66 52 67 63 59 70C51 77 41 74 32 67L-7 36C-21 26-25 14-16 6Z" fill="#f2c6ac" stroke="#d4a996" strokeWidth="3" />
      <path d="M-30 27C-21 20-11 23-1 31L38 64C48 73 49 83 41 90C33 97 23 94 14 86L-22 56C-34 47-39 35-30 27Z" fill="#f5ccb3" stroke="#d4a996" strokeWidth="3" />
      <path d="M-44 46C-36 39-26 42-17 50L18 80C27 88 29 98 21 105C14 111 4 109-5 101L-37 75C-48 66-52 53-44 46Z" fill="#f7cfb7" stroke="#d4a996" strokeWidth="3" />
      <path d="M-57 64C-50 58-41 61-34 67L-7 90C1 97 3 106-4 112C-11 118-20 115-27 109L-50 89C-61 80-64 71-57 64Z" fill="#f9d4bd" stroke="#d4a996" strokeWidth="3" />
      <path d="M36 44L46 53M18 65L28 74M-1 83L8 91M-19 99L-13 104" fill="none" stroke="#e7b59e" strokeWidth="2.5" />
      {ring && <path d="M-13 58L8 77" fill="none" stroke="#d6b775" strokeWidth="7" />}
      {ring && <path d="M-14 56L8 75" fill="none" stroke="#fff4ce" strokeWidth="3" />}
    </g>
    <g transform={`translate(${gap} 0)`}>
      <path d="M65-57C42-66 28-60 12-48L-37-14C-48-6-50 5-43 13C-36 22-25 20-14 14L25-8C38-16 50-16 62-13" fill="#ffdfc8" stroke="#d4a996" strokeWidth="3" />
      <path d="M-33-9Q-26-12-21-5" fill="none" stroke="#f0c6ae" strokeWidth="2.5" />
    </g>
  </g>
);
