"use client";

import React, { useState } from "react";

export interface EnvelopeItem {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  savedAmount: string;
  tags: string[];
}

export interface EnvelopeTransactionItem {
  id: string;
  sender: string;
  timestamp: string;
  amount: string;
}

const INITIAL_ENVELOPES: EnvelopeItem[] = [
  {
    id: "env-1",
    createdAt: "Nov 02, 2026",
    title: "Mexico Trip",
    description: "Vacation flights and hotel reserve",
    savedAmount: "$560.00",
    tags: ["Trips & Traveling"],
  },
  {
    id: "env-2",
    createdAt: "Nov 08, 2026",
    title: "Christmas Gifts",
    description: "Holiday presents for family",
    savedAmount: "$873.20",
    tags: ["Family & Friends"],
  },
  {
    id: "env-3",
    createdAt: "Nov 12, 2026",
    title: "Japan Trip",
    description: "Spring itinerary and rail pass",
    savedAmount: "$1,620.00",
    tags: ["Subscriptions"],
  },
];

const ENVELOPE_TRANSACTIONS: EnvelopeTransactionItem[] = [
  { id: "etx-1", sender: "Auto-Save Transfer", timestamp: "Today, 09:00", amount: "+$120.00" },
  { id: "etx-2", sender: "Vault Yield Bonus", timestamp: "Yesterday, 20:15", amount: "+$45.80" },
  { id: "etx-3", sender: "Payroll Allocation", timestamp: "Nov 10, 14:00", amount: "+$600.00" },
];

export function Sidebar({ activeItem = "envelopes" }: { activeItem?: string }) {
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

      <div className="rounded-2xl bg-[#181b24] border border-white/10 p-5 shadow-lg flex-1">
        <h3 className="text-sm font-semibold text-geko-muted uppercase tracking-wider mb-4">
          Transaction History
        </h3>
        <ul className="space-y-3 overflow-y-auto max-h-72 pr-1">
          {ENVELOPE_TRANSACTIONS.map((tx) => (
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
    </section>
  );
}

export function TagBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-geko-accent/30 text-geko-teal-light border border-geko-teal/30">
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove tag ${label}`}
          className="text-geko-muted hover:text-white font-bold leading-none"
        >
          ×
        </button>
      )}
    </span>
  );
}

export function EnvelopeForm({
  onCreate,
}: {
  onCreate: (envelope: Omit<EnvelopeItem, "id" | "createdAt">) => void;
}) {
  const [name, setName] = useState("Trip to Europe");
  const [description, setDescription] = useState("Savings for a future goal");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Trips & Traveling"]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (target: string) => {
    setTags((prev) => prev.filter((t) => t !== target));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;

    onCreate({
      title: cleanName,
      description: description.trim() || "Personal savings envelope",
      savedAmount: "$0.00",
      tags: tags.length > 0 ? tags : ["General"],
    });
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#181b24] border border-white/10 p-6 shadow-lg space-y-5"
    >
      <div>
        <h2 className="text-lg font-bold text-white">Create a new envelope</h2>
        <p className="text-xs text-geko-muted mt-0.5">
          Complete the fields to create a new envelope
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="envelope-name" className="block text-xs font-semibold text-geko-muted">
            Name
          </label>
          <input
            id="envelope-name"
            type="text"
            value={name}
            placeholder="Trip to Europe"
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-geko-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="envelope-description"
            className="block text-xs font-semibold text-geko-muted"
          >
            Description
          </label>
          <input
            id="envelope-description"
            type="text"
            value={description}
            placeholder="Savings for a future goal"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-geko-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="envelope-tag-input" className="block text-xs font-semibold text-geko-muted">
            Tags
          </label>
          <div className="flex items-center gap-2">
            <input
              id="envelope-tag-input"
              type="text"
              value={tagInput}
              placeholder="Add tag..."
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="w-full rounded-xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-geko-teal"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2.5 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} onRemove={() => handleRemoveTag(tag)} />
          ))}
        </div>

        <button
          type="submit"
          className="ml-auto py-2.5 px-6 rounded-full bg-gradient-to-r from-geko-accent to-geko-teal text-white font-bold text-sm hover:opacity-95 transition-all shadow-md"
        >
          Create new
        </button>
      </div>
    </form>
  );
}

export function EnvelopeCard({
  envelope,
  onEdit,
}: {
  envelope: EnvelopeItem;
  onEdit: (id: string) => void;
}) {
  return (
    <article className="rounded-2xl bg-[#181b24] border border-white/10 p-5 shadow-lg hover:border-geko-teal/40 transition-all flex flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs text-geko-muted">{envelope.createdAt}</span>
          <h3 className="text-lg font-bold text-white mt-1">{envelope.title}</h3>
          <p className="text-xs text-geko-muted mt-0.5">{envelope.description}</p>
        </div>
        <button
          type="button"
          onClick={() => onEdit(envelope.id)}
          aria-label={`Edit ${envelope.title}`}
          className="p-2 rounded-xl bg-white/5 text-geko-muted hover:bg-white/15 hover:text-white text-xs font-semibold transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="space-y-3 pt-2 border-t border-white/10">
        <div>
          <span className="text-xs text-geko-muted block">Saved</span>
          <span className="text-2xl font-extrabold text-emerald-400">
            {envelope.savedAmount}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {envelope.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function EnvelopesScreen() {
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(INITIAL_ENVELOPES);
  const [editingEnvelopeTitle, setEditingEnvelopeTitle] = useState<string | null>(null);

  const handleCreateEnvelope = (newEnv: Omit<EnvelopeItem, "id" | "createdAt">) => {
    const created: EnvelopeItem = {
      ...newEnv,
      id: `env-${Date.now()}`,
      createdAt: "Just now",
    };
    setEnvelopes((prev) => [created, ...prev]);
  };

  const handleEditEnvelope = (id: string) => {
    const target = envelopes.find((e) => e.id === id);
    if (target) {
      setEditingEnvelopeTitle(target.title);
    }
  };

  return (
    <div className="min-h-screen bg-geko-dark text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar activeItem="envelopes" />
        <WalletOverview />

        <main className="flex-1 flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Envelopes</h1>
              <p className="text-sm text-geko-muted mt-1">
                Organize your savings into dedicated financial goals and category envelopes
              </p>
            </div>
          </header>

          <EnvelopeForm onCreate={handleCreateEnvelope} />

          {editingEnvelopeTitle && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-geko-accent/20 border border-geko-teal/40 text-xs text-geko-teal-light flex items-center justify-between"
            >
              <span>Editing options opened for envelope: {editingEnvelopeTitle}</span>
              <button
                type="button"
                onClick={() => setEditingEnvelopeTitle(null)}
                className="underline font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}

          <section aria-label="Existing Envelopes List">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {envelopes.map((env) => (
                <EnvelopeCard
                  key={env.id}
                  envelope={env}
                  onEdit={handleEditEnvelope}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
