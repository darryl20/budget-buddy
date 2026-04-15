import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { accounts, type Transaction } from "@/lib/mock-data";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
  head: () => ({
    meta: [
      { title: "FinTrack — Upload Statement" },
      { name: "description", content: "Upload bank statements to automatically import transactions." },
    ],
  }),
});

type ParsedFile = {
  name: string;
  status: "pending" | "parsing" | "done" | "error";
  accountId: string;
  transactions: Transaction[];
};

// Simulated AI-extracted transactions per account
function simulateAIExtraction(accountName: string): Transaction[] {
  const now = Date.now();
  const base: Transaction[] = [
    { id: `ai-${now}-1`, date: "2026-04-14", description: "Direct Deposit — Employer", amount: 3200, type: "credit", category: "Income", account: accountName },
    { id: `ai-${now}-2`, date: "2026-04-13", description: "Grocery Store", amount: 87.52, type: "debit", category: "Groceries", account: accountName },
    { id: `ai-${now}-3`, date: "2026-04-12", description: "Electric Company", amount: 112.00, type: "debit", category: "Utilities", account: accountName },
    { id: `ai-${now}-4`, date: "2026-04-11", description: "Online Transfer In", amount: 500, type: "credit", category: "Transfer", account: accountName },
    { id: `ai-${now}-5`, date: "2026-04-10", description: "Restaurant", amount: 45.80, type: "debit", category: "Dining", account: accountName },
  ];
  return base;
}

function UploadPage() {
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId)!;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );
    addFiles(dropped);
  };

  const addFiles = (fileList: File[]) => {
    const newFiles: ParsedFile[] = fileList.map((f) => ({
      name: f.name,
      status: "pending",
      accountId: selectedAccountId,
      transactions: [],
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate AI parsing with delay
    newFiles.forEach((f, i) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((p) =>
            p.name === f.name && p.status === "pending"
              ? { ...p, status: "parsing" }
              : p
          )
        );
      }, 400 + i * 300);

      setTimeout(() => {
        const account = accounts.find((a) => a.id === selectedAccountId);
        const txns = simulateAIExtraction(account?.name ?? "Unknown");
        setFiles((prev) =>
          prev.map((p) =>
            p.name === f.name && p.status === "parsing"
              ? { ...p, status: "done", transactions: txns }
              : p
          )
        );
      }, 1800 + i * 800);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Statement</h1>
        <p className="text-sm text-muted-foreground">
          Upload PDF bank statements — AI extracts transactions automatically
        </p>
      </div>

      {/* Account selector */}
      <div className="relative w-full max-w-sm">
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Select Bank Account
        </label>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="glass-card flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/40"
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: selectedAccount.color }}
            />
            {selectedAccount.name} · {selectedAccount.accountNumber}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        {dropdownOpen && (
          <div className="glass-card absolute z-10 mt-1 w-full rounded-lg py-1 shadow-lg">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  setSelectedAccountId(acc.id);
                  setDropdownOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-muted/40 ${
                  acc.id === selectedAccountId ? "text-primary" : ""
                }`}
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: acc.color }}
                />
                <span className="font-medium">{acc.name}</span>
                <span className="text-muted-foreground">
                  {acc.bank} · {acc.accountNumber}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`glass-card cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
          ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(Array.from(e.target.files));
          }}
        />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="text-base font-semibold">Drop your bank statements here</p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse — PDF files only
        </p>
      </div>

      {/* Parsed files & extracted transactions */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Processed Statements</h3>
          {files.map((f, i) => {
            const acc = accounts.find((a) => a.id === f.accountId);
            return (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">{f.name}</span>
                    {acc && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        → {acc.name} ({acc.accountNumber})
                      </span>
                    )}
                  </div>
                  {f.status === "pending" && (
                    <span className="text-xs text-muted-foreground">Queued</span>
                  )}
                  {f.status === "parsing" && (
                    <span className="text-xs text-warning animate-pulse">
                      AI parsing...
                    </span>
                  )}
                  {f.status === "done" && (
                    <span className="flex items-center gap-1 text-xs text-income">
                      <CheckCircle className="h-3.5 w-3.5" /> {f.transactions.length} transactions found
                    </span>
                  )}
                  {f.status === "error" && (
                    <span className="flex items-center gap-1 text-xs text-expense">
                      <AlertCircle className="h-3.5 w-3.5" /> Failed
                    </span>
                  )}
                </div>

                {/* Show extracted transactions */}
                {f.status === "done" && f.transactions.length > 0 && (
                  <div className="divide-y divide-border">
                    {f.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between px-5 py-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-md ${
                              tx.type === "credit"
                                ? "bg-income/10"
                                : "bg-expense/10"
                            }`}
                          >
                            <span
                              className={`text-xs font-bold ${
                                tx.type === "credit"
                                  ? "text-income"
                                  : "text-expense"
                              }`}
                            >
                              {tx.type === "credit" ? "+" : "−"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {tx.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {tx.date} · {tx.category}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            tx.type === "credit"
                              ? "text-income"
                              : "text-expense"
                          }`}
                        >
                          {tx.type === "credit" ? "+" : "-"}$
                          {tx.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* How it works */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold">How it works</h3>
        <div className="mt-3 space-y-3">
          {[
            "Select which bank account the statement belongs to",
            "Upload your bank statement PDF",
            "AI reads the PDF and extracts all credits & debits",
            "Transactions are grouped under the correct account",
            "Review and confirm the imported data",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
