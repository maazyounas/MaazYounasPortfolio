const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-primary/70 animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-primary/40 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
