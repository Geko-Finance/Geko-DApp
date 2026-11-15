"use client";

import React, { useState } from "react";

export interface SendTransactionItem {
  id: string;
  sender: string;
  timestamp: string;
  amount: string;
}

const RECENT_TRANSACTIONS: SendTransactionItem[] = [
  { id: "tx-101", sender: "Elena Rostova", timestamp: "Today, 16:40", amount: "+$320.00" },
  { id: "tx-102", sender: "Carlos Vega", timestamp: "Yesterday, 12:15", amount: "+$780.00" },
  { id: "tx-103", sender: "Stellar DEX Payout", timestamp: "Nov 11, 09:45", amount: "+$145.00" },
];

const SEND_STEPS = [
  { step: 1, label: "Step 1 – Wallet Information" },
  { step: 2, label: "Step 2 – Select Currency" },
  { step: 3, label: "Step 3 – Memo & Receipt" },
];

export function Sidebar({ activeItem = "send" }: { activeItem?: string }) {
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

export function TransactionList({ items }: { items: SendTransactionItem[] }) {
  return (
    <div className="rounded-2xl bg-[#181b24] border border-white/10 p-5 shadow-lg flex-1">
      <h3 className="text-sm font-semibold text-geko-muted uppercase tracking-wider mb-4">
        Recent Transactions
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
          <span>Available Balance</span>
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
      <TransactionList items={RECENT_TRANSACTIONS} />
    </section>
  );
}

export function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <nav aria-label="Send Transaction Progress" className="w-full overflow-x-auto pb-2">
      <ol className="flex items-center justify-between min-w-[520px] gap-2">
        {SEND_STEPS.map((item, idx) => {
          const isActive = item.step === activeStep;
          const isCompleted = item.step < activeStep;
          return (
            <React.Fragment key={item.step}>
              <li className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border transition-colors ${
                    isActive
                      ? "bg-geko-accent text-white border-geko-teal ring-2 ring-geko-teal/40"
                      : isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
                        : "bg-white/5 text-geko-muted border-white/15"
                  }`}
                >
                  {item.step}
                </span>
                <span
                  className={`text-xs md:text-sm font-semibold whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : isCompleted
                        ? "text-emerald-300"
                        : "text-geko-muted/60"
                  }`}
                >
                  {item.label}
                </span>
              </li>
              {idx < SEND_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`flex-1 h-0.5 mx-2 rounded ${
                    isCompleted ? "bg-emerald-400/60" : "bg-white/10"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function FormInput({
  id,
  label,
  value,
  placeholder,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string | null;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-white">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-4 text-white placeholder:text-geko-muted/50 text-base focus:outline-none focus:border-geko-teal transition-colors"
      />
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-geko-accent via-[#2f5bd1] to-geko-teal text-white font-bold text-base shadow-lg hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all"
    >
      {label}
    </button>
  );
}

export default function SendFlowScreen() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [walletDirection, setWalletDirection] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNextStep = () => {
    const trimmed = walletDirection.trim();
    if (!trimmed) {
      setValidationError("Please enter a valid destination wallet address before continuing.");
      return;
    }
    setValidationError(null);
    setActiveStep((prev) => (prev < 3 ? prev + 1 : 1));
  };

  return (
    <div className="min-h-screen bg-geko-dark text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar activeItem="send" />
        <WalletOverview />

        <main className="flex-1 rounded-2xl bg-[#181b24] border border-white/10 p-6 md:p-8 shadow-xl flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Send Transaction
              </h1>
              <p className="text-sm text-geko-muted mt-1">
                Enter the recipient Stellar wallet information to initiate your transfer
              </p>
            </div>

            <StepIndicator activeStep={activeStep} />

            <div className="pt-4">
              <FormInput
                id="wallet-direction-input"
                label="Wallet Direction"
                placeholder="Wallet information goes here..."
                value={walletDirection}
                onChange={(val) => {
                  setWalletDirection(val);
                  if (validationError) setValidationError(null);
                }}
                error={validationError}
              />
            </div>

            {activeStep > 1 && (
              <div
                role="status"
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-sm text-emerald-300"
              >
                Destination wallet saved ({walletDirection.trim()}). Currently on{" "}
                <strong>{SEND_STEPS[activeStep - 1]?.label}</strong>.
              </div>
            )}
          </div>

          <PrimaryButton label="Next" onClick={handleNextStep} />
        </main>
      </div>
    </div>
  );
}
