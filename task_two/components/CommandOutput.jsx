export function CommandOutput({ commands }) {
  return (
    <div className="flex flex-col bg-white rounded-md h-[30vh] overflow-auto shadow-md p-4">
      {commands.map((c, i) => (
        <div className={`flex rounded-md p-2 mb-2 ${c.valid ? 'bg-success' : 'bg-error'}`} key={i}>
          <p className="mr-auto">
            {commands.length - i}: {c.text}
          </p>
          <p>{c.valid ? '✓' : '✘'}</p>
        </div>
      ))}
    </div>
  );
}
