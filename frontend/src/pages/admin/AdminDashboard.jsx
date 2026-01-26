import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Total Orders", value: 120 },
  { label: "Total Products", value: 45 },
  { label: "Revenue", value: "₹1,20,000" },
];

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle>{stat.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stat.value}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;
