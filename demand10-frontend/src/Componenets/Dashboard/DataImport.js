"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteAllDataCompanies, deleteDataImport, listDataImports, startDataImport } from "@/services/adminDataApi";

export default function DataImport() {
  const [file, setFile] = useState(null);
  const [hasHeader, setHasHeader] = useState(true);
  const [separator, setSeparator] = useState("");
  const [busy, setBusy] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const timer = useRef(null);
  const wasActive = useRef(false);
  const failures = useRef(0);
  const lastToast = useRef(0);

  const active = jobs.some((j) => j.status === "running" || j.status === "deleting");

  const refresh = useCallback(async () => {
    const res = await listDataImports();
    if (res?.ok) {
      failures.current = 0;
      setJobs(res.jobs);
      setTotal(res.total);
      wasActive.current = res.jobs.some((j) => j.status === "running" || j.status === "deleting");
      return wasActive.current;
    }
    failures.current += 1;
    // surface the failure (at most once a minute) instead of silently showing "no jobs"
    if (Date.now() - lastToast.current > 60000) {
      lastToast.current = Date.now();
      toast.error(res?.serverError ? "Server error while loading imports." : res?.message || "Could not load imports.");
    }
    return wasActive.current;
  }, []);

  const poll = useCallback(async () => {
    const keepGoing = await refresh();
    if (keepGoing) timer.current = setTimeout(poll, Math.min(3000 * 2 ** failures.current, 30000));
  }, [refresh]);

  useEffect(() => {
    poll();
    return () => clearTimeout(timer.current);
  }, [poll]);

  const remove = async (job) => {
    if (!window.confirm(`Delete "${job.filename}" and the companies that came only from this file?`)) return;
    const res = await deleteDataImport(job._id);
    if (!res?.ok) return toast.error(res?.message || "Delete failed");
    toast.success("Deleting in the background.");
    clearTimeout(timer.current);
    poll();
  };

  const removeAll = async () => {
    if (active) return toast.error("Wait for the running import to finish first.");
    if (!window.confirm("Delete ALL company data and upload history? This cannot be undone.")) return;
    const res = await deleteAllDataCompanies();
    if (!res?.ok) return toast.error(res?.message || "Delete failed");
    toast.success(`Deleted ${res.deleted.toLocaleString()} companies`);
    poll();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose an Excel or .csv file");
    setBusy(true);
    const res = await startDataImport(file, { hasHeader, separator });
    setBusy(false);
    if (!res?.ok) return toast.error(res?.message || "Upload failed");
    toast.success("Upload received. Import is running in the background.");
    setFile(null);
    e.target.reset();
    clearTimeout(timer.current);
    poll();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl">
      <h2 className="text-xl font-bold text-[#0F1B3D]">Import company data</h2>
      <p className="text-sm text-gray-600 mt-1">
        Upload an Excel (.xlsx / .xls) or .csv file. Companies are matched on their LinkedIn company ID, so uploading a
        newer file updates the existing records instead of duplicating them. Currently stored:{" "}
        <b>{total.toLocaleString()}</b> companies.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <label
          htmlFor="data-file"
          className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-[#E11D2E] hover:bg-red-50/40 text-center"
        >
          <span className="font-semibold text-[#0F1B3D]">{file ? file.name : "Click to choose an Excel or .csv file"}</span>
          <span className="text-xs text-gray-500">
            {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "Large files are supported"}
          </span>
          <input
            id="data-file"
            type="file"
            accept=".xlsx,.xls,.xlsm,.csv"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
            First row is a header
          </label>
          <label className="flex items-center gap-2 text-sm">
            Separator
            <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Auto (by file type)</option>
              <option value="comma">Comma</option>
              <option value="tab">Tab</option>
            </select>
          </label>
          <button disabled={busy || !file} className="bg-[#E11D2E] text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-50">
            {busy ? "Uploading…" : "Upload & import"}
          </button>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Columns are recognised by header name (Company, # Employees, Industry, Website, Logo Url, Company Linkedin Url,
        City, Country, Keywords, Technologies, SIC Codes, NAICS Codes, Short Description, Founded Year, Partners,
        Services…). Without a header they are read in the standard export order.
      </p>

      <div className="flex items-center justify-between mt-6 mb-2">
        <h3 className="font-semibold">Uploaded files</h3>
        <button
          onClick={removeAll}
          disabled={active}
          title={active ? "Disabled while an import is running" : undefined}
          className="text-sm text-red-600 border border-red-200 rounded px-3 py-1 hover:bg-red-50 disabled:opacity-40"
        >
          Delete all data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">File</th><th>Status</th><th>Rows</th><th>New</th><th>Updated</th><th>Skipped</th><th>Failed</th><th>Started</th><th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j._id} className="border-b">
                <td className="py-2 max-w-[200px] truncate">{j.filename}</td>
                <td className={j.status === "failed" ? "text-red-600" : j.status === "completed" ? "text-green-600" : "text-amber-600"} title={j.error}>
                  {j.status}
                </td>
                <td>{j.processed.toLocaleString()}</td>
                <td>{j.inserted.toLocaleString()}</td>
                <td>{j.updated.toLocaleString()}</td>
                <td>{j.skipped.toLocaleString()}</td>
                <td>{j.failed.toLocaleString()}</td>
                <td>{new Date(j.startedAt).toLocaleString()}</td>
                <td className="text-right">
                  <button
                    onClick={() => remove(j)}
                    disabled={j.status === "running" || j.status === "deleting"}
                    className="text-red-600 border border-red-200 rounded px-3 py-1 hover:bg-red-50 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!jobs.length && <tr><td colSpan={9} className="py-4 text-gray-500">No files uploaded yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
