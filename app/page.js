"use client";

import { useState } from "react";

const PALETTE = [
	"#ff7ac6",
	"#f8b4d9",
	"#ffb4d6",
	"#ffd6e7",
	"#9b5de5",
	"#4cc9f0",
];

function mulberry32(seed) {
	let t = seed;
	return function () {
		t += 0x6d2b79f5;
		let x = Math.imul(t ^ (t >>> 15), t | 1);
		x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
		return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
	};
}

const confettiPieces = Array.from({ length: 140 }, (_, i) => {
	const rand = mulberry32((i + 1) * 9871);
	const left = rand() * 100;
	const size = 6 + rand() * 9;
	const duration = 2.8 + rand() * 1.9;
	const delay = rand() * 0.8;
	const rotation = rand() * 360;
	const drift = -16 + rand() * 32;
	const color = PALETTE[Math.floor(rand() * PALETTE.length)];
	return { left, size, duration, delay, rotation, drift, color };
});

export default function Page() {
	const [revealed, setRevealed] = useState(false);

	return (
		<main className="relative flex min-h-[100svh] items-center justify-center p-4">
			<div
				className="pointer-events-none absolute inset-0 z-10 animate-confettiLayerFade motion-reduce:hidden"
				aria-hidden="true"
			>
				{confettiPieces.map((piece, index) => (
					<span
						key={index}
						className="absolute -top-[10vh] animate-confettiFall rounded-sm opacity-90 motion-reduce:animate-none"
						style={{
							left: `calc(${piece.left} * 1%)`,
							width: `${piece.size}px`,
							height: `${piece.size * 1.5}px`,
							"--duration": `${piece.duration}s`,
							"--delay": `${piece.delay}s`,
							"--rotation": `${piece.rotation}deg`,
							"--drift": piece.drift,
							animationDelay: `var(--delay)`,
							backgroundColor: piece.color,
						}}
					/>
				))}
			</div>

			<section className="relative flex min-h-[min(100svh,844px)] w-full max-w-[390px] overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(10,12,24,0.94),rgba(12,26,48,0.92))] shadow-screen">
				<div className="pointer-events-none absolute inset-0 z-[1]">
					<span className="spotlight absolute left-[-40px] top-[-60px] h-[420px] w-[220px] max-[420px]:w-[200px] opacity-60 blur-[8px] mix-blend-screen motion-reduce:animate-none" />
					<span className="spotlight spotlight--two absolute right-[-60px] top-[-40px] h-[420px] w-[220px] max-[420px]:w-[200px] opacity-60 blur-[8px] mix-blend-screen motion-reduce:animate-none" />
					<span className="spotlight spotlight--three absolute bottom-[-160px] left-[30%] h-[360px] w-[220px] max-[420px]:w-[200px] opacity-60 blur-[8px] mix-blend-screen motion-reduce:animate-none" />
				</div>

				<div className="relative z-[2] flex flex-col items-center gap-5 p-10 text-center">
					<p className="m-0 text-[0.82rem] text-white/70">
						מתנה לאור
					</p>
					<h1 className="m-0 max-w-[22rem] font-display text-[2.3rem] leading-[1.08] text-white">
						<span className="block">לאחות שלנו, רצינו לאחל לך</span>
						<span className="block">יום הולדת שמח.</span>
						<span className="block">יש מתנה,</span>
						<span className="block text-[2.1rem] text-accent drop-shadow-[0_0_18px_rgba(248,180,217,0.55)]">
							אנחנו בטוחים שתאהבי
						</span>
						<span className="block text-[2.8rem] text-accent drop-shadow-[0_0_18px_rgba(248,180,217,0.55)]">
							ואם לא? הכוונה טובה 😄
						</span>
					</h1>
					<p className="m-0 max-w-[20rem] text-[1rem] text-white/75">
						רצינו משהו רגוע, מיוחד, ובדיוק בשבילך.
					</p>

					<div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-card">
						<div className="pointer-events-none absolute left-[-10%] right-[-10%] top-[-20%] h-[70%] bg-[radial-gradient(60%_120%_at_50%_20%,rgba(248,180,217,0.5),transparent_70%)] opacity-70" />
						<div
							className={`relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4 transition-all duration-700 ${
								revealed ? "gift-reveal" : "gift-blur"
							}`}
							role="button"
							tabIndex={0}
							onClick={() => setRevealed(true)}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ")
									setRevealed(true);
							}}
							aria-label="הקישי כדי לחשוף את המתנה"
						>
							<div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(60%_120%_at_50%_20%,rgba(248,180,217,0.3),transparent_75%)] opacity-80" />
							<div className="relative gift-content">
								<h2 className="m-0 mb-2 font-display text-[1.6rem] leading-[1.15] text-[#fff6db]">
									עיסוי ראש מיוחד
								</h2>
								<p className="m-0 text-[0.95rem] text-white/70">
									טיפול מפנק — רק בשבילך.
								</p>
							</div>

							{!revealed && (
								<>
									<div
										className="gift-shimmer"
										aria-hidden="true"
									/>
									<div className="gift-overlay">
										<span>הקישי כדי לחשוף</span>
									</div>
								</>
							)}
							{revealed && (
								<div
									className="gift-spark"
									aria-hidden="true"
								/>
							)}
						</div>
					</div>

					{revealed && (
						<div className="flex flex-col items-center gap-3 text-center animate-fade-in">
							<p className="m-0 text-[0.95rem] text-white/80">
								הורידי את המתנה
							</p>
							<a
								href="/gift.pdf"
								download
								className="download-btn"
								aria-label="הורידי את המתנה"
							>
								<svg
									viewBox="0 0 24 24"
									width="26"
									height="26"
									aria-hidden="true"
									focusable="false"
								>
									<path
										fill="currentColor"
										d="M12 3a1 1 0 0 1 1 1v9.17l2.59-2.58a1 1 0 1 1 1.41 1.41l-4.3 4.3a1 1 0 0 1-1.4 0l-4.3-4.3a1 1 0 1 1 1.41-1.41L11 13.17V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
									/>
								</svg>
							</a>
						</div>
					)}

					<div className="mt-auto text-[0.95rem] text-white/70 flex">
						<p className="m-0">באהבה, מאביב ואופיר</p>
					</div>
				</div>
			</section>
		</main>
	);
}
