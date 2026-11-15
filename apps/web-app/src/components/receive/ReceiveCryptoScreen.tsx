"use client";

import React, { useMemo, useState } from "react";

export interface ReceiveTransactionItem {
  id: string;
  sender: string;
  timestamp: string;
  amount: string;
}

const RECEIVE_TRANSACTIONS: ReceiveTransactionItem[] = [
  { id: "rx-1", sender: "Lucia Fernandez", timestamp: "Today, 15:10", amount: "+$520.00" },
  { id: "rx-2", sender: "Stellar Anchor Deposit", timestamp: "Yesterday, 18:30", amount: "+$1,100.00" },
  { id: "rx-3", sender: "Mateo Silva", timestamp: "Nov 12, 10:05", amount: "+$275.00" },
];

const DEFAULT_STELLAR_ADDRESS =
  "GB7TAYRUZGE6TVT7NHP5SMIZRNQA6PLM423EYISAOAP3MKYIQMVYP2JO";

export function Sidebar({ activeItem = "receive" }: { activeItem?: string }) {
  const items = [
    { id: "home", label: "Dashboard", code: "DB" },
    { id: "send", label: "Send", code: "SD" },
    { id: "receive", label: "Receive", code: "RC" },
    { id: "investment", label: "Investment", code: "IN" },
    { id: "envelopes", label: "Envelopes", code: "EN" },
  ];

  return (
    <aside
      aria-label="Sidebar Navigation"
      className="flex md:flex-col items-center justify-between md:justify-start gap-4 bg-[#181b24] border border-white/10 rounded-2xl p-3 md:py-6 md:px-3 md:w-20 shrink-0 shadow-xl"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-geko-accent to-geko-teal text-white font-bold text-lg shadow-md">
        G
      </div>
      <nav className="flex md:flex-col items-center gap-3 md:mt-6">
        {items.map((item) => {
          const active = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-center w-11 h-11 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? "bg-geko-accent text-white shadow-lg ring-2 ring-geko-teal/60"
                  : "bg-white/5 text-geko-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.code}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export function TransactionList({ items }: { items: ReceiveTransactionItem[] }) {
  return (
    <div className="rounded-2xl bg-[#181b24] border border-white/10 p-5 shadow-lg flex-1">
      <h3 className="text-sm font-semibold text-geko-muted uppercase tracking-wider mb-4">
        Transaction History
      </h3>
      <ul className="space-y-3 overflow-y-auto max-h-72 pr-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                IN
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.sender}</p>
                <p className="text-xs text-geko-muted">{item.timestamp}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-400">{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WalletOverview() {
  return (
    <section
      aria-label="Wallet Overview"
      className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
    >
      <div className="rounded-2xl bg-gradient-to-br from-geko-navy via-geko-accent to-[#1b3b8c] p-6 border border-white/15 shadow-lg">
        <div className="flex items-center justify-between text-xs text-geko-muted mb-2">
          <span>Wallet Overview</span>
          <button
            type="button"
            className="text-xs text-geko-teal-light underline hover:opacity-80"
          >
            Edit Wallet
          </button>
        </div>
        <div className="text-3xl font-extrabold text-white tracking-tight mb-3">
          $14,890.50
        </div>
        <div className="text-sm font-medium text-geko-cream mb-5">Santiago Mendez</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="py-2.5 px-4 rounded-xl bg-white text-geko-navy font-semibold text-sm hover:bg-geko-cream transition-colors"
          >
            Send
          </button>
          <button
            type="button"
            className="py-2.5 px-4 rounded-xl bg-white/15 text-white font-semibold text-sm border border-white/20 hover:bg-white/25 transition-colors"
          >
            Receive
          </button>
        </div>
      </div>
      <TransactionList items={RECEIVE_TRANSACTIONS} />
    </section>
  );
}

/**
 * Generates a deterministic 21x21 QR-like matrix encoding the wallet address
 * with standard finder patterns in the three corners.
 */
export function QRCodeDisplay({ walletAddress }: { walletAddress: string }) {
  const size = 21;
  const cells = useMemo(() => {
    const grid: boolean[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false),
    );

    const drawFinder = (r0: number, c0: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[r0 + r][c0 + c] = isBorder || isCenter;
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inFinder =
          (r < 8 && c < 8) ||
          (r < 8 && c >= size - 8) ||
          (r >= size - 8 && c < 8);
        if (inFinder) continue;
        const charIdx = (r * size + c) % walletAddress.length;
        const code = walletAddress.charCodeAt(charIdx);
        grid[r][c] = ((code + r * 3 + c * 7) & 1) === 1;
      }
    }
    return grid;
  }, [walletAddress]);

  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/15 shadow-2xl flex flex-col items-center gap-4">
      <div className="p-4 rounded-2xl bg-white shadow-inner">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`QR Code for Stellar wallet ${walletAddress}`}
          className="w-52 h-52 md:w-60 md:h-60"
        >
          {cells.map((row, rIdx) =>
            row.map((filled, cIdx) =>
              filled ? (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx}
                  y={rIdx}
                  width={1}
                  height={1}
                  fill="#081f5c"
                />
              ) : null,
            ),
          )}
        </svg>
      </div>
      <p className="text-xs font-mono text-geko-muted break-all text-center max-w-xs">
        {walletAddress}
      </p>
    </div>
  );
}

export function ActionButton({
  label,
  variant = "primary",
  onClick,
}: {
  label: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
}) {
  const isPrimary = variant === "primary";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3.5 px-8 rounded-full font-bold text-sm transition-all shadow-md ${
        isPrimary
          ? "bg-gradient-to-r from-geko-accent to-geko-teal text-white hover:opacity-95"
          : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}

export default function ReceiveCryptoScreen() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const walletAddress = DEFAULT_STELLAR_ADDRESS;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(walletAddress);
      }
      setFeedback("Wallet address copied to clipboard!");
    } catch {
      setFeedback("Address selected: " + walletAddress);
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({
          title: "Receive Stellar Assets on Geko",
          text: `Send Stellar tokens to my Geko wallet: ${walletAddress}`,
        });
        setFeedback("Shared wallet address successfully.");
        return;
      }
    } catch {
      // Fallback below if user cancels or share API is unavailable
    }
    setFeedback(`Share link ready for wallet ${walletAddress.slice(0, 8)}...`);
  };

  return (
    <div className="min-h-screen bg-geko-dark text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar activeItem="receive" />
        <WalletOverview />

        <main className="flex-1 rounded-2xl bg-[#181b24] border border-white/10 p-6 md:p-10 shadow-xl flex flex-col items-center justify-center text-center gap-6">
          <header className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-geko-accent/30 border border-geko-teal/40 flex items-center justify-center text-geko-teal-light font-bold text-lg">
              QR
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Crypto</h1>
            <p className="text-sm text-geko-muted">Receive from crypto wallet</p>
          </header>

          <QRCodeDisplay walletAddress={walletAddress} />

          <p className="text-sm text-geko-muted max-w-md text-center">
            Use this QR code to receive tokens and collections with Stellar
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <ActionButton label="Share" variant="primary" onClick={handleShare} />
            <ActionButton label="Copy" variant="secondary" onClick={handleCopy} />
          </div>

          {feedback && (
            <p role="status" className="text-xs font-medium text-emerald-400">
              {feedback}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
