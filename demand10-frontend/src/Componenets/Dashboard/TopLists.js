"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createTopList,
  deleteTopList,
  getAdminTopList,
  moveTopListEntry,
  removeTopListEntry,
  replaceTopListEntries,
  updateTopList,
} from "@/services/adminDataApi";
import { fetchTopLists, TOP_LISTS_CHANGED } from "@/services/publicDataApi";

const btn = "px-2 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed";
const EMPTY_FORM = { title: "", description: "", hasHeader: true, separator: "", file: null };

export default function TopLists() {
  const [lists, setLists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formKey, setFormKey] = useState(0);
  const [replaceOpts, setReplaceOpts] = useState({ hasHeader: true, separator: "" });

  const loadLists = useCallback(async () => {
    const res = await fetchTopLists();
    if (res?.ok) setLists(res.lists);
  }, []);

  useEffect(() => {
    loadLists();
    window.addEventListener(TOP_LISTS_CHANGED, loadLists);
    return () => window.removeEventListener(TOP_LISTS_CHANGED, loadLists);
  }, [loadLists]);

  useEffect(() => {
    if (!selectedId) return setList(null);
    getAdminTopList(selectedId).then((res) => res?.ok && setList(res.list));
  }, [selectedId]);

  const apply = (res, okMsg) => {
    if (!res?.ok) return toast.error(res?.message || "Action failed");
    setList(res.list);
    if (okMsg) toast.success(okMsg);
    loadLists();
  };

  const create = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.file) return toast.error("Title and file are required");
    setBusy(true);
    const { file, title, description, hasHeader, separator } = form;
    const res = await createTopList(file, { title, description, hasHeader, separator });
    setBusy(false);
    if (!res?.ok) return toast.error(res?.message || "Upload failed");
    toast.success("Top list created");
    setForm(EMPTY_FORM);
    setFormKey((k) => k + 1);
    await loadLists();
    setSelectedId(res.list._id);
  };

  const move = async (entryId, position) => apply(await moveTopListEntry(list._id, entryId, position));

  const remove = async (entryId) => {
    if (!confirm("Remove this company from the list?")) return;
    apply(await removeTopListEntry(list._id, entryId), "Removed");
  };

  const rename = async () => {
    const title = prompt("List title", list.title);
    if (title === null) return;
    apply(await updateTopList(list._id, { title, description: list.description }), "Updated");
  };

  const editDescription = async () => {
    const description = prompt("Description", list.description || "");
    if (description === null) return;
    apply(await updateTopList(list._id, { description }), "Updated");
  };

  const replaceFile = async (file) => {
    if (!file) return;
    apply(await replaceTopListEntries(list._id, file, replaceOpts), "Entries replaced");
  };

  const removeList = async () => {
    if (!confirm(`Delete the list "${list.title}"?`)) return;
    const res = await deleteTopList(list._id);
    if (!res?.ok) return toast.error(res?.message || "Delete failed");
    toast.success("List deleted");
    setSelectedId(null);
    loadLists();
  };

  const input = "border border-gray-300 rounded-lg px-3 py-2 text-sm w-full";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr] max-w-6xl">
      <div className="space-y-6">
        <form key={formKey} onSubmit={create} className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="font-bold text-[#0F1B3D]">New top-10 list</h2>
          <input className={input} placeholder="Category / title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className={input} rows={2} placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <label
            htmlFor="toplist-file"
            className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-xl p-5 cursor-pointer hover:border-[#E11D2E] hover:bg-red-50/40 text-center"
          >
            <span className="font-semibold text-[#0F1B3D] text-sm break-all">{form.file ? form.file.name : "Choose the top-10 Excel / CSV file"}</span>
            <span className="text-xs text-gray-500">{form.file ? "Click to change" : ".xlsx, .xls or .csv"}</span>
            <input
              id="toplist-file"
              type="file"
              accept=".xlsx,.xls,.xlsm,.csv"
              className="sr-only"
              onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.hasHeader} onChange={(e) => setForm({ ...form, hasHeader: e.target.checked })} />
            First row is a header
          </label>
          <label className="flex items-center gap-2 text-sm">
            Separator
            <select className="border rounded px-2 py-1" value={form.separator} onChange={(e) => setForm({ ...form, separator: e.target.value })}>
              <option value="">Auto</option>
              <option value="comma">Comma</option>
              <option value="tab">Tab</option>
            </select>
          </label>
          <p className="text-xs text-gray-500">Excel (.xlsx/.xls) or .csv with up to 10 companies and the same columns as the main data file. You can reorder the ranking afterwards. File order = initial ranking.</p>
          <button disabled={busy} className="bg-[#E11D2E] text-white px-4 py-2 rounded-lg font-semibold w-full disabled:opacity-50">
            {busy ? "Uploading…" : "Create list"}
          </button>
        </form>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold text-[#0F1B3D] mb-2">Lists</h2>
          {!lists.length && <p className="text-sm text-gray-500">No lists yet.</p>}
          <ul className="space-y-1">
            {lists.map((l) => (
              <li key={l._id}>
                <button
                  onClick={() => setSelectedId(l._id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedId === l._id ? "bg-red-50 text-[#E11D2E] font-semibold" : "hover:bg-gray-100"}`}
                >
                  {l.title} <span className="text-gray-400">({l.count})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 min-h-[200px]">
        {!list ? (
          <p className="text-gray-500 text-sm">Select a list to edit its ranking.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0F1B3D]">{list.title}</h2>
                <p className="text-xs text-gray-500">/categories/{list.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className={btn} onClick={rename}>Rename</button>
                <button className={btn} onClick={editDescription}>Description</button>
                <label className="flex items-center gap-1 text-xs px-1">
                  <input type="checkbox" checked={replaceOpts.hasHeader} onChange={(e) => setReplaceOpts({ ...replaceOpts, hasHeader: e.target.checked })} />
                  Header row
                </label>
                <select
                  className="border rounded px-1 py-1 text-sm"
                  aria-label="Separator for replacement file"
                  value={replaceOpts.separator}
                  onChange={(e) => setReplaceOpts({ ...replaceOpts, separator: e.target.value })}
                >
                  <option value="">Auto</option>
                  <option value="comma">Comma</option>
                  <option value="tab">Tab</option>
                </select>
                <label className={`${btn} cursor-pointer`}>
                  Replace file
                  <input type="file" hidden accept=".xlsx,.xls,.xlsm,.csv" onChange={(e) => { replaceFile(e.target.files?.[0]); e.target.value = ""; }} />
                </label>
                <button className={`${btn} text-red-600`} onClick={removeList}>Delete list</button>
              </div>
            </div>

            <ol className="space-y-2">
              {list.entries.map((e, i) => (
                <li key={e._id} className="flex items-center gap-3 border rounded-lg p-3">
                  <span className="w-8 text-center text-lg font-bold text-[#E11D2E]">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{e.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {[e.industry, [e.city, e.country].filter(Boolean).join(", ")].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <select
                    className="border rounded px-1 py-1 text-sm"
                    value={i + 1}
                    onChange={(ev) => move(e._id, Number(ev.target.value))}
                    title="Move to position"
                  >
                    {list.entries.map((_, p) => (
                      <option key={p} value={p + 1}>#{p + 1}</option>
                    ))}
                  </select>
                  <button className={btn} disabled={i === 0} onClick={() => move(e._id, i)} title="Move up">▲</button>
                  <button className={btn} disabled={i === list.entries.length - 1} onClick={() => move(e._id, i + 2)} title="Move down">▼</button>
                  <button className={`${btn} text-red-600`} onClick={() => remove(e._id)} title="Remove">✕</button>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
