interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-slate-100 text-slate-700",
  replied: "bg-emerald-100 text-emerald-700",
  reviewing: "bg-amber-100 text-amber-700",
  qualified: "bg-violet-100 text-violet-700",
  "call-scheduled": "bg-indigo-100 text-indigo-700",
  "proposal-sent": "bg-cyan-100 text-cyan-700",
  closed: "bg-slate-100 text-slate-700",
  draft: "bg-slate-100 text-slate-700",
  pending: "bg-amber-100 text-amber-700",
  scheduled: "bg-indigo-100 text-indigo-700",
  published: "bg-emerald-100 text-emerald-700",
};

const statusLabels: Record<string, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  reviewing: "Reviewing",
  qualified: "Qualified",
  "call-scheduled": "Call Scheduled",
  "proposal-sent": "Proposal Sent",
  closed: "Closed",
  draft: "Draft",
  pending: "Pending",
  scheduled: "Scheduled",
  published: "Published",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
