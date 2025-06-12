
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTicketAnalytics } from "@/hooks/useTicketAnalytics";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Analytics = () => {
  const { user, loading: authLoading } = useAuth();
  const { stats, loading } = useTicketAnalytics();

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statusData = [
    { name: "Open", value: stats.open, color: "#f97316" },
    { name: "In Progress", value: stats.inProgress, color: "#3b82f6" },
    { name: "Resolved", value: stats.resolved, color: "#10b981" },
    { name: "Closed", value: stats.closed, color: "#6b7280" }
  ];

  const sourceData = Object.entries(stats.bySource).map(([source, count]) => ({
    source: source.charAt(0).toUpperCase() + source.slice(1),
    count
  }));

  const chartConfig = {
    open: { label: "Open", color: "#f97316" },
    inProgress: { label: "In Progress", color: "#3b82f6" },
    resolved: { label: "Resolved", color: "#10b981" },
    closed: { label: "Closed", color: "#6b7280" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ticket Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into your support operations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Ticket Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Tickets by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData}>
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Bar dataKey="count" fill="#3b82f6" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tickets</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Resolution Time</span>
                <span className="font-semibold">{stats.avgResolutionTime} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution Rate</span>
                <span className="font-semibold">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Priority Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Critical</span>
                <span className="font-semibold text-red-600">{stats.critical}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High</span>
                <span className="font-semibold text-orange-600">{stats.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medium & Low</span>
                <span className="font-semibold text-blue-600">
                  {stats.total - stats.critical - stats.high}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Workload Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Tickets</span>
                <span className="font-semibold text-blue-600">
                  {stats.open + stats.inProgress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">
                  {stats.resolved + stats.closed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold">
                  {stats.total > 0 
                    ? Math.round(((stats.resolved + stats.closed) / stats.total) * 100) 
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
