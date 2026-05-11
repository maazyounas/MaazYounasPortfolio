const AdminSecurityHeader = () => {
  return (
    <div className="glass rounded-2xl border border-border/50 p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-metallic">
            Admin Credentials
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your admin panel login credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityHeader;
