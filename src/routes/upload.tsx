import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
  head: () => ({
    meta: [
      { title: "FinTrack — Upload Statement" },
      { name: "description", content: "Upload bank statements to automatically import transactions." },
    ],
  }),
});

function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<{ name: string; status: "pending" | "done" | "error" }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
    addFiles(dropped);
  };

  const addFiles = (fileList: File[]) => {
    const newFiles = fileList.map((f) => ({ name: f.name, status: "pending" as const }));
    setFiles((prev) => [...prev, ...newFiles]);
    // Simulate processing
    newFiles.forEach((f, i) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((p) => (p.name === f.name ? { ...p, status: "done" } : p))
        );
      }, 1500 + i * 800);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Statement</h1>
        <p className="text-sm text-muted-foreground">Upload PDF bank statements to auto-import transactions</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
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
        <p className="mt-1 text-sm text-muted-foreground">or click to browse — PDF files only</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Uploaded Files</h3>
          {files.map((f, i) => (
            <div key={i} className="glass-card flex items-center gap-3 rounded-lg px-4 py-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">{f.name}</span>
              {f.status === "pending" && (
                <span className="text-xs text-warning animate-pulse">Processing...</span>
              )}
              {f.status === "done" && (
                <span className="flex items-center gap-1 text-xs text-income">
                  <CheckCircle className="h-3.5 w-3.5" /> Imported
                </span>
              )}
              {f.status === "error" && (
                <span className="flex items-center gap-1 text-xs text-expense">
                  <AlertCircle className="h-3.5 w-3.5" /> Failed
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold">How it works</h3>
        <div className="mt-3 space-y-3">
          {[
            "Upload your bank statement PDF",
            "We parse credits and debits automatically",
            "Transactions are categorized and grouped by account",
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
