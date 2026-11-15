"use client";

import React, { useState } from "react";

export interface TransactionItem {
  id: string;
  sender: string;
  timestamp: string;
  amount: string;
  positive: boolean;
}

export interface InvestmentAsset {
  id: "USDC" | "XLM";
  symbol: string;
  name: string;
  apy: string;
  balance: string;
  earnings: string;
  variant: "gradient" | "dark";
}

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: "tx-1", sender: "Maria Gonzalez", timestamp: "Today, 14:20", amount: "+$450.00", positive: true },
  { id: "tx-2", sender: "Stellar Yield Pool", timestamp: "Yesterday, 19:05", amount: "+$125.40", positive: true },
  { id: "tx-3", sender: "Alex Rivera", timestamp: "Nov 12, 11:30", amount: "+$890.00", positive: true },
  { id: "tx-4", sender: "USDC Vault Reward", timestamp: "Nov 10, 08:15", amount: "+$64.20", positive: true },
];

const ASSETS: InvestmentAsset[] = [
  {
    id: "USDC",
    symbol: "USDC",
    name: "USD Coin",
    apy: "+%18 Currently",
    balance: "$8,420.00",
    earnings: "+$1,230.00 Earnings",
    variant: "gradient",
  },
  {
    id: "XLM",
    symbol: "XLM",
    name: "Stellar",
    apy: "+%12 Currently",
    balance: "14,500 XLM",
    earnings: "+$410.50 Earnings",
    variant: "dark",
  },
];

export function Sidebar({ activeItem = "investment" }: { activeItem?: string }) {
  const navItems = [
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
        {navItems.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center justify-center w-11 h-11 rounded-xl text-xs font-semibold transition-all ${
                isActive
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

export function BalanceCard({
  userName,
  totalBalance,
}: {
  userName: string;
  totalBalance: string;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-geko-navy via-geko-accent to-[#1b3b8c] p-6 border border-white/15 shadow-lg">
      <div className="flex items-center justify-between text-xs text-geko-muted mb-2">
        <span>Total Wallet Balance</span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-geko-teal-light font-medium">
          Stellar Mainnet
        </span>
      </div>
      <div className="text-3xl font-extrabold text-white tracking-tight mb-4">
        {totalBalance}
      </div>
      <div className="text-sm font-medium text-geko-cream mb-5">{userName}</div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-2.5 px-4 rounded-xl bg-white text-geko-navy font-semibold text-sm hover:bg-geko-cream transition-colors shadow-sm"
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
  );
}

export function TransactionList({ transactions }: { transactions: TransactionItem[] }) {
  return (
    <div className="rounded-2xl bg-[#181b24] border border-white/10 p-5 shadow-lg flex-1 flex flex-col">
      <h3 className="text-sm font-semibold text-geko-muted uppercase tracking-wider mb-4">
        Transaction History
      </h3>
      <ul className="space-y-3 overflow-y-auto max-h-72 pr-1">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                IN
              </div>
              <div>
                <p className="text-sm font-medium text-white">{tx.sender}</p>
                <p className="text-xs text-geko-muted">{tx.timestamp}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-400">{tx.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InvestmentCard({
  asset,
  selected,
  onSelect,
}: {
  asset: InvestmentAsset;
  selected: boolean;
  onSelect: (id: InvestmentAsset["id"]) => void;
}) {
  const isGradient = asset.variant === "gradient" || selected;
  return (
    <button
      type="button"
      onClick={() => onSelect(asset.id)}
      aria-pressed={selected}
      className={`text-left p-6 rounded-2xl border transition-all shadow-lg ${
        isGradient
          ? "bg-gradient-to-br from-geko-accent via-[#1e3c96] to-geko-navy border-geko-teal/60 ring-2 ring-geko-teal/40"
          : "bg-[#181b24] border-white/10 hover:border-white/25"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center font-bold text-white text-sm">
            {asset.symbol}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {asset.symbol} – {asset.name}
            </h3>
            <p className="text-xs text-geko-muted">Supported Digital Asset</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          {asset.apy}
        </span>
      </div>
      <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
        <span className="text-xs text-geko-muted">Active Position</span>
        <span className="text-lg font-bold text-white">{asset.balance}</span>
      </div>
    </button>
  );
}

export function AmountInput({
  id,
  label,
  value,
  assetSymbol,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  assetSymbol: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex items-center rounded-xl bg-black/40 border border-white/15 px-4 py-3 focus-within:border-geko-teal">
        <input
          id={id}
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-white text-lg font-semibold focus:outline-none"
        />
        <span className="text-xs font-bold text-geko-muted uppercase ml-2">
          {assetSymbol}
        </span>
      </div>
    </div>
  );
}

export function InvestmentModule({
  mode,
  description,
  badgeText,
  buttonLabel,
  assetSymbol,
  amount,
  onAmountChange,
  onSubmit,
  statusMessage,
}: {
  mode: "deposit" | "withdraw";
  description: string;
  badgeText: string;
  buttonLabel: string;
  assetSymbol: string;
  amount: string;
  onAmountChange: (val: string) => void;
  onSubmit: () => void;
  statusMessage: string | null;
}) {
  const isDeposit = mode === "deposit";
  return (
    <section className="rounded-2xl bg-[#181b24] border border-white/10 p-6 shadow-lg flex flex-col justify-between space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-white">Please select an amount</h3>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {badgeText}
          </span>
        </div>
        <p className="text-sm text-geko-muted">{description}</p>
      </div>

      <AmountInput
        id={`${mode}-amount-input`}
        label={`${buttonLabel} amount in ${assetSymbol}`}
        value={amount}
        assetSymbol={assetSymbol}
        onChange={onAmountChange}
      />

      {statusMessage && (
        <p role="status" className="text-xs font-medium text-emerald-400">
          {statusMessage}
        </p>
      )}

      <button
        type="button"
        onClick={onSubmit}
        className={`w-full py-3 px-5 rounded-xl font-bold text-sm transition-all shadow-md ${
          isDeposit
            ? "bg-gradient-to-r from-geko-accent to-geko-teal text-white hover:opacity-95"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
        }`}
      >
        {buttonLabel}
      </button>
    </section>
  );
}

export default function InvestmentDashboard() {
  const [selectedAssetId, setSelectedAssetId] = useState<InvestmentAsset["id"]>("USDC");
  const [depositAmount, setDepositAmount] = useState<string>("500");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("250");
  const [depositNotice, setDepositNotice] = useState<string | null>(null);
  const [withdrawNotice, setWithdrawNotice] = useState<string | null>(null);

  const activeAsset = ASSETS.find((a) => a.id === selectedAssetId) ?? ASSETS[0];

  const handleDeposit = () => {
    const numeric = Number(depositAmount);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      setDepositNotice("Please enter a valid deposit amount greater than 0.");
      return;
    }
    setDepositNotice(`Deposited ${numeric.toFixed(2)} ${activeAsset.symbol} into investment vault.`);
  };

  const handleWithdraw = () => {
    const numeric = Number(withdrawAmount);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      setWithdrawNotice("Please enter a valid withdrawal amount greater than 0.");
      return;
    }
    setWithdrawNotice(`Withdrew ${numeric.toFixed(2)} ${activeAsset.symbol} from investment vault.`);
  };

  return (
    <div className="min-h-screen bg-geko-dark text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar activeItem="investment" />

        <section
          aria-label="Wallet Overview"
          className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
        >
          <BalanceCard userName="Santiago Mendez" totalBalance="$14,890.50" />
          <TransactionList transactions={INITIAL_TRANSACTIONS} />
        </section>

        <main className="flex-1 flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Investment</h1>
              <p className="text-sm text-geko-muted mt-1">
                Manage digital asset positions and monitor real-time yield earnings
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSETS.map((asset) => (
              <InvestmentCard
                key={asset.id}
                asset={asset}
                selected={asset.id === selectedAssetId}
                onSelect={(id) => {
                  setSelectedAssetId(id);
                  setDepositNotice(null);
                  setWithdrawNotice(null);
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InvestmentModule
              mode="deposit"
              description="This is the amount of currency you are investing"
              badgeText="+%18 Currently"
              buttonLabel="Deposit"
              assetSymbol={activeAsset.symbol}
              amount={depositAmount}
              onAmountChange={setDepositAmount}
              onSubmit={handleDeposit}
              statusMessage={depositNotice}
            />

            <InvestmentModule
              mode="withdraw"
              description="This is the amount of currency you are withdrawing from your investment"
              badgeText="+$1,230.00 Earnings"
              buttonLabel="Withdraw"
              assetSymbol={activeAsset.symbol}
              amount={withdrawAmount}
              onAmountChange={setWithdrawAmount}
              onSubmit={handleWithdraw}
              statusMessage={withdrawNotice}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
